import Logger from 'js-logger';

import { defineStore } from 'pinia';

import { useCardStore } from '@/stores/cards';
import { useSectionStore } from '@/stores/sections';

import { SectionApi } from '@/api';
import { IApiError } from '@/api/base';
import { useRequestState } from '@/composables';

export const useAppStore = defineStore('app', () => {
    const initializeState = useRequestState();

    const initialize = async () => {
        if (initializeState.isSuccess.value || initializeState.isLoading.value) return;

        try {
            initializeState.startRequest();

            const { sections, cards } = await SectionApi.getSections();

            useSectionStore().setSections(sections);
            useCardStore().setCards(cards);

            initializeState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            initializeState.errorRequest();
            Logger.error(`Error api request initialize ${error.message}`);
        }
    };

    return {
        initializeState,
        initialize,
    };
});
