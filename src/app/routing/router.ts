import Cards from '@pages/Cards/Cards.vue';
import Plan from '@pages/Plan.vue';
import Repetition from '@pages/Repetition.vue';
import Sections from '@pages/Sections/Sections.vue';
import Statistics from '@pages/Statistics.vue';

import { createMemoryHistory, createRouter } from 'vue-router';

const routes = [
    { path: '/', component: Sections },
    { path: '/sections/:id/cards', component: Cards },
    { path: '/repetition', component: Repetition },
    { path: '/plan', component: Plan },
    { path: '/statistics', component: Statistics },
];

const router = createRouter({
    history: createMemoryHistory(),
    routes,
});

export default router;
