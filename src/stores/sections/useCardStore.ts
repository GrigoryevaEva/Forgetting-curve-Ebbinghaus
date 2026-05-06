import Logger from 'js-logger';

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useRequestState } from '@/composables';

// import { useNow } from '@vueuse/core';

import type { ICard, ICreateCardPayload, IUpdateCardPayload } from './types';

export const useCardStore = defineStore('cards', () => {
    const cards = ref<ICard[]>([]);

    const createState = useRequestState();
    const updateState = useRequestState();
    const deleteState = useRequestState();

    // const now = useNow();
    // const isWaitCards = computed(() =>
    //     cards.value.some((card) => card.repeatInfo.nextRepeat <= now.value.getTime())
    // );

    // TODO звуковое сопровождение при наступлении момента повторения
    // TODO использовать ли useTimeAgo (?)

    const getCard = (cardId: string): ICard | null => {
        const card = cards.value.find((card) => card.id === cardId);
        if (!card) {
            Logger.error(`This card (${cardId}) does not exist`);
            return null;
        }
        Logger.info(`Get card (${cardId}): ${card}`);
        return card;
    };

    const getSectionCards = (sectionId: string): ICard[] => {
        const sectionCards = cards.value.filter((card) => card.sectionId === sectionId);
        Logger.info(`Get section (${sectionId}) cards: ${sectionCards}`);
        return sectionCards;
    };

    const setCards = (newCards: ICard[]) => {
        // the main request is at the app level
        cards.value = newCards;
        Logger.info(`Cards initialized: ${cards.value}`);
    };

    const createCard = async (payload: ICreateCardPayload) => {
        try {
            createState.setLoading(true);
            // TODO await request
            const response = {
                id: `${Math.random()}`,
                ...payload,
            };
            cards.value.push(response);

            Logger.info(`Card is successfully created: ${response}`);
        } catch (e) {
            createState.setError(true);
            Logger.error(`Error api request createCard ${e}`);
        } finally {
            createState.setLoading(false);
        }
    };

    const updateCard = async (cardId: string, payload: IUpdateCardPayload) => {
        const card = getCard(cardId);
        if (!card) {
            Logger.error(`Failed update card (${cardId}) because: This card does not exist`);
            return null;
        }
        const index = cards.value.indexOf(card);

        try {
            updateState.setLoading(true);
            // TODO await request
            const updatedCard = {
                ...card,
                ...payload,
            };
            cards.value[index] = updatedCard;
            Logger.info(`Cards is successfully updated: ${updatedCard}`);
        } catch (e) {
            updateState.setError(true);
            Logger.error(`Error api request updateCard ${e}`);
        } finally {
            updateState.setLoading(false);
        }
    };

    const deleteCard = async (cardId: string) => {
        const card = getCard(cardId);
        if (!card) {
            Logger.error(`Failed delete card (${cardId}) because: This card does not exist`);
            return;
        }
        const index = cards.value.indexOf(card);
        try {
            deleteState.setLoading(true);
            // TODO await request
            cards.value.splice(index, 1);
            Logger.info(`Cards is successfully deleted: ${card}`);
        } catch (e) {
            deleteState.setError(true);
            Logger.error(`Error api request deleteCard ${e}`);
        } finally {
            deleteState.setLoading(false);
        }
    };

    const deleteSectionCards = (sectionId: string) => {
        // The verification of the successful api of
        // the section deletion request is at
        // the Section store level, so here we assume that
        // the section has already been successfully deleted
        cards.value = cards.value.filter((card) => card.sectionId !== sectionId);
        Logger.info(`All section (${sectionId}) cards is deleted`);
    };

    // TODO actions
    // update - помню карту
    // update - не помню карту
    // update - сменить секцию карты
    // get - все карты не 0 уровня (для плана повторений)

    return {
        // isWaitCards,
        getSectionCards,

        setCards,

        createCard,
        createState,

        updateCard,
        updateState,

        deleteCard,
        deleteState,

        deleteSectionCards,
    };
});
