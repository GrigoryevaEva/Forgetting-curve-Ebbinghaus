<script setup lang="ts">
    import { computed, useTemplateRef } from 'vue';

    import { useMouseInElement } from '@vueuse/core';

    import CustomButton from './CustomButton.vue';

    type Status = 'ok' | 'yellow' | 'red';
    interface Props {
        hover?: boolean;
        status?: Status;
    }

    const props = withDefaults(defineProps<Props>(), {
        hover: true,
        status: 'ok',
    });

    const isBorder = computed(() => props.status !== 'ok');

    const container = useTemplateRef('container');
    const { isOutside } = useMouseInElement(container);
</script>

<template>
    <div
        ref="container"
        class="root"
        :class="{
            ['hover']: props.hover,
            [props.status]: isBorder,
        }"
    >
        <slot></slot>
        <div
            v-if="props.hover"
            v-show="!isOutside"
            class="buttonsContainer"
        >
            <CustomButton
                theme="blue"
                icon="edit"
                :shadow="false"
            />
            <CustomButton
                theme="red"
                icon="trash"
                :shadow="false"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .root {
        position: relative;
        background-color: var(--bg-white);
        padding: var(--padding-6);
    }
    .hover {
        transition: all 0.2s;
        &:hover {
            box-shadow: var(--shadow-lg);
        }
    }
    .buttonsContainer {
        position: absolute;
        right: var(--padding-6);
        display: flex;

        background-color: var(--bg-white);
        box-shadow: 0 0 10px 10px var(--bg-white);
        border-radius: var(--gap-6);
        width: fit-content;
    }
    .yellow {
        border: 1px solid var(--bg-yellow-300);
    }
    .red {
        border: 1px solid var(--bg-pink-300);
    }
</style>
