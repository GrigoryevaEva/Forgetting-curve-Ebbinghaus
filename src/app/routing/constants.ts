import type { TIconName } from '@/shared/ui/assets/icons/types';

type TNavItem = {
    icon: TIconName;
    name: string;
    path: string;
};

export const navItems: TNavItem[] = [
    {
        icon: 'home',
        name: 'Sections',
        path: '/',
    },
    {
        icon: 'bookOpen',
        name: 'Repetition',
        path: '/repetition',
    },
    {
        icon: 'calendar',
        name: 'Plan',
        path: '/plan',
    },
];

export const HOME_PATH = '/';
export const AUTH_PATH = '/login';
