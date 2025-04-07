<template>
  <component
    :is="tag"
    class="relative font-(--extension-font-family) overflow-auto flex flex-col gap-y-4 max-h-twitch-iframe-height max-w-twitch-iframe-width h-screen mx-auto w-full bg-(--extension-color-background) text-(--extension-color-text)">
    <h1 class="bg-(--extension-color-header-background) text-2xl font-bold p-3 text-(--extension-color-header-font-color)">{{ panelTitle || 'Streamplan' }}</h1>
    <div class="flex flex-col gap-y-4 h-full p-3 pt-0">
      <template v-if="scheduleItems.length > 0">
        <template v-for="group in scheduleItems" :key="group.date">
          <div class="flex flex-col">
            <div class="flex items-center gap-x-2">
              <h2 class="text-md font-bold opacity-75 uppercase">{{ formatDay(group.date) }} <span class="text-sm">({{ formatDate(group.date) }})</span></h2>
              <hr class="bg-(--extension-color-day-border) h-[2px] border-0 grow" />
            </div>
            <div class="flex flex-col gap-y-2">
              <template v-for="item in group.items" :key="item.id">
                <div class="grid grid-cols-[1fr_90px] gap-x-3">
                  <div class="flex flex-col grow gap-y-1">
                    <template v-if="showTitle && item.title">
                      <h3 class="text-lg font-bold">{{ item.title }}</h3>
                    </template>
                    <template v-if="showCategory && item.category">
                      <div class="flex items-center gap-x-2">
                        <Tag :size="fontSize" />
                        <h4
                          class="font-bold"
                          :class="{ 'text-lg': !showTitle, 'text-md': showTitle }">
                          {{ item.category.name }}
                        </h4>
                      </div>
                    </template>
                  </div>
                  <template v-if="showTimes">
                    <div class="text-xs italic text-(--extension-color-time-font-color) flex items-stat gap-x-1 justify-end text-right">
                      <AlarmClock class="mt-[2px]" :size="fontSize * 0.75" />
                      {{ formatTime(item.start_time) }}
                      <template v-if="item.end_time">
                        <br />
                        {{ formatTime(item.end_time) }}
                      </template>
                    </div>
                  </template>
                </div>
              </template>
            </div>
          </div>
        </template>
      </template>
      <template v-if="scheduleItems.length === 0">
        <p class="text-center text-gray-500">No scheduled streams</p>
      </template>
    </div>
      <div class="sticky bottom-0 left-0 right-0 flex flex-col gap-y-1 items-center justify-center px-3 py-2 bg-(--extension-color-background)">
        <p class="flex items-center gap-x-1 text-xs text-(--extension-color-text)">
          <AlarmClock :size="fontSize * 0.75" />
          Times shown are in your local timezone
        </p>
        <template v-if="scheduleLink">
          <button
          class="bg-(--extension-color-schedule-button-background) cursor-pointer text-(--extension-color-schedule-button-font-color) font-semibold text-xs flex items-center gap-x-1 px-4 py-2 rounded-md"
          type="button"
          @click="openSchedule">
          View full schedule
        </button>
      </template>
    </div>
  </component>
</template>

<script setup lang="ts">
import { computed, watch } from 'vue'
import { useUrlSearchParams } from '@vueuse/core';
import { AlarmClock, Tag } from 'lucide-vue-next'
import type { GroupedScheduleItem, TwitchUrlSearchParams } from '@/common/interfaces/twitch.interface'

const {
  backgroundColor,
  broadcasterName,
  dayBorderColor,
  fontColor,
  fontFamily,
  fontSize,
  headerBackgroundColor,
  headerFontColor,
  scheduleButtonBackgroundColor,
  scheduleButtonFontColor,
  showCategory,
  showTimes,
  showTitle,
  tag = 'main',
  timeFontColor,
} = defineProps<{
  backgroundColor: string
  broadcasterName: string
  dayBorderColor: string
  fontColor: string
  fontFamily: string
  fontSize: number
  headerBackgroundColor: string
  headerFontColor: string
  panelTitle: string
  scheduleButtonBackgroundColor: string
  scheduleButtonFontColor: string
  scheduleItems: GroupedScheduleItem[]
  showCategory: boolean
  showTimes: boolean
  showTitle: boolean
  tag?: string
  timeFontColor: string
}>()

const urlParams = useUrlSearchParams<TwitchUrlSearchParams>('history');

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(urlParams.locale, {
    day: 'numeric',
    month: 'numeric',
  });
}

const formatDay = (dateString: string) => {
  return new Date(dateString).toLocaleDateString(urlParams.locale, {
    weekday: 'long',
  });
}

const formatTime = (dateTimeString: string) => {
  return new Date(dateTimeString).toLocaleTimeString(urlParams.locale, {
    hour: 'numeric',
    minute: '2-digit',
    hour12: !urlParams.locale.startsWith('de'),
  });
}

const scheduleLink = computed(() => {
  return `https://www.twitch.tv/${broadcasterName}/schedule`
})

function openSchedule() {
  window.open(scheduleLink.value, '_blank')
}

watch(() => backgroundColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-background', value)
}, { immediate: true })

watch(() => dayBorderColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-day-border', value)
}, { immediate: true })

watch(() => fontColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-text', value)
}, { immediate: true })

watch(() => fontFamily, (value) => {
  const googleFont = document.getElementById('googleFont')
  if (googleFont) {
    googleFont.href = `https://fonts.googleapis.com/css2?family=${value.replace(' ', '+')}:wght@400;500;700&display=swap`
  }
  document.documentElement.style.setProperty('--extension-font-family', `${value}, sans-serif`)
}, { immediate: true })

watch(() => fontSize, (value) => {
  document.documentElement.style.setProperty('--extension-font-size', `${value}px`)
}, { immediate: true })

watch(() => headerBackgroundColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-header-background', value)
}, { immediate: true })

watch(() => headerFontColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-header-font-color', value)
}, { immediate: true })

watch(() => scheduleButtonBackgroundColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-schedule-button-background', value)
}, { immediate: true })

watch(() => scheduleButtonFontColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-schedule-button-font-color', value)
}, { immediate: true })

watch(() => timeFontColor, (value) => {
  document.documentElement.style.setProperty('--extension-color-time-font-color', value)
}, { immediate: true })
</script>
