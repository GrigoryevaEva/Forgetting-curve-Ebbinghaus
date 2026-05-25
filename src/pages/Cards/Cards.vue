<script setup lang="ts">
    import { useRoute, useRouter } from 'vue-router';

    import { useCardStore } from '@/stores/cards';
    import { useSectionStore } from '@/stores/sections';

    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
    import CustomButton from '@/shared/ui/components/CustomButton.vue';

    import { useModalController } from '@/composables';

    import CardsTile from './components/CardsTile.vue';
    import CreateModal from './components/CreateModal.vue';

    const route = useRoute();
    const router = useRouter();

    const sectionStore = useSectionStore();
    const cardStore = useCardStore();
    const sectionId = route.params['id'] as string;

    const { isOpen: isOpenModal, open, close, toggle } = useModalController();
</script>

<template>
    <div class="cards">
        <div class="cardsHeader">
            <CustomButton
                theme="transparent"
                icon="arrowLeft"
                :when-click="router.back"
            />
            <div>
                <IconSprite
                    name="folderOpen"
                    class="icon"
                />
                <p>{{ sectionStore.getSection(sectionId)?.name }}</p>
            </div>
            <CustomButton
                icon="plus"
                text="Новый раздел"
                :when-click="toggle"
            />
        </div>
        <CreateModal
            v-if="isOpenModal"
            :section-id="sectionId"
            :when-close="close"
        />
        <CardsTile />
        <div
            v-if="cardStore.isEmptyCards && !isOpenModal"
            class="emptyContainer"
        >
            <IconSprite
                name="fileText"
                class="icon"
            />
            <p>Создайте свою первую карточку</p>
            <CustomButton
                icon="plus"
                class="createButton"
                size="200"
                :when-click="open"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .cards {
        width: 100%;
        height: 100%;

        &Header {
            display: flex;
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
    }
</style>
