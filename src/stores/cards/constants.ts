import { ICardLevelsTSMap } from '.';

export const cardLevelsTSMap: ICardLevelsTSMap = {
    0: {
        ts: 0,
        returnLevel: 0,
        percent: 0,
    },
    1: {
        ts: 1200000,
        returnLevel: 1,
        percent: 8,
    },
    2: {
        ts: 3600000,
        returnLevel: 1,
        percent: 15,
    },
    3: {
        ts: 28800000,
        returnLevel: 2,
        percent: 23,
    },
    4: {
        ts: 86400000,
        returnLevel: 2,
        percent: 31,
    },
    5: {
        ts: 172800000,
        returnLevel: 4,
        percent: 38,
    },
    6: {
        ts: 518400000,
        returnLevel: 4,
        percent: 46,
    },
    7: {
        ts: 1209600000,
        returnLevel: 4,
        percent: 54,
    },
    8: {
        ts: 2592000000, // 30 дней
        returnLevel: 5,
        percent: 62,
    },
    9: {
        ts: 5184000000,
        returnLevel: 5,
        percent: 69,
    },
    10: {
        ts: 15811200000, // 183 дня
        returnLevel: 5,
        percent: 77,
    },
    11: {
        ts: 31536000000, // 365 дней (без учета високосного года)
        returnLevel: 5,
        percent: 85,
    },
    12: {
        ts: 63072000000,
        returnLevel: 5,
        percent: 92,
    },
};

export const FIRST_LEVEL = 0;
export const LAST_LEVEL = 12;
