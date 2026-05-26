<script setup lang="ts">
    import { useRouter } from 'vue-router';

    import { useCardStore } from '@/stores/cards';
    import { useSectionStore } from '@/stores/sections';

    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
    import CardContainer from '@/shared/ui/components/CardContainer.vue';

    const sectionStore = useSectionStore();
    const cardStore = useCardStore();

    const router = useRouter();

    const handleTransferToCards = (sectionId: string) => {
        router.push(`/sections/${sectionId}/cards`);
    };
</script>

<template>
    <div class="sectionTile">
        <CardContainer
            v-for="section in sectionStore.sections"
            :key="section.id"
            :when-edit="() => {}"
            :when-delete="
                () => {
                    sectionStore.deleteSection(section.id);
                }
            "
            @click="handleTransferToCards(section.id)"
        >
            <div class="section">
                <div>
                    <div
                        class="iconContainer"
                        :class="`greenBcgColor`"
                    >
                        <IconSprite
                            name="folderOpen"
                            class="icon"
                        />
                    </div>
                </div>
                <div class="sectionInfo">
                    <h3>
                        {{ section.name }}
                    </h3>
                    <p class="count">Карточек: {{ cardStore.getCountSectionCards(section.id) }}</p>
                    <p
                        v-if="cardStore.getCountNewSectionCards(section.id)"
                        class="new"
                    >
                        Новые: {{ cardStore.getCountNewSectionCards(section.id) }}
                    </p>
                    <p
                        v-if="cardStore.getCountOverdueSectionCards(section.id)"
                        class="overdue"
                    >
                        Просрочено: {{ cardStore.getCountOverdueSectionCards(section.id) }}
                    </p>
                </div>
            </div>
        </CardContainer>
    </div>
</template>

<style scoped lang="scss">
    .sectionTile {
        display: flex;
        gap: var(--gap-4);
        flex-wrap: wrap;
        .section {
            display: flex;
            gap: var(--gap-4);

            &Info {
                display: flex;
                flex-direction: column;
                gap: var(--gap-2);

                flex: 1;

                .count {
                    color: var(--text-purple-650);
                }

                .new {
                    color: var(--text-pink-600);
                }

                .overdue {
                    color: var(--text-red-600);
                }

                p {
                    font-size: var(--text-sm);
                }

                h3 {
                    font-size: var(--text-lg);
                }
            }
        }
        .icon {
            width: 1.75rem;
            height: 1.75rem;

            color: var(--text-purple-700);
        }

        .iconContainer {
            padding: var(--padding-3);
            width: fit-content;
            border-radius: var(--radius-2xl);
        }

        $colors: purple, pink, blue, green, yellow, orange;
        @each $color in $colors {
            .#{$color}BcgColor {
                background-color: var(--bg-#{$color}-200);
            }
        }
    }
</style>
