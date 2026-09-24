import Auth from '@pages/Auth/Auth.vue';
import Cards from '@pages/Cards/Cards.vue';
import Plan from '@pages/Plan/Plan.vue';
import Repetition from '@pages/Repetition/Repetition.vue';
import Sections from '@pages/Sections/Sections.vue';

import { createRouter, createWebHistory } from 'vue-router';

import { useAuthStore } from '@/stores/auth';
import { useSectionStore } from '@/stores/sections';

const routes = [
    {
        path: '/',
        component: Sections,
        meta: { requiresAuth: true },
    },
    {
        path: '/login',
        component: Auth,
        meta: { requiresAuth: false, isPublic: true },
        beforeEnter: async (to, from, next) => {
            const authStore = useAuthStore();

            if (authStore.isAuth) {
                next({
                    path: '/',
                });
            } else {
                next();
            }
        },
    },
    {
        path: '/sections/:id/cards',
        component: Cards,
        meta: { requiresAuth: true },
        beforeEnter: async (to, from, next) => {
            const sectionId = to.params.id;
            const store = useSectionStore();

            if (!store.hasSection(sectionId)) {
                next({
                    path: '/',
                    query: { error: 'section_not_found' },
                });
                return;
            }
            next();
        },
    },
    {
        path: '/repetition',
        component: Repetition,
        meta: { requiresAuth: true },
    },
    {
        path: '/plan',
        component: Plan,
        meta: { requiresAuth: true },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.beforeEach(async (to, from, next) => {
    if (!to.meta.requiresAuth) {
        return next();
    }

    const authStore = useAuthStore();

    if (authStore.isAuth) {
        next();
    } else {
        next('/login');
    }
});

export default router;
