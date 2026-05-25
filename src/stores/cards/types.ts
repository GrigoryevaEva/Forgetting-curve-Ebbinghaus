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
