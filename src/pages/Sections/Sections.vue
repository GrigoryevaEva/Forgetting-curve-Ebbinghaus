<script setup lang="ts">
    import { useSectionStore } from '@/stores/sections';

    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
    import CustomButton from '@/shared/ui/components/CustomButton.vue';

    import { useModalController } from '@/composables';

    import CreateModal from './components/CreateModal.vue';
    import SectionTile from './components/SectionTile.vue';
    import TimeRepetitionLabel from './components/TimeRepetitionLabel.vue';

    const sectionStore = useSectionStore();

    const { isOpen: isOpenModal, open, close, toggle } = useModalController();
</script>

<template>
    <TimeRepetitionLabel />
    <div class="controlContainer">
        <h2>Мои разделы</h2>
        <CustomButton
            icon="plus"
            text="Новый раздел"
            :when-click="toggle"
        />
    </div>
    <CreateModal
        v-if="isOpenModal"
        :when-close="close"
    />
    <div
        v-if="sectionStore.isEmptySections && !isOpenModal"
        class="emptyContainer"
    >
        <IconSprite
            name="folderOpen"
            class="icon"
        />
        <p>Создайте первый раздел для ваших карточек</p>
        <CustomButton
            icon="plus"
            class="createButton"
            size="200"
            :when-click="open"
        />
    </div>
    <SectionTile v-else />
</template>

<style scoped lang="scss">
    .controlContainer {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .emptyContainer {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: var(--gap-6);

        height: 100%;

        .icon {
            width: 4rem;
            height: 4rem;

            color: var(--bg-purple-300);
        }

        .createButton {
            border-radius: var(--radius-full);

            height: 4rem;
            width: 4rem;
        }
    }
</style>
