<template>
  <div class="flex w-screen h-screen items-center justify-center">
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
        is-mobile
        :panel-title="config.panelTitle"
        :schedule-button-background-color="config.scheduleButtonBackgroundColor"
        :schedule-button-font-color="config.scheduleButtonFontColor"
        :schedule-items="schedule"
        :show-category="config.showCategory"
        :show-header="config.showHeader"
        :show-times="config.showTimes"
        :show-title="config.showTitle"
        :show-usernames="config.showUsernames"
        :time-font-color="config.timeFontColor"
        :vacation="vacation"
        :vacation-background-color="config.vacationBackgroundColor"
        :vacation-font-color="config.vacationFontColor" />
    </template>
    <template v-if="twitchLoading">
      <CustomLoader />
    </template>
  </div>
</template>

<script setup lang="ts">
import PanelMain from './components/panel/PanelMain.vue';
import CustomLoader from './components/common/CustomLoader.vue';
import { useTwitch } from './composables/twitch.composable';

const { broadcasterName, config, schedule, twitchLoading, vacation } = useTwitch();
</script>
