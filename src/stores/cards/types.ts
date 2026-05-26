export type TCardLevels = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

export interface ICard {
    id: string;
    sectionId: string;
    name: string;
    text: string;
    create: number;
    forgetCount: number;
    repeatInfo: {
        level: TCardLevels;
        nextRepeat: number;
    };
}

export interface IUpdateCardPayload {
    sectionId?: string;
    name?: string;
    text?: string;
    forgetCount?: number;
    repeatInfo?: {
        level: TCardLevels;
        nextRepeat: number;
    };
}

export interface ICreateCardPayload {
    sectionId: string;
    name: string;
    text: string;
    forgetCount: number;
    repeatInfo: {
        level: TCardLevels;
        nextRepeat: number;
    };
}

export type ICardLevelsTSMap = {
    [value in TCardLevels]: {
        ts: number;
        returnLevel: TCardLevels;
        percent: number;
    };
};
