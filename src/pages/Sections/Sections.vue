<script setup lang="ts">
import CustomButton from '@/shared/ui/components/CustomButton.vue';
import SectionTile from './components/SectionTile.vue';
import TimeRepetitionLabel from './components/TimeRepetitionLabel.vue';

</script>

<template>
    <TimeRepetitionLabel />
    <div class="controlContainer">
        <p>Мои разделы</p>
        <CustomButton icon="plus" text="Новый раздел"/>
    </div>
    <SectionTile />
</template>

<style scoped>
    .controlContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }
</style>