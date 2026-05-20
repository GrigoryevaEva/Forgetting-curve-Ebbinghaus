<script setup lang="ts">
    import { ref, watch } from 'vue';
    import { useRoute } from 'vue-router';

    import { useAuthStore } from '@/stores/auth';

    import CustomButton from '@/shared/ui/components/CustomButton.vue';
    import LogoContainer from '@/shared/ui/components/LogoContainer.vue';

    import { useBreakpoints } from '@/composables';

    import { AUTH_PATH } from './routing/constants';
    import Navigation from './routing/Navigation.vue';

    const { isMobileAndTablet } = useBreakpoints();

    const authStore = useAuthStore();
    const route = useRoute();

    const isLoginPage = ref(false);
    watch(
        () => route.fullPath,
        (newValue) => {
            if (newValue === AUTH_PATH) {
                isLoginPage.value = true;
            } else {
                isLoginPage.value = false;
            }
        }
    );
</script>

<template>
    <header
        v-if="!isLoginPage"
        :class="{ headerMobile: isMobileAndTablet }"
    >
        <LogoContainer />
        <Navigation v-if="!isMobileAndTablet" />
        <div class="user">
            <p>{{ authStore.email }}</p>
            <RouterLink :to="AUTH_PATH">
                <CustomButton
                    icon="logout"
                    theme="transparent"
                    :when-click="authStore.logout"
                />
            </RouterLink>
        </div>
    </header>

    <main>
        <RouterView />
    </main>

    <footer v-if="isMobileAndTablet && !isLoginPage">
        <Navigation />
    </footer>
</template>

<style scoped lang="scss">
    header {
        position: fixed;
        right: 0;
        left: 0;

        display: flex;
        align-items: center;
        gap: var(--gap-4);

        height: 4rem;

        padding: 0 2rem;
    }
    main {
        display: flex;
        flex-direction: column;
        gap: var(--gap-6);
        width: 100vw;
        height: 100vh;

        background-image: linear-gradient(
            -30deg,
            var(--bg-blue-50),
            var(--bg-pink-50),
            var(--bg-purple-100)
        );

        padding: 6.5rem 2.5rem 2.5rem 2.5rem;
    }
    footer {
        position: fixed;
        right: 0;
        left: 0;
        bottom: 0;

        display: flex;
        align-items: center;

        height: 4rem;

        padding: 0 var(--padding-2);
    }
    header,
    footer {
        background-color: var(--bg-white);
    }
    .headerMobile {
        padding: 0 1rem;
    }
    .user {
        display: flex;
        align-items: center;
        gap: var(--gap-3);
        color: var(--text-purple-700);
    }
</style>
