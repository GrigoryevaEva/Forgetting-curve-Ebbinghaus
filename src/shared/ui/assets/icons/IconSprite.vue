<template>
    <svg
        xmlns="http://www.w3.org/2000/svg"
        :width="width"
        :height="height"
        viewBox="0 0 24 24"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        stroke-linecap="round"
        stroke-linejoin="round"
        v-html="iconPath"
    ></svg>
</template>

<script setup lang="ts">
    import { computed } from 'vue';

    import type { TIconName } from './types';

    interface Props {
        name: TIconName;
        width?: string | number;
        height?: string | number;
        color?: string;
        strokeWidth?: string | number;
    }

    const props = withDefaults(defineProps<Props>(), {
        width: 24,
        height: 24,
        color: 'currentColor',
        strokeWidth: 2,
    });

    const iconPath = computed(() => icons[props.name] || '');

    const icons = {
        // Navigation Icons
        home: '<path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>',

        bookOpen:
            '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',

        calendar:
            '<path d="M8 2v4"/><path d="M16 2v4"/><rect width="18" height="18" x="3" y="4" rx="2"/><path d="M3 10h18"/>',

        barChart:
            '<path d="M3 3v18h18"/><path d="M18 17V9"/><path d="M13 17V5"/><path d="M8 17v-3"/>',

        // Action Icons
        arrowLeft: '<path d="m12 19-7-7 7-7"/><path d="M19 12H5"/>',
        plus: '<path d="M5 12h14"/><path d="M12 5v14"/>',

        trash: '<path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/>',

        edit: '<path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"/><path d="m15 5 4 4"/>',

        x: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>',

        folderOpen:
            '<path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2"/>',

        fileText:
            '<path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><path d="M10 9H8"/><path d="M16 13H8"/><path d="M16 17H8"/>',

        // Chevron Icons
        chevronDown: '<path d="m6 9 6 6 6-6"/>',

        chevronRight: '<path d="m9 18 6-6-6-6"/>',

        // Status Icons
        checkCircle: '<circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/>',

        xCircle: '<circle cx="12" cy="12" r="10"/><path d="m15 9-6 6"/><path d="m9 9 6 6"/>',

        clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',

        rotate: '<path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/><path d="M3 3v5h5"/>',

        trendingUp:
            '<polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>',
    };
</script>
