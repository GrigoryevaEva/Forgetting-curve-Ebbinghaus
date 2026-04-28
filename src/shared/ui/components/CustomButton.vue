<script setup lang="ts">
    import IconSprite from '../assets/icons/IconSprite.vue';
    import type { TIconName } from '../assets/icons/types';

    type Themes = 'main' | 'secondary' | 'transparent' | 'blue' | 'red' | 'green';
    interface Props {
        icon?: TIconName;
        text?: string;
        theme?: Themes;
        shadow?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        icon: undefined,
        text: undefined,
        theme: 'main',
        shadow: true,
    });
</script>

<template>
    <div
        class="container"
        :class="{
            [props.theme]: props.theme,
            ['shadow']: props.shadow,
        }"
    >
        <IconSprite
            v-if="props.icon"
            :name="props.icon"
            class="icon"
            width="16"
        />
        <p v-if="props.text">{{ props.text }}</p>
    </div>
</template>

<style scoped lang="scss">
    .container {
        display: flex;
        gap: var(--gap-2);
        align-items: center;

        width: fit-content;

        border-radius: var(--radius-3xl);

        padding: var(--padding-2) var(--padding-3);

        cursor: pointer;

        transition: all 0.2s;
    }

    .shadow {
        box-shadow: var(--shadow-md);
    }

    .main {
        background-color: var(--bg-purple-400);
        &:hover {
            background-color: var(--bg-purple-500);
        }
        .icon,
        p {
            color: var(--text-white);
        }
    }
    .blue {
        background-color: var(--bg-blue-100);
        border-radius: 100%;
        &:hover {
            background-color: var(--bg-blue-200);
        }
        .icon,
        p {
            color: var(--text-blue-600);
        }
    }
    .red {
        background-color: var(--bg-red-100);
        border-radius: 100%;
        &:hover {
            background-color: var(--bg-red-200);
        }
        .icon,
        p {
            color: var(--text-red-600);
        }
    }
</style>
