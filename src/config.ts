import './assets/base.css'

import { createApp } from 'vue'
import Config from './Config.vue'
import i18n from './i18n'

createApp(Config)
  .use(i18n)
  .mount('#config')
