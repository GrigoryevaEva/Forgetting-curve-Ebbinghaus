<template>
    <svg
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        :class="className"
    >
        <path
            d="M2 17C4 15 6 13 8 13C10 13 11 15 13 15C15 15 16 13 18 13C20 13 22 15 22 15"
            :stroke="color"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
        />
        <path
            d="M2 12C4 10 6 8 8 8C10 8 11 10 13 10C15 10 16 8 18 8C20 8 22 10 22 10"
            :stroke="color"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.6"
        />
        <path
            d="M2 7C4 5 6 3 8 3C10 3 11 5 13 5C15 5 16 3 18 3C20 3 22 5 22 5"
            :stroke="color"
            :stroke-width="strokeWidth"
            stroke-linecap="round"
            stroke-linejoin="round"
            opacity="0.3"
        />
        <circle
            cx="20"
            cy="5"
            r="2"
            fill="currentColor"
            opacity="0.8"
        />
    </svg>
</template>

<script setup lang="ts">
    interface Props {
        width?: string | number;
        height?: string | number;
        color?: string;
        strokeWidth?: string | number;
        className?: string;
    }

    const props = withDefaults(defineProps<Props>(), {
        width: 24,
        height: 24,
        color: 'currentColor',
        strokeWidth: 2,
        className: '',
    });
</script>
