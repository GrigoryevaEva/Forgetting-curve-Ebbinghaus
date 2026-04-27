<script setup lang="ts">
    import { navItems } from './constants';
    import IconSprite from '@shared/ui/assets/icons/IconSprite.vue';
    import { useBreakpoints } from '@/composables';

    const { isMobileAndTablet } = useBreakpoints()

</script>

<template>
    <nav
        class="nav"
        :class="{ navMobile: isMobileAndTablet }"
    >
        <RouterLink
            v-for="item in navItems"
            :to="item.path"
            class="item"
            :class="{ itemMobile: isMobileAndTablet }"
        >
            <IconSprite :name="item.icon" class="icon" />
            <p>{{ item.name }}</p>
        </RouterLink>
    </nav>
</template>

<style scoped>
    .nav {
        display: flex;
        gap: var(--gap-2);
        justify-content: end;

        width: 100%;
    }
    .item {
        display: flex;
        gap: var(--gap-2);
        align-items: center;

        border-radius: var(--radius-3xl);

        padding: 0.5rem 1rem;

        transition: all 0.2s;
    }
    .item:hover {
        background-color: var(--bg-purple-50);
        transition: all 0.2s;
    }
    .item.router-link-exact-active {
        background-color: var(--bg-purple-100);
        transition: all 0.2s;
    }
    .itemMobile {
        flex-direction: column;
        flex: 1;

        border-radius: var(--radius-xl);
    }
    .icon {
        height: 1rem;
        width: 1rem;
    }
    .icon,
    .item {
        color: var(--text-purple-700);
    }
</style>