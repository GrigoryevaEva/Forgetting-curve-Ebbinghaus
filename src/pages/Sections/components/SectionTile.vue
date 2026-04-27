<script setup lang="ts">
    import CardContainer from '@/shared/ui/components/CardContainer.vue';

    const items = ['1', 
        // '2', '3', '4', '5', '6', '7', '8'
    ]

</script>

<template>
    <CardContainer v-for="item in items" />
</template>

<style scoped>
</style>