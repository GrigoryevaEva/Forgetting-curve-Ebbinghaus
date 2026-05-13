<script setup lang="ts">
    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
    import CardContainer from '@/shared/ui/components/CardContainer.vue';

    import { sections } from '@/constants';

    const testNew = true;
    const testOverdue = true;
</script>

<template>
    <div class="root">
        <CardContainer
            v-for="section in sections"
            :key="section.name"
            :path="`/sections/${section.id}/cards`"
        >
            <div class="section">
                <div>
                    <div
                        class="iconContainer"
                        :class="`${section.color}BcgColor`"
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
                    <p class="count">{{ section.cards.length }} карточки</p>
                    <p
                        v-if="testNew"
                        class="new"
                    >
                        Новые: 1
                    </p>
                    <p
                        v-if="testOverdue"
                        class="overdue"
                    >
                        Просрочено: 1
                    </p>
                </div>
            </div>
        </CardContainer>
    </div>
</template>

<style scoped lang="scss">
    .root {
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
