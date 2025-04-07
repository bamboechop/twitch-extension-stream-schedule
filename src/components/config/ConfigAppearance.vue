<template>
  <div class="flex flex-col gap-y-[8px]">
    <CustomLabel id="theme">
      {{ t('config.appearance.theme') }}
    </CustomLabel>
    <select id="theme" :value="theme" @change="emits('update:theme', ($event.target as HTMLSelectElement).value)">
      <option v-for="(label, value) in themes" :key="value" :value="value">
        {{ t(`config.appearance.themes.${value}`) }}
      </option>
      <option v-if="theme === 'custom'" value="custom">
        {{ t('config.appearance.themes.custom') }}
      </option>
    </select>
    <div v-for="config in colorConfigs" :key="config.id" class="flex flex-col gap-y-[8px]">
      <CustomLabel :id="config.id">
        {{ t(`config.appearance.${config.id}`) }}
      </CustomLabel>
      <div class="flex items-center gap-x-[8px]">
        <input
          class="w-[40px] h-[24px] text-[14px]"
          type="color"
          :id="config.id"
          :value="colorValues[config.id]"
          @input="handleColorChange($event, config.id)"
        />
        <input
          class="w-full text-[14px]"
          type="text"
          :id="config.id"
          :value="props[config.id]"
          @input="handleTextInput($event, config.id)"
          @blur="handleBlur($event, config.id)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import CustomLabel from '../common/CustomLabel.vue'
import { themes } from '@/common/themes';

const { t } = useI18n({ useScope: 'global' })

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
}>()

const emits = defineEmits<{
  (e: 'update:theme', value: string): void
  (e: `update:${keyof typeof colorValues.value}`, value: string): void
}>()

const colorConfigs = [
  { id: 'backgroundColor', label: 'Background color' },
  { id: 'headerBackgroundColor', label: 'Header background color' },
  { id: 'fontColor', label: 'Font color' },
  { id: 'headerFontColor', label: 'Header font color' },
  { id: 'scheduleButtonBackgroundColor', label: 'Schedule button background color' },
  { id: 'scheduleButtonFontColor', label: 'Schedule button font color' },
  { id: 'timeFontColor', label: 'Time font color' },
  { id: 'dayBorderColor', label: 'Day border color' },
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
