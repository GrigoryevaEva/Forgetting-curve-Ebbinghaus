export interface ICard {
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

export interface ISection {
    id: string;
    name: string;
    color: string;
}

export interface IUpdateSectionPayload {
    name?: string;
    color?: string;
}

export interface ICreateSectionPayload {
    name: string;
    color: string;
}

export interface IUpdateCardPayload {
    sectionId?: string;
    name?: string;
    text?: string;
    forgetCount?: number;
    repeatInfo?: {
        level: number;
        nextRepeat: number;
    };
}

export interface ICreateCardPayload {
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
