<script setup lang="ts">
    import { useRoute } from 'vue-router';

    import { ICard, useCardStore } from '@/stores/cards';

    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
    import CardContainer from '@/shared/ui/components/CardContainer.vue';

    import { useModalController } from '@/composables';

    const cardStore = useCardStore();

    const route = useRoute();
    const sectionId = route.params['id'] as string;

    const { isOpen: isExpandedText, toggle } = useModalController();

    const getTextStatusCard = (card: ICard) => {
        const status = cardStore.getStatusCard(card);
        if (status === 'ready') return 'Готова к повторению';
        if (status === 'overdue') return 'Просрочено';
        return status.value;
    };
</script>

<template>
    <div class="cardsTile">
        <CardContainer
            v-for="card in cardStore.getSectionCards(sectionId)"
            :key="card.id"
            :when-edit="() => {}"
            :when-delete="
                () => {
                    cardStore.deleteCard(card.id);
                }
            "
        >
            <div>
                <div>
                    <p>
                        {{ getTextStatusCard(card) }}
                    </p>
                    <p>{{ card.name }}</p>
                </div>
                <div class="textContainer">
                    <IconSprite
                        :name="isExpandedText ? 'chevronDown' : 'chevronRight'"
                        @click="toggle"
                    />
                    <p :class="{ collapsed: !isExpandedText }">{{ card.text }}</p>
                </div>
                <div>
                    <p>{{ cardStore.getLevelPercentCard(card) }}%</p>
                    <p>
                        {{
                            card.repeatInfo.level === 0
                                ? 'Новая'
                                : `Этап ${card.repeatInfo.level}. Повторение ${cardStore.getDateRepeatCard(card)}`
                        }}
                    </p>
                </div>
                <div>
                    <p>Создана: {{ cardStore.getDateCreateCard(card) }}</p>
                    <div>•</div>
                    <p>Забыта: {{ card.forgetCount }} раз</p>
                </div>
            </div>
        </CardContainer>
    </div>
</template>

<style scoped lang="scss">
    .textContainer {
        overflow: hidden;
    }
    .collapsed {
        display: -webkit-box;
        -webkit-line-clamp: 2; /* Показывать только 2 строки */
        -webkit-box-orient: vertical;
        line-clamp: 2;
    }
</style>
