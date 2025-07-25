import './assets/base.css'

import { createApp } from 'vue'
import i18n from './i18n'
import VideoComponent from './VideoComponent.vue'

createApp(VideoComponent)
  .use(i18n)
  .mount('#video_component')
