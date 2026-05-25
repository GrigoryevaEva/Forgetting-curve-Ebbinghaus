import { ICard } from '@/stores/cards';
import type { ISection } from '@/stores/sections';

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

export interface IUserFromAPI {
    id: string;
    email: string;
    created_at: number;
}

export interface ISectionFromAPI {
    id: string;
    name: string;
    color: string;
    cards: ICardFromAPI[];
}

export interface ICardFromAPI {
    id: string;
    section_id: string;
    name: string;
    text: string;
    create: number;
    forget_count: number;
    repeat_info: {
        level: number;
        next_repeat_at: number;
    };
}

export interface IUpdateCardPayloadFromAPI {
    section_id?: string;
    name?: string;
    text?: string;
    forget_count?: number;
    repeat_info?: {
        level: number;
        next_repeat_at: number;
    };
}

export interface ICreateCardPayloadFromAPI {
    section_id: string;
    name: string;
    text: string;
    create: number;
    forget_count: number;
    repeat_info: {
        level: number;
        next_repeat_at: number;
    };
}

export interface INormalizedData {
    sections: ISection[];
    cards: ICard[];
}
