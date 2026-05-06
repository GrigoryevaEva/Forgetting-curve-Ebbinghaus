<script setup lang="ts">
    import { computed } from 'vue';

    import CustomButton from './CustomButton.vue';

    type Theme = 'main' | 'yellow' | 'red';
    interface Props {
        hover?: boolean;
        theme?: Theme;
    }

    const props = withDefaults(defineProps<Props>(), {
        hover: true,
        theme: 'main',
    });

    const isBorder = computed(() => props.theme !== 'main');
</script>

<template>
    <div
        class="root"
        :class="{
            ['rootHover']: props.hover,
            [`${props.theme}Border`]: isBorder,
        }"
    >
        <div class="content">
            <slot></slot>
        </div>
        <div
            v-if="props.hover"
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

        border-radius: var(--radius-3xl);

        box-shadow: var(--shadow-md);

        .buttonsContainer {
            display: flex;

            width: fit-content;
            height: fit-content;

            opacity: 0;
            transition: opacity 0.2s;
        }

        $colors: yellow, red;
        @each $color in $colors {
            .#{$color}Border {
                border: 1px solid var(--bg-#{$color}-300);
            }
        }
    }
    .rootHover {
        display: flex;
        .content {
            flex: 1;
        }
        &:hover {
            box-shadow: var(--shadow-lg);
        }
        &:hover .buttonsContainer {
            opacity: 1;
        }
        transition: all 0.2s;
    }
</style>
