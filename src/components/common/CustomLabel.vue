<template>
  <label class="text-[14px] font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" :for="id">
    <slot></slot>
  </label>
</template>

<script setup lang="ts">
defineProps<{
  id: string
}>()
</script>
