<script setup lang="ts">
    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
    import Logo from '@/shared/ui/assets/icons/Logo.vue';

    import { useBreakpoints } from '@/composables';

    import Navigation from './routing/Navigation.vue';

    const { isMobileAndTablet } = useBreakpoints();
</script>

<template>
    <header :class="{ headerMobile: isMobileAndTablet }">
        <div class="containerLogo">
            <Logo class="logo" />
            <p>Memento</p>
        </div>
        <Navigation v-if="!isMobileAndTablet" />
        <div class="user">
            <p>Barrrister</p>
            <IconSprite
                name="logOut"
                class="userIcon"
            />
        </div>
    </header>

    <main>
        <RouterView />
    </main>

    <footer v-if="isMobileAndTablet">
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
    .headerMobile {
        padding: 0 1rem;
    }
    .containerLogo {
        display: flex;
        gap: var(--gap-3);
        align-items: center;
        flex: 1;
    }
    .containerLogo p {
        color: var(--bg-purple-900);
        font-family: Futurespore;
        font-size: var(--text-2xl);
    }
    .logo {
        width: 1.875rem;
        height: 1.875rem;
        color: var(--bg-purple-400);
    }
    .user {
        display: flex;
        align-items: center;
        gap: var(--gap-3);
        color: var(--text-purple-700);
        &Icon {
            height: 1rem;
            width: 1rem;
        }
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
            var(--bg-purple-50)
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
</style>
