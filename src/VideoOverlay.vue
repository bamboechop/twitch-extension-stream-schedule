<template>
  <div class="bg-(--extension-color-background) border-(--extension-color-day-border) border-4 border-l-0 flex max-h-twitch-iframe-height max-w-[322px] items-center justify-center w-full mb-12 h-[calc(100%-96px)]">
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
        :show-header="config.showHeader"
        show-minimize-button
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

<style>
body.body-video-overlay {
  background: transparent;
}

#video_overlay {
  align-items: end;
  display: flex;
  height: 100%;
}
</style>
