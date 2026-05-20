import { sections } from '@/constants';

import { normalizeSections } from './base/normalizer';
import type { INormalizedData } from './base/types';

export const SectionApi = {
    async getSections(): Promise<INormalizedData> {
        // const response = await apiClient.get<ISectionFromAPI>('/sections');
        return normalizeSections(sections);
    },
};
