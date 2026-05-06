// stores/app/useAppStore.ts
import Logger from 'js-logger';

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useCardStore } from '@/stores/sections/useCardStore';
import { useSectionStore } from '@/stores/sections/useSectionStore';

import { SectionApi } from '@/api/section.api';
import { useRequestState } from '@/composables';

export const useAppStore = defineStore('app', () => {
    const isInitialized = ref(false);

    const initializeState = useRequestState();

    const initialize = async () => {
        if (isInitialized.value || initializeState.isLoading) return;

        try {
            initializeState.setLoading(true);

            const { sections, cards } = await SectionApi.getSections();

            useSectionStore().setSections(sections);
            useCardStore().setCards(cards);

            isInitialized.value = true;
        } catch (e) {
            initializeState.setError(true);
            Logger.error(`Error api request initialize ${e}`);
        } finally {
            initializeState.setLoading(false);
        }
    };

    return {
        isInitialized,
        initializeState,
        initialize,
    };
});
