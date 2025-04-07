import './assets/base.css'

import { createApp } from 'vue'
import i18n from './i18n'
import Panel from './Panel.vue'

createApp(Panel)
  .use(i18n)
  .mount('#panel')
