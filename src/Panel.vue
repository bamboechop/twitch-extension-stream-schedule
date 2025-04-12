<template>
  <template v-if="!twitchLoading">
    <PanelMain
      :background-color="config.backgroundColor"
      :broadcaster-name="broadcasterName"
      :day-border-color="config.dayBorderColor"
      :font-color="config.fontColor"
      :font-family="config.fontFamily"
      :font-size="config.fontSize"
      :header-background-color="config.headerBackgroundColor"
      :header-font-color="config.headerFontColor"
      :panel-title="config.panelTitle"
      :schedule-button-background-color="config.scheduleButtonBackgroundColor"
      :schedule-button-font-color="config.scheduleButtonFontColor"
      :schedule-items="schedule"
      :show-category="config.showCategory"
      :show-times="config.showTimes"
      :show-title="config.showTitle"
      :show-usernames="config.showUsernames"
      :time-font-color="config.timeFontColor"
      :vacation="vacation"
      :vacation-background-color="config.vacationBackgroundColor"
      :vacation-font-color="config.vacationFontColor" />
  </template>
  <template v-if="twitchLoading">
    <div class="flex justify-center items-center h-full">
      <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
    </div>
  </template>
</template>

<script setup lang="ts">
import PanelMain from './components/panel/PanelMain.vue'
import { useTwitch } from './composables/twitch.composable';

const { broadcasterName, config, schedule, twitchLoading, vacation } = useTwitch();
</script>
