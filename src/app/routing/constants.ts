import type { TIconName } from '@/shared/ui/assets/icons/types';

export const HOME_PATH = '/';
export const AUTH_PATH = '/login';
export const REPETITION_PATH = '/repetition';
export const PLAN_PATH = '/plan';

export const CARDS_PATH = (sectionId: string) => `/sections/${sectionId}/cards`;

type TNavItem = {
    icon: TIconName;
    name: string;
    path: string;
};

export const navItems: TNavItem[] = [
    {
        icon: 'home',
        name: 'Разделы',
        path: HOME_PATH,
    },
    {
        icon: 'bookOpen',
        name: 'Повторение',
        path: REPETITION_PATH,
    },
    {
        icon: 'calendar',
        name: 'План',
        path: PLAN_PATH,
    },
];
