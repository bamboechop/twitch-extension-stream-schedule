<template>
  <div class="flex flex-col gap-y-[16px]">
    <div class="flex flex-col gap-y-[8px]">
      <CustomLabel id="amountOfScheduleItems">
        Number of schedule items (1-5)
      </CustomLabel>
      <div class="flex items-center gap-x-4">
        <input
          :value="amountOfScheduleItems"
          id="amountOfScheduleItems"
          type="range"
          min="1"
          max="5"
          step="1"
          class="w-full"
          @input="emits('update:amountOfScheduleItems', parseInt($event.target.value))" />
        <span class="text-[16px] w-8 text-center">{{ amountOfScheduleItems }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-y-[16px]">
      <div class="flex flex-row gap-x-[8px]">
        <input
          type="checkbox"
          id="showTitle"
          :checked="showTitle"
          @change="emits('update:showTitle', $event.target.checked)" />
        <CustomLabel id="showTitle">
          Show stream title
        </CustomLabel>
      </div>
      <div class="flex flex-row gap-x-[8px]">
        <input
          type="checkbox"
          id="showCategory"
          :checked="showCategory"
          @change="emits('update:showCategory', $event.target.checked)" />
        <CustomLabel id="showCategory">
          Show stream category
        </CustomLabel>
      </div>
      <div class="flex flex-row gap-x-[8px]">
        <input
          type="checkbox"
          id="showTimes"
          :checked="showTimes"
          @change="emits('update:showTimes', $event.target.checked)" />
        <CustomLabel id="showTimes">
          Show stream times
        </CustomLabel>
      </div>
      <div class="flex flex-col gap-y-[8px]">
        <CustomLabel id="panelTitle">
          Panel title
        </CustomLabel>
        <input
          type="text"
          id="panelTitle"
          placeholder="Streamplan"
          :value="panelTitle"
          @input="emits('update:panelTitle', $event.target.value.trim())" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import CustomLabel from '../common/CustomLabel.vue'

defineProps<{
  amountOfScheduleItems: number
  panelTitle: string
  showCategory: boolean
  showTimes: boolean
  showTitle: boolean
}>()

const emits = defineEmits<{
  (e: 'update:amountOfScheduleItems', value: number): void
  (e: 'update:panelTitle', value: string): void
  (e: 'update:showCategory', value: boolean): void
  (e: 'update:showTimes', value: boolean): void
  (e: 'update:showTitle', value: boolean): void
}>()
</script>
