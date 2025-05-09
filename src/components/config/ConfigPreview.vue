<template>
  <aside class="flex flex-col gap-[16px]">
    <p class="font-sans text-[14px] italic">{{ t('config.previewSchedule') }}</p>
    <template v-if="!twitchLoading && schedule.length === 0 && broadcasterName">
      <p class="font-sans text-[16px] font-bold text-yellow-500">
        {{ t('schedule.addStreamsToSchedule') }}<br />
        <a :href="scheduleConfigurationLink" target="_blank" class="text-blue-500 font-normal underline">{{ t('schedule.goToSchedule') }}</a>
      </p>
    </template>
    <div class="flex max-h-twitch-iframe-height max-w-twitch-iframe-width h-screen items-center justify-center">
      <template v-if="!twitchLoading">
        <PanelMain
          :background-color="backgroundColor"
          :broadcaster-name="broadcasterName"
          class="border border-[#53535f]"
          :day-border-color="dayBorderColor"
          :font-color="fontColor"
          :font-family="fontFamily"
          :font-size="fontSize"
          :header-background-color="headerBackgroundColor"
          :header-font-color="headerFontColor"
          :panel-title="panelTitle"
          :schedule-button-background-color="scheduleButtonBackgroundColor"
          :schedule-button-font-color="scheduleButtonFontColor"
          :schedule-items="schedule"
          :show-category="showCategory"
          :show-header="showHeader"
          :show-times="showTimes"
          :show-title="showTitle"
          :show-usernames="showUsernames"
          :time-font-color="timeFontColor"
          :vacation="previewVacation"
          :vacation-background-color="vacationBackgroundColor"
          :vacation-font-color="vacationFontColor"
          tag="section" />
      </template>
      <template v-if="twitchLoading">
        <CustomLoader />
      </template>
    </div>
    <template v-if="showPreviewInfo">
      <div class="flex items-center gap-2">
        <BadgeInfo class="text-neutral-400 shrink-0" :size="18" />
        <p class="font-sans text-[14px] italic text-neutral-400">{{ t('schedule.previewVacationInfo') }}</p>
      </div>
    </template>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import PanelMain from '../panel/PanelMain.vue'
import { useTwitch } from '@/composables/twitch.composable';
import CustomLoader from '../common/CustomLoader.vue';
import { BadgeInfo } from 'lucide-vue-next';

const { t } = useI18n({ useScope: 'global' })

const props = defineProps<{
  backgroundColor: string
  dayBorderColor: string
  fontColor: string
  fontFamily: string
  fontSize: number
  headerBackgroundColor: string
  headerFontColor: string
  panelTitle: string
  scheduleButtonBackgroundColor: string
  scheduleButtonFontColor: string
  showCategory: boolean
  showHeader: boolean
  showTimes: boolean
  showTitle: boolean
  showUsernames: boolean
  selectedView?: 'general' | 'appearance' | 'typography'
  timeFontColor: string
  vacationBackgroundColor: string
  vacationFontColor: string
}>()

const { broadcasterName, schedule, twitchLoading, vacation: realVacation } = useTwitch();

// Show info text only when we're showing the preview vacation
const showPreviewInfo = computed(() => props.selectedView === 'appearance' && !realVacation.value);

// Create a preview vacation state that shows when in appearance tab and no real vacation is set
const previewVacation = computed(() => {
  // If not in appearance view, or if there's a real vacation set, use the real value
  if (props.selectedView !== 'appearance' || realVacation.value) {
    return realVacation.value;
  }

  // Generate future dates for the preview
  const startDate = new Date();
  startDate.setDate(startDate.getDate() + 7); // Start in a week
  const endDate = new Date(startDate);
  endDate.setDate(endDate.getDate() + 7); // End a week after start

  return {
    start_time: startDate.toISOString(),
    end_time: endDate.toISOString()
  };
});

const scheduleConfigurationLink = computed(() => {
  return `https://dashboard.twitch.tv/u/${broadcasterName.value}/settings/channel/schedule`;
})
</script>
