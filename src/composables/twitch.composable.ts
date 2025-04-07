import type {
  TwitchExtensionAuthResponse,
  TwitchExtensionConfiguration,
  TwitchStreamScheduleResponse,
  TwitchStreamScheduleSegment,
  TwitchUserResponse,
  GroupedScheduleItem,
  TwitchExtensionTheme,
} from '@/common/interfaces/twitch.interface';
import { ref, watch } from 'vue';
import { themes } from '@/common/themes';

// Store shared state outside the composable to persist between re-renders
const allScheduleItems = ref<TwitchStreamScheduleSegment[]>([]);
const broadcasterName = ref<string>('');
const config = ref<TwitchExtensionConfiguration>({
  ...themes.default,
  amountOfScheduleItems: 3,
  fontFamily: 'Roboto',
  fontSize: 16,
  showCategory: true,
  showTimes: true,
  showTitle: true,
  theme: 'default',
});
const darkMode = ref<boolean>(false);

export const useTwitch = () => {
  const schedule = ref<GroupedScheduleItem[]>([]);
  const twitchLoading = ref<boolean>(true);

  const groupScheduleItems = (limit: number): GroupedScheduleItem[] => {
    // First, take only the number of items we want to show
    const limitedItems = [...allScheduleItems.value].slice(0, limit);

    // Then group them by date
    const groupedSchedule = limitedItems.reduce((acc: { [key: string]: TwitchStreamScheduleSegment[] }, item) => {
      const date = new Date(item.start_time).toISOString().split('T')[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});

    // Convert to array format
    return Object.entries(groupedSchedule).map(([date, items]) => ({
      date,
      items
    }));
  };

  const fetchBroadcasterInfo = async ({ channelId, clientId, helixToken }: Pick<TwitchExtensionAuthResponse, 'channelId' | 'clientId' | 'helixToken'>) => {
    try {
      const response = await window.fetch(`https://api.twitch.tv/helix/users?id=${channelId}`, {
        headers: {
          'Authorization': `Extension ${helixToken}`,
          'Client-ID': clientId,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch broadcaster info. Please try again later.');
      }

      const data: TwitchUserResponse = await response.json();
      broadcasterName.value = data.data[0].login;

    } catch (error) {
      console.error('Error fetching broadcaster info:', error);
    }
  }

  const fetchSchedule = async ({ channelId, clientId, helixToken }: Pick<TwitchExtensionAuthResponse, 'channelId' | 'clientId' | 'helixToken'>) => {
    try {
      const startTime = new Date();
      startTime.setHours(0, 0, 0, 0);
      const startTimeRFC3339 = startTime.toISOString().replace('.000Z', 'Z');
      const response = await window.fetch(`https://api.twitch.tv/helix/schedule?broadcaster_id=${channelId}&start_time=${startTimeRFC3339}&first=5`, {
        headers: {
          'Authorization': `Extension ${helixToken}`,
          'Client-ID': clientId,
        },
      });

      if (!response.ok) {
        switch (response.status) {
          case 401:
            throw new Error('Authentication failed. Please refresh the page.');
          case 403:
            throw new Error('Not authorized to access this schedule.');
          case 404:
            // 404 means no schedule exists, we should handle this as a valid response
            allScheduleItems.value = [];
            schedule.value = [];
            return;
          case 429:
            throw new Error('Rate limit exceeded. Please try again later.');
          default:
            throw new Error('Failed to fetch schedule. Please try again later.');
        }
      }

      const data: TwitchStreamScheduleResponse = await response.json();
      allScheduleItems.value = data.data.segments;
      schedule.value = groupScheduleItems(config.value.amountOfScheduleItems);
    } catch (error) {
      console.error('Error fetching schedule:', error);
      allScheduleItems.value = [];
      schedule.value = [];
    }
  }

  // Watch for changes in amountOfScheduleItems and update the displayed schedule
  watch(() => config.value.amountOfScheduleItems, (newValue) => {
    schedule.value = groupScheduleItems(newValue);
  });

  const saveConfig = async () => {
    try {
      window.Twitch.ext.configuration.set('broadcaster', '1', JSON.stringify(config.value));
    } catch (error) {
      console.error('Error saving config:', error);
    }
  }

  const updateTheme = (themeName: TwitchExtensionTheme) => {
    // Skip if trying to switch to 'custom' as custom isn't a predefined theme
    if (themeName === 'custom') {
      // Just update the theme name without changing any colors
      config.value.theme = 'custom';
      return;
    }

    if (themes[themeName]) {
      // Apply all theme properties but keep non-theme specific settings
      const currentConfig = { ...config.value };
      config.value = {
        ...currentConfig,
        ...themes[themeName],
        theme: themeName,
        // Preserve user settings that aren't part of the theme
        amountOfScheduleItems: currentConfig.amountOfScheduleItems,
        fontSize: currentConfig.fontSize,
        showCategory: currentConfig.showCategory,
        showTimes: currentConfig.showTimes,
        showTitle: currentConfig.showTitle,
      };
    }
  }

  window.Twitch.ext.configuration.onChanged(() => {
    const twitchConfig = window.Twitch.ext.configuration.broadcaster;
    if (twitchConfig?.content) {
      try {
        const parsedConfig = JSON.parse(twitchConfig.content) as TwitchExtensionConfiguration;
        config.value = {
          ...config.value,
          ...parsedConfig,
        };
      } catch (error) {
        console.error('Error parsing config:', error);
      }
    }
  });

  window.Twitch.ext.onContext(({ theme }) => {
    darkMode.value = theme === 'dark';
  });

  window.Twitch.ext.onAuthorized(async (auth) => {
    // fetch broadcaster info
    await fetchBroadcasterInfo({
      channelId: auth.channelId,
      clientId: auth.clientId,
      helixToken: auth.helixToken,
    });

    // fetch schedule
    await fetchSchedule({
      channelId: auth.channelId,
      clientId: auth.clientId,
      helixToken: auth.helixToken,
    });

    twitchLoading.value = false;
  });

  return {
    broadcasterName,
    config,
    schedule,
    twitchLoading,
    saveConfig,
    updateTheme,
  };
};
