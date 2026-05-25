import Logger from 'js-logger';

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { useNow } from '@vueuse/core';

import { IApiError } from '@/api/base';
import { CardApi } from '@/api/card.api';
import { useRequestState } from '@/composables';

import type { ICard, ICreateCardPayload, IUpdateCardPayload } from '../cards';

export const useCardStore = defineStore('cards', () => {
    const cards = ref<ICard[]>([]);
    const isEmptyCards = computed(() => cards.value.length === 0);

    const createState = useRequestState();
    const updateState = useRequestState();
    const deleteState = useRequestState();

    const now = useNow();
    const tsNowUTC = now.value.getTime();
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
        Logger.info(`Get card (${cardId})`);
        return card;
    };

    const getCountSectionCards = (sectionId: string) => {
        return cards.value.reduce((acc, card) => (card.sectionId === sectionId ? acc + 1 : acc), 0);
    };

    const getSectionCards = (sectionId: string): ICard[] => {
        const sectionCards = cards.value.filter((card) => card.sectionId === sectionId);
        Logger.info(`Get section (${sectionId}) cards`);
        return sectionCards;
    };

    const setCards = (newCards: ICard[]) => {
        // the main request is at the app level
        cards.value = newCards;
        Logger.info(`Cards initialized`);
    };

    const createCard = async (payload: ICreateCardPayload) => {
        try {
            createState.startRequest();
            console.log(payload);
            const response = await CardApi.createCard(payload);
            cards.value.push(response);

            Logger.info(`Card is successfully created: ${response.id}`);
            createState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            createState.errorRequest();
            Logger.error(`Error api request createCard ${error.message}`);
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
            updateState.startRequest();
            const response = await CardApi.updateCard(cardId, payload);
            cards.value[index] = response;
            Logger.info(`Cards is successfully updated: ${response.id}`);
            updateState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            updateState.errorRequest();
            Logger.error(`Error api request updateCard ${error.message}`);
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
            deleteState.startRequest();
            await CardApi.deleteCard(cardId);
            cards.value.splice(index, 1);
            Logger.info(`Cards is successfully deleted: ${cardId}`);
            deleteState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            deleteState.errorRequest();
            Logger.error(`Error api request deleteCard ${error.message}`);
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
        isEmptyCards,
        tsNowUTC,

        getSectionCards,
        getCountSectionCards,

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
