import type { TIconName } from '@/shared/ui/assets/icons/types';

export const HOME_PATH = '/';
export const AUTH_PATH = '/login';
export const REPETITION_PATH = '/repetition';
export const PLAN_PATH = '/plan';

type TNavItem = {
    icon: TIconName;
    name: string;
    path: string;
};

export const navItems: TNavItem[] = [
    {
        icon: 'home',
        name: 'Sections',
        path: HOME_PATH,
    },
    {
        icon: 'bookOpen',
        name: 'Repetition',
        path: REPETITION_PATH,
    },
    {
        icon: 'calendar',
        name: 'Plan',
        path: PLAN_PATH,
    },
];
