// stores/sections/useDeckStore.ts
import Logger from 'js-logger';

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { useRequestState } from '@/composables';

import type { ICreateSectionPayload, ISection, IUpdateSectionPayload } from './types';

export const useSectionStore = defineStore('sections', () => {
    const sections = ref<ISection[]>([]);

    const createState = useRequestState();
    const updateState = useRequestState();
    const deleteState = useRequestState();

    const getSection = (sectionId: string): ISection | null => {
        const section = sections.value.find((section) => section.id === sectionId);
        if (!section) {
            Logger.error(`This section (${sectionId}) does not exist`);
            return null;
        }
        Logger.info(`Get card (${sectionId}): ${section}`);
        return section;
    };

    const setSections = async (newSections: ISection[]) => {
        // the main request is at the app level
        sections.value = newSections;
        Logger.info(`Sections initialized: ${sections.value}`);
    };

    const createSection = async (payload: ICreateSectionPayload) => {
        try {
            createState.setLoading(true);
            // TODO await request
            const response = {
                id: `${Math.random()}`,
                ...payload,
            };
            sections.value.push(response);

            Logger.info(`Section is successfully created: ${response}`);
        } catch (e) {
            createState.setError(true);
            Logger.error(`Error api request createSection ${e}`);
        } finally {
            createState.setLoading(false);
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
            updateState.setLoading(true);
            // TODO await request
            const updatedSection = {
                ...section,
                ...payload,
            };
            sections.value[index] = updatedSection;
            Logger.info(`Section is successfully updated: ${updatedSection}`);
        } catch (e) {
            updateState.setError(true);
            Logger.error(`Error api request updateSection ${e}`);
        } finally {
            updateState.setLoading(false);
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
            deleteState.setLoading(true);
            // TODO await request
            sections.value.splice(index, 1);
            Logger.info(`Section is successfully deleted: ${section}`);
        } catch (e) {
            deleteState.setError(true);
            Logger.error(`Error api request deleteSection ${e}`);
        } finally {
            deleteState.setLoading(false);
        }
    };

    return {
        setSections,

        createSection,
        createState,

        updateSection,
        updateState,

        deleteSection,
        deleteState,
    };
});
