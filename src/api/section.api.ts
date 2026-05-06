import { sections } from '@/constants';

import { normalizeSections } from './normalizer';
import type { INormalizedData } from './types';

// import { apiClient } from './fetch';

export const SectionApi = {
    async getSections(): Promise<INormalizedData> {
        // const response = await apiClient.get<ISectionFromAPI>('/sections');
        return normalizeSections(sections);
    },
};
