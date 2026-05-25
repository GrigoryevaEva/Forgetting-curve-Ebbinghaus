import { IAuthPayload } from '@/stores/auth';

import { apiClient } from './base/fetch';
import { IUserFromAPI } from './base/types';

export const AuthApi = {
    async login(payload: IAuthPayload): Promise<IUserFromAPI> {
        const response = await apiClient.post<IUserFromAPI>('/api/auth/login', payload);
        return response;
    },

    async logout() {
        await apiClient.post('/api/auth/logout');
    },

    async register(payload: IAuthPayload): Promise<IUserFromAPI> {
        const response = await apiClient.post<IUserFromAPI>('/api/auth/register', payload);
        return response;
    },

    async check(): Promise<IUserFromAPI> {
        const response = await apiClient.get<IUserFromAPI>('/api/auth/me');
        return response;
    },
};
