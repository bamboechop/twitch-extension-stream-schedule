import './assets/base.css'

import { createApp } from 'vue'
import i18n from './i18n'
import VideoOverlay from './VideoOverlay.vue'

createApp(VideoOverlay)
  .use(i18n)
  .mount('#video_overlay')
