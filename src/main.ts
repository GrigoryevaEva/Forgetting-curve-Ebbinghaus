import Logger from 'js-logger';

import { createApp } from 'vue';

import App from './app/App.vue';
import pinia from './app/pinia';
import router from './app/routing/router';
import './shared/ui/styles/global.css';
import './shared/ui/styles/nullification.css';

Logger.useDefaults();

createApp(App).use(router).use(pinia).mount('#app');
