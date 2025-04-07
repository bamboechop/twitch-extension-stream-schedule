<template>
  <div class="flex flex-col gap-y-[16px]">
    <div class="flex flex-col gap-y-[8px]">
      <CustomLabel id="fontFamily">
        Font family
      </CustomLabel>
      <select
        id="fontFamily"
        :value="fontFamily"
        @change="emits('update:fontFamily', $event.target.value)"
        class="w-full text-[16px]">
        <option v-for="font in fonts" :key="font" :value="font">
          {{ font }}
        </option>
      </select>
    </div>
    <div class="flex flex-col gap-y-[8px]">
      <CustomLabel id="fontSize">
        Font size
      </CustomLabel>
      <input
        type="number"
        id="fontSize"
        min="12"
        max="24"
        :value="fontSize"
        @blur="handleFontSizeBlur"
        class="w-full text-[16px] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [&]:[-moz-appearance:textfield]" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import CustomLabel from '../common/CustomLabel.vue'

const fonts = ref([
  'Roboto',
  'Noto Sans',
  'Lato',
  'Montserrat',
  'Poppins',
  'Source Sans Pro',
  'Raleway',
  'Ubuntu',
  'Playfair Display',
  'Nunito',
  'Geist',
  'Geist Mono',
  'Inter',
])

defineProps<{
  fontFamily: string
  fontSize: number
}>()

const emits = defineEmits<{
  (e: 'update:fontFamily', value: string): void
  (e: 'update:fontSize', value: number): void
}>()

const handleFontSizeBlur = (event: Event) => {
  const input = event.target as HTMLInputElement
  let value = parseInt(input.value)

  if (isNaN(value)) {
    value = 12
  } else {
    value = Math.min(Math.max(value, 12), 24)
  }

  input.value = value.toString()
  emits('update:fontSize', value)
}
</script>
