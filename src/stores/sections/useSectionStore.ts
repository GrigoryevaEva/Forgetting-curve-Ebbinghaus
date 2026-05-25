import Logger from 'js-logger';

import { defineStore } from 'pinia';
import { computed, ref } from 'vue';

import { SectionApi } from '@/api';
import { IApiError } from '@/api/base';
import { useRequestState } from '@/composables';

import { useCardStore } from '../cards';
import type { ICreateSectionPayload, ISection, IUpdateSectionPayload } from './types';

export const useSectionStore = defineStore('sections', () => {
    const sections = ref<ISection[]>([]);
    const isEmptySections = computed(() => sections.value.length === 0);

    const createState = useRequestState();
    const updateState = useRequestState();
    const deleteState = useRequestState();

    const getSection = (sectionId: string): ISection | null => {
        const section = sections.value.find((section) => section.id === sectionId);
        if (!section) {
            Logger.error(`This section (${sectionId}) does not exist`);
            return null;
        }
        Logger.info(`Get card (${sectionId})`);
        return section;
    };

    const setSections = async (newSections: ISection[]) => {
        // the main request is at the app level
        sections.value = newSections;
        Logger.info(`Sections initialized`);
    };

    const hasSection = (sectionId: string) => {
        const result = sections.value.some((section) => section.id === sectionId);
        if (result) {
            Logger.info(`Section ${sectionId} found`);
        } else {
            Logger.error(`Section ${sectionId} not found`);
        }
        return result;
    };

    const createSection = async (payload: ICreateSectionPayload) => {
        try {
            createState.startRequest();
            const response = await SectionApi.createSection(payload);
            sections.value.push(response);

            Logger.info(`Section is successfully created: ${response.id}`);
            createState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            createState.errorRequest();
            Logger.error(`Error api request createSection ${error.message}`);
        }
    };

    const updateSection = async (sectionId: string, payload: IUpdateSectionPayload) => {
        const section = getSection(sectionId);
        if (!section) {
            Logger.error(
                `Failed update section (${sectionId}) because: This section does not exist`
            );
            return null;
        }
        const index = sections.value.indexOf(section);

        try {
            updateState.startRequest();
            const response = await SectionApi.updateSection(sectionId, payload);
            sections.value[index] = response;
            Logger.info(`Section is successfully updated: ${response.id}`);
            updateState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            updateState.errorRequest();
            Logger.error(`Error api request updateSection ${error.message}`);
        }
    };

    const deleteSection = async (sectionId: string) => {
        const section = getSection(sectionId);
        if (!section) {
            Logger.error(
                `Failed delete section (${sectionId}) because: This section does not exist`
            );
            return;
        }
        const index = sections.value.indexOf(section);
        try {
            deleteState.startRequest();
            await SectionApi.deleteSection(sectionId);
            sections.value.splice(index, 1);
            const cardStore = useCardStore();
            cardStore.deleteSectionCards(sectionId);
            Logger.info(`Section is successfully deleted: ${sectionId}`);
            deleteState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            deleteState.errorRequest();
            Logger.error(`Error api request deleteSection ${error.message}`);
        }
    };

    return {
        sections,
        isEmptySections,

        getSection,

        setSections,
        hasSection,

        createSection,
        createState,

        updateSection,
        updateState,

        deleteSection,
        deleteState,
    };
});
