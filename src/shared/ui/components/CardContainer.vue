<script setup lang="ts">
    import { computed } from 'vue';

    import CustomButton from './CustomButton.vue';

    type Theme = 'main' | 'yellow' | 'red';
    interface Props {
        hover?: boolean;
        theme?: Theme;
        whenEdit?: () => void;
        whenDelete?: () => void;
    }

    const props = withDefaults(defineProps<Props>(), {
        hover: true,
        theme: 'main',
        whenEdit: undefined,
        whenDelete: undefined,
    });

    const isBorder = computed(() => props.theme !== 'main');
</script>

<template>
    <div
        class="customButton"
        :class="{
            ['rootHover']: hover,
            [`${theme}Border`]: isBorder,
        }"
    >
        <div class="content">
            <slot></slot>
        </div>
        <div
            v-if="hover"
            class="buttonsContainer"
        >
            <CustomButton
                theme="blue"
                icon="edit"
                :shadow="false"
                :when-click="whenEdit"
            />
            <CustomButton
                theme="red"
                icon="trash"
                :shadow="false"
                :when-click="whenDelete"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .customButton {
        flex: 1;
        min-width: fit-content;
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
