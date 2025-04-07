<template>
  <div class="bg-neutral-800 h-[40px] items-center justify-center rounded-md bg-muted p-[4px] grid w-full grid-cols-3 gap-x-[8px]">
    <label
      v-for="option in options"
      :key="option.value"
      class="relative inline-flex items-center justify-center whitespace-nowrap text-white rounded-sm px-[12px] py-[6px] text-[14px] font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      :class="[
        selectedOption === option.value ? 'bg-indigo-700 shadow-sm' : 'cursor-pointer hover:bg-indigo-800'
      ]">
      <input
        type="radio"
        :value="option.value"
        v-model="selectedOption"
        class="sr-only" />
      {{ option.label }}
    </label>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'

const props = defineProps<{
  selectedOption: 'general' | 'appearance' | 'typography'
}>()

const emits = defineEmits<{
  (e: 'update:selectedOption', value: 'general' | 'appearance' | 'typography'): void
}>()

// Create a computed property for v-model binding
const selectedOption = computed({
  get: () => props.selectedOption,
  set: (value: 'general' | 'appearance' | 'typography') => {
    emits('update:selectedOption', value)
  }
})

const options = ref([
  { label: 'General', value: 'general' },
  { label: 'Appearance', value: 'appearance' },
  { label: 'Typography', value: 'typography' },
])
</script>
