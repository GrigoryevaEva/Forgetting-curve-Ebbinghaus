import { ICreateSectionPayload, ISection, IUpdateSectionPayload } from '@/stores/sections';

import { apiClient, useNormalizeData } from './base';
import type { INormalizedData, ISectionFromAPI } from './base';

export const SectionApi = {
    async getSections(): Promise<INormalizedData> {
        const response = await apiClient.get<ISectionFromAPI[]>('/api/section');
        return useNormalizeData().normalizeSectionsData(response);
    },

    async createSection(payload: ICreateSectionPayload): Promise<ISection> {
        const response = await apiClient.post<ISection>('/api/section', payload);
        return response;
    },

    async updateSection(sectionId: string, payload: IUpdateSectionPayload): Promise<ISection> {
        const response = await apiClient.patch<ISection>(`/api/section/${sectionId}`, payload);
        return response;
    },

    async deleteSection(sectionId: string) {
        await apiClient.delete(`/api/section/${sectionId}`);
    },
};
