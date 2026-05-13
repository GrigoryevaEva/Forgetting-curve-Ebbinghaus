import Cards from '@pages/Cards/Cards.vue';
import Plan from '@pages/Plan.vue';
import Repetition from '@pages/Repetition.vue';
import Sections from '@pages/Sections/Sections.vue';

import { createRouter, createWebHistory } from 'vue-router';

const routes = [
    { path: '/', component: Sections },
    { path: '/sections/:id/cards', component: Cards },
    { path: '/repetition', component: Repetition },
    { path: '/plan', component: Plan },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
