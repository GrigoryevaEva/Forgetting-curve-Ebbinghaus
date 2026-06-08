<script setup lang="ts">
    import CustomText from './CustomText.vue';

    interface Props {
        text: string;
        size?: 'xs' | 'sm';
    }

    const props = withDefaults(defineProps<Props>(), {
        size: 'xs',
    });
</script>

<template>
    <CustomText
        class="badge"
        :text="text"
        :size="size"
    />
</template>

<style scoped lang="scss">
    .badge {
        padding: var(--padding-2) var(--padding-3);
        background-color: var(--bg-purple-100);
        border-radius: var(--radius-2xl);
    }
</style>
