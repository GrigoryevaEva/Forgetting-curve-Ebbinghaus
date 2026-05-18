import type { ISection } from '@/stores/sections';
import type { ICard } from '@/stores/sections';

import type { INormalizedData, ISectionFromAPI } from './types';

export const normalizeSections = (rawSections: ISectionFromAPI[]): INormalizedData => {
    const sections: ISection[] = [];
    const cards: ICard[] = [];

    for (const rawSection of rawSections) {
        sections.push({
            id: rawSection.id,
            name: rawSection.name,
            color: rawSection.color,
        });

        for (const rawCard of rawSection.cards) {
            cards.push(rawCard);
        }
    }

    return { sections, cards };
};
