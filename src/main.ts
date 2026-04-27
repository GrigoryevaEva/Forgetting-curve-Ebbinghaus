import { createApp } from 'vue'

import router from './app/routing/router'
import pinia from './app/pinia'
import App from './app/App.vue'

import './shared/ui/styles/global.css'
import './shared/ui/styles/nullification.css'

createApp(App)
    .use(router)
    .use(pinia)
    .mount('#app')
