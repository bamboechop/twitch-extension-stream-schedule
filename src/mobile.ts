import './assets/base.css'

import { createApp } from 'vue'
import i18n from './i18n'
import Mobile from './Mobile.vue'

createApp(Mobile)
  .use(i18n)
  .mount('#mobile')
