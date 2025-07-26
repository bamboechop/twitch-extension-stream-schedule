<template>
  <div class="absolute top-0 left-0 right-0 bottom-0 p-8 bg-black/25">
    <div class="bg-[#0e0e10] text-white rounded-lg max-h-[505px] max-w-xl h-full w-full flex flex-col gap-y-2 p-6 shadow-xl relative mx-auto border-lime-600 border-2">
      <button
        class="absolute top-6 right-6 hover:text-red-400 transition-colors cursor-pointer"
        @click="emit('close')">
        <X :size="24" />
      </button>
      <h1 class="text-[24px] font-extrabold">{{ t('updateOverlay.title') }}</h1>
      <div v-if="!error" class="flex flex-col gap-y-4 overflow-y-auto">
        <div v-for="(version, index) in changelog" :key="version.version">
          <details :open="index === 0">
            <summary class="text-[18px] font-bold cursor-pointer hover:text-blue-400 transition-colors">
              <span v-if="index === 0">🆕 </span>v{{ version.version }}
              <span class="text-[14px] font-normal text-gray-400 ml-2">{{ version.date }}</span>
            </summary>
            <div class="pl-4 pt-2">
              <ul v-if="version.unsectionedItems.length > 0" class="list-none text-[14px] pl-2">
                <li v-for="item in version.unsectionedItems" :key="item" class="mb-1 text-gray-200">
                  {{ item }}
                </li>
              </ul>
              <div v-for="(items, sectionName) in version.sections" :key="sectionName">
                <h2 class="text-[16px] capitalize font-semibold text-blue-300">
                  {{ sectionName }}
                </h2>
                <ul class="list-none text-[14px] pl-2">
                  <li v-for="item in items" :key="item" class="mb-1 text-gray-200">
                    {{ item }}
                  </li>
                </ul>
              </div>
              <div v-if="version.unsectionedItems.length === 0 && Object.keys(version.sections).length === 0" class="text-gray-400 text-sm italic">
                {{ t('updateOverlay.noChanges') }}
              </div>
            </div>
          </details>
        </div>
      </div>
      <div v-if="error" class="text-red-400 text-sm p-4">
        {{ t('updateOverlay.error', { error }) }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue';
import { X } from 'lucide-vue-next';
import { useChangelog } from '@/composables/changelog.composable';
import { useI18n } from 'vue-i18n';

const emit = defineEmits(['close']);

const { t } = useI18n({ useScope: 'global' });

const { changelog, error, loadChangelog } = useChangelog();

onMounted(() => {
  loadChangelog();
});
</script>
