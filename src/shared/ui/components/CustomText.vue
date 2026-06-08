<script setup lang="ts">
    interface Props {
        type?: 'header' | 'text';
        size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl';
        text: string;
        lightFont?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        type: 'text',
        size: 'base',
        bold: false,
        lightFont: false,
    });
</script>

<template>
    <p
        class="customText"
        :class="{
            [type]: true,
            [size]: true,
            ['lightFont']: lightFont,
        }"
    >
        {{ text }}
    </p>
</template>

<style scoped lang="scss">
    .customText {
        color: var(--bg-purple-900);
    }
    .lightFont {
        font-family: Zerno;
    }
    .customText.header {
        font-weight: var(--font-weight-medium);
        font-size: var(--text-2xl);
    }
    .customText.text {
        font-weight: var(--font-weight-normal);

        &.xs {
            font-size: var(--text-xs);
        }
        &.sm {
            font-size: var(--text-sm);
        }
        &.base {
            font-size: var(--text-base);
        }
        &.lg {
            font-size: var(--text-lg);
        }
        &.xl {
            font-size: var(--text-xl);
        }
    }
</style>
