<template>
  <section class="grid lg:grid-cols-[1fr_340px] gap-[24px] p-[16px]">
    <ConfigMain
      :amount-of-schedule-items="config.amountOfScheduleItems"
      :background-color="config.backgroundColor"
      :day-border-color="config.dayBorderColor"
      :font-color="config.fontColor"
      :font-family="config.fontFamily"
      :font-size="config.fontSize"
      :header-background-color="config.headerBackgroundColor"
      :header-font-color="config.headerFontColor"
      :schedule-button-background-color="config.scheduleButtonBackgroundColor"
      :schedule-button-font-color="config.scheduleButtonFontColor"
      :show-category="config.showCategory"
      :show-success-message="showSuccessMessage"
      :show-times="config.showTimes"
      :show-title="config.showTitle"
      :time-font-color="config.timeFontColor"
      :theme="config.theme"
      @save-config="save"
      @update:amount-of-schedule-items="config.amountOfScheduleItems = $event"
      @update:background-color="config.backgroundColor = $event"
      @update:day-border-color="config.dayBorderColor = $event"
      @update:font-color="config.fontColor = $event"
      @update:font-family="config.fontFamily = $event"
      @update:font-size="config.fontSize = $event"
      @update:header-background-color="config.headerBackgroundColor = $event"
      @update:header-font-color="config.headerFontColor = $event"
      @update:schedule-button-background-color="config.scheduleButtonBackgroundColor = $event"
      @update:schedule-button-font-color="config.scheduleButtonFontColor = $event"
      @update:show-category="config.showCategory = $event"
      @update:show-times="config.showTimes = $event"
      @update:show-title="config.showTitle = $event"
      @update:theme="handleThemeChange"
      @update:time-font-color="config.timeFontColor = $event" />
    <ConfigPreview
      :background-color="config.backgroundColor"
      :day-border-color="config.dayBorderColor"
      :font-color="config.fontColor"
      :font-family="config.fontFamily"
      :font-size="config.fontSize"
      :header-background-color="config.headerBackgroundColor"
      :header-font-color="config.headerFontColor"
      :schedule-button-background-color="config.scheduleButtonBackgroundColor"
      :schedule-button-font-color="config.scheduleButtonFontColor"
      :show-category="config.showCategory"
      :show-times="config.showTimes"
      :show-title="config.showTitle"
      :theme="config.theme"
      :time-font-color="config.timeFontColor" />
  </section>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useTwitch } from '@/composables/twitch.composable'
import ConfigMain from './components/config/ConfigMain.vue'
import ConfigPreview from './components/config/ConfigPreview.vue'
import type { TwitchExtensionTheme } from './common/interfaces/twitch.interface'

const { config, saveConfig, updateTheme } = useTwitch()

const showSuccessMessage = ref(false)

const handleThemeChange = (theme: TwitchExtensionTheme) => {
  updateTheme(theme)
}

const save = () => {
  try {
    saveConfig()
    showSuccessMessage.value = true
    setTimeout(() => {
      showSuccessMessage.value = false
    }, 3000)
  } catch (error) {
    console.error('Error saving config:', error)
  }
}
</script>
