import type { ICard, ISection } from '@/stores/sections';

export interface IApiResponse<T> {
    data: T;
    message?: string;
    status: 'success' | 'error';
}

export interface IApiError {
    message: string;
    status: number;
    code?: string;
}

export interface ISectionFromAPI {
    id: string;
    name: string;
    color: string;
    cards: ICardFromAPI[];
}

export interface ICardFromAPI {
    id: string;
    sectionId: string;
    name: string;
    text: string;
    create: number;
    forgetCount: number;
    repeatInfo: {
        level: number;
        nextRepeat: number;
    };
}

export interface INormalizedData {
    sections: ISection[];
    cards: ICard[];
}
