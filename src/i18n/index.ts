import { createI18n } from 'vue-i18n'
import { useUrlSearchParams } from '@vueuse/core'

import de from './locales/de.json'
import en from './locales/en.json'

type MessageSchema = typeof en

const urlParams = useUrlSearchParams<{ language: string }>('history')

const i18n = createI18n<[MessageSchema], 'en' | 'de'>({
  legacy: false,
  locale: urlParams.language ?? 'en',
  fallbackLocale: 'en',
  messages: {
    en,
    de
  }
})

export default i18n
