<template>
  <aside class="flex flex-col gap-[16px]">
    <p class="font-sans text-[14px] italic">{{ t('config.previewSchedule') }}</p>
    <template v-if="!twitchLoading">
      <template v-if="schedule.length === 0 && broadcasterName">
        <p class="font-sans text-[16px] font-bold text-yellow-500">
          {{ t('schedule.addStreamsToSchedule') }}<br />
          <a :href="scheduleConfigurationLink" target="_blank" class="text-blue-500 font-normal underline">{{ t('schedule.goToSchedule') }}</a>
        </p>
      </template>
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
      :show-times="showTimes"
      :show-title="showTitle"
      :time-font-color="timeFontColor"
      tag="section" />
    </template>
    <template v-if="twitchLoading">
      <CustomLoader class="mx-auto mt-8" />
    </template>
  </aside>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n'
import PanelMain from '../panel/PanelMain.vue'
import { useTwitch } from '@/composables/twitch.composable';
import CustomLoader from '../common/CustomLoader.vue';

const { t } = useI18n({ useScope: 'global' })

defineProps<{
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
  showTimes: boolean
  showTitle: boolean
  timeFontColor: string
}>()

const { broadcasterName, schedule, twitchLoading } = useTwitch();

const scheduleConfigurationLink = computed(() => {
  return `https://dashboard.twitch.tv/u/${broadcasterName.value}/settings/channel/schedule`;
})
</script>
