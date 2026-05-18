import { IAuthPayload } from '@/stores/auth';

import { apiClient } from './base/fetch';
import { IUserFromAPI } from './base/types';

export const AuthApi = {
    async login(payload: IAuthPayload): Promise<IUserFromAPI> {
        const response = await apiClient.post('/api/auth/login', payload);
        return response as IUserFromAPI;
    },

    async logout() {
        await apiClient.post('/api/auth/logout');
    },

    async register(payload: IAuthPayload): Promise<IUserFromAPI> {
        const response = await apiClient.post('/api/auth/register', payload);
        return response as IUserFromAPI;
    },

    async check(): Promise<IUserFromAPI> {
        const response = await apiClient.get('/api/auth/me');
        return response as IUserFromAPI;
    },
};
