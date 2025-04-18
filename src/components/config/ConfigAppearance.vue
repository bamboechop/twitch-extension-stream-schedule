<template>
  <div class="flex flex-col gap-y-[16px]">
    <div class="flex flex-col gap-y-[8px]">
      <CustomLabel id="theme">
        {{ t('config.appearance.theme') }}
      </CustomLabel>
      <select
        id="theme"
        :value="theme"
        @change="emits('update:theme', ($event.target as HTMLSelectElement).value)"
        class="w-full text-[16px] bg-neutral-800 text-gray-100 border border-neutral-600 rounded-sm px-[12px] py-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500">
        <option v-for="theme in groupedThemes.default" :key="theme" :value="theme" class="bg-neutral-800 text-gray-100">
          {{ t(`config.appearance.themes.${theme}`) }}
        </option>
        <optgroup :label="t('config.appearance.themes.themeGroups.dark')" class="bg-neutral-800 text-gray-100">
          <option v-for="theme in groupedThemes.dark" :key="theme" :value="theme" class="bg-neutral-800 text-gray-100">
            {{ t(`config.appearance.themes.${theme}`) }}
          </option>
        </optgroup>
        <optgroup :label="t('config.appearance.themes.themeGroups.light')" class="bg-neutral-800 text-gray-100">
          <option v-for="theme in groupedThemes.light" :key="theme" :value="theme" class="bg-neutral-800 text-gray-100">
            {{ t(`config.appearance.themes.${theme}`) }}
          </option>
        </optgroup>
        <option v-if="theme === 'custom'" value="custom" class="bg-neutral-800 text-gray-100">
          {{ t('config.appearance.themes.custom') }}
        </option>
      </select>
    </div>
    <div class="grid sm:grid-cols-2 gap-[16px]">
      <div v-for="config in colorConfigs" :key="config.id" class="flex flex-col gap-y-[8px]">
        <CustomLabel :id="config.id">
          {{ t(`config.appearance.${config.id}`) }}
        </CustomLabel>
        <div class="flex items-center gap-x-[8px]">
          <input
            class="w-[48px] h-[36px] text-[14px] border-neutral-600"
            type="color"
            :id="config.id"
            :value="colorValues[config.id]"
            @input="handleColorChange($event, config.id)"
          />
          <input
            class="w-full text-[14px] bg-neutral-800 text-gray-100 border border-neutral-600 rounded-sm px-[12px] py-[8px] focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            type="text"
            :id="config.id"
            :value="props[config.id]"
            @input="handleTextInput($event, config.id)"
            @blur="handleBlur($event, config.id)"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomLabel from '../common/CustomLabel.vue'
import { themes } from '@/common/themes'

const { t } = useI18n({ useScope: 'global' })

// Define which themes belong to which group
const groupedThemes = computed(() => {
  const lightThemes = ['crystalClear', 'sakuraSpring', 'oceanBreeze', 'goldenHour', 'lavenderFields'];
  const darkThemes = ['neonNights', 'mintChocolate', 'sunsetVibes', 'royalPurple', 'enchantedForest', 'retroWave', 'deepSpace'];

  return {
    default: ['default'],
    dark: Object.keys(themes).filter(theme => darkThemes.includes(theme)),
    light: Object.keys(themes).filter(theme => lightThemes.includes(theme))
  };
});

const props = defineProps<{
  backgroundColor: string
  dayBorderColor: string
  fontColor: string
  headerBackgroundColor: string
  headerFontColor: string
  scheduleButtonBackgroundColor: string
  scheduleButtonFontColor: string
  theme: string
  timeFontColor: string
  vacationBackgroundColor: string
  vacationFontColor: string
}>()

const emits = defineEmits<{
  (e: 'update:theme', value: string): void
  (e: `update:${keyof typeof colorValues.value}`, value: string): void
}>()

// order matters for the appearance in the grid
const colorConfigs = [
  // Main colors
  { id: 'backgroundColor', label: 'Background color' },
  { id: 'fontColor', label: 'Font color' },
  // Header colors
  { id: 'headerBackgroundColor', label: 'Header background color' },
  { id: 'headerFontColor', label: 'Header font color' },
  // Button colors
  { id: 'scheduleButtonBackgroundColor', label: 'Schedule button background color' },
  { id: 'scheduleButtonFontColor', label: 'Schedule button font color' },
  // Schedule colors
  { id: 'dayBorderColor', label: 'Day border color' },
  { id: 'timeFontColor', label: 'Time font color' },
  // Vacation notice colors
  { id: 'vacationBackgroundColor', label: 'Vacation notice background color' },
  { id: 'vacationFontColor', label: 'Vacation notice font color' },
] as const

// Keep track of expanded color values for the color pickers
const colorValues = ref({
  backgroundColor: props.backgroundColor,
  dayBorderColor: props.dayBorderColor,
  headerBackgroundColor: props.headerBackgroundColor,
  fontColor: props.fontColor,
  headerFontColor: props.headerFontColor,
  scheduleButtonBackgroundColor: props.scheduleButtonBackgroundColor,
  scheduleButtonFontColor: props.scheduleButtonFontColor,
  timeFontColor: props.timeFontColor,
  vacationBackgroundColor: props.vacationBackgroundColor,
  vacationFontColor: props.vacationFontColor,
})

// Watch for prop changes and update colorValues
colorConfigs.forEach(config => {
  watch(() => props[config.id], (newValue) => {
    colorValues.value[config.id] = newValue
  })
})

const isValidHexColor = (color: string) => {
  return /^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(color)
}

const expandShortHex = (color: string) => {
  // If it's already a 6-digit hex, return as is
  if (color.length === 7) return color

  // For 3-digit hex, expand each digit
  const hex = color.slice(1) // Remove #
  return `#${hex.split('').map(char => char + char).join('')}`
}

// New function to handle color picker changes
const handleColorChange = (event: Event, field: keyof typeof colorValues.value) => {
  const input = event.target as HTMLInputElement
  const value = input.value

  // Update color value and set theme to custom
  emits(`update:${field}`, value)
  colorValues.value[field] = value
  emits('update:theme', 'custom')
}

const handleTextInput = (event: Event, field: keyof typeof colorValues.value) => {
  const input = event.target as HTMLInputElement
  const value = input.value
  // Ensure the value starts with #
  const colorValue = value.startsWith('#') ? value : `#${value}`
  // Only emit if it's a valid hex color
  if (isValidHexColor(colorValue)) {
    emits(`update:${field}`, colorValue)
    colorValues.value[field] = expandShortHex(colorValue)
    emits('update:theme', 'custom')
  }
}

const handleBlur = (event: Event, field: keyof typeof colorValues.value) => {
  const input = event.target as HTMLInputElement
  const propValue = props[field]

  // If current value is invalid, reset to the prop value
  if (!isValidHexColor(input.value)) {
    input.value = propValue
    colorValues.value[field] = propValue
  } else {
    // If valid, ensure it's expanded to 6 digits and emit
    const expandedColor = expandShortHex(input.value)
    input.value = expandedColor
    colorValues.value[field] = expandedColor
    emits(`update:${field}`, expandedColor)
    emits('update:theme', 'custom')
  }
}
</script>
