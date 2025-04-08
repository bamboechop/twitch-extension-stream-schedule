<template>
  <div class="flex flex-col gap-y-[16px]">
    <div class="flex flex-col gap-y-[8px]">
      <CustomLabel id="amountOfScheduleItems">
        {{ t('config.general.numberOfItems') }}
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
          @input="emits('update:amountOfScheduleItems', parseInt(($event.target as HTMLInputElement).value))" />
        <span class="text-[16px] w-8 text-center">{{ amountOfScheduleItems }}</span>
      </div>
    </div>
    <div class="flex flex-col gap-y-[16px]">
      <div class="flex flex-col gap-y-[8px]">
        <CustomLabel id="panelTitle">
          {{ t('config.general.panelTitle') }}
        </CustomLabel>
        <input
          type="text"
          id="panelTitle"
          :placeholder="t('config.general.panelTitlePlaceholder')"
          :value="panelTitle"
          @input="emits('update:panelTitle', ($event.target as HTMLInputElement).value.trim())" />
      </div>
      <div class="flex flex-row gap-x-[8px]">
        <input
          type="checkbox"
          id="showTitle"
          :checked="showTitle"
          @change="emits('update:showTitle', ($event.target as HTMLInputElement).checked)" />
        <CustomLabel id="showTitle">
          {{ t('config.general.showStreamTitle') }}
        </CustomLabel>
      </div>
      <div class="flex flex-row gap-x-[8px]">
        <input
          type="checkbox"
          id="showCategory"
          :checked="showCategory"
          @change="emits('update:showCategory', ($event.target as HTMLInputElement).checked)" />
        <CustomLabel id="showCategory">
          {{ t('config.general.showStreamCategory') }}
        </CustomLabel>
      </div>
      <div class="flex flex-row gap-x-[8px]">
        <input
          type="checkbox"
          id="showTimes"
          :checked="showTimes"
          @change="emits('update:showTimes', ($event.target as HTMLInputElement).checked)" />
        <CustomLabel id="showTimes">
          {{ t('config.general.showStreamTimes') }}
        </CustomLabel>
      </div>
      <div class="flex flex-row gap-x-[8px]">
        <input
          type="checkbox"
          id="showUsernames"
          :checked="showUsernames"
          @change="emits('update:showUsernames', ($event.target as HTMLInputElement).checked)" />
        <CustomLabel id="showUsernames">
          {{ t('config.general.showStreamUsernames') }}
        </CustomLabel>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import CustomLabel from '../common/CustomLabel.vue'

const { t } = useI18n({ useScope: 'global' })

defineProps<{
  amountOfScheduleItems: number
  panelTitle: string
  showCategory: boolean
  showTimes: boolean
  showTitle: boolean
  showUsernames: boolean
}>()

const emits = defineEmits<{
  (e: 'update:amountOfScheduleItems', value: number): void
  (e: 'update:panelTitle', value: string): void
  (e: 'update:showCategory', value: boolean): void
  (e: 'update:showTimes', value: boolean): void
  (e: 'update:showTitle', value: boolean): void
  (e: 'update:showUsernames', value: boolean): void
}>()
</script>
