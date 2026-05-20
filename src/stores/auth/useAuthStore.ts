import Logger from 'js-logger';

import { defineStore } from 'pinia';
import { ref } from 'vue';

import { AuthApi } from '@/api';
import { IApiError } from '@/api/base';
import { useRequestState } from '@/composables';

import { IAuthPayload, IUser } from './types';

export const useAuthStore = defineStore('auth', () => {
    const id = ref<string | null>(null);
    const email = ref<string | null>(null);
    const isAuth = ref<boolean>(false);

    const loginState = useRequestState();
    const logoutState = useRequestState();
    const registerState = useRequestState();
    const checkAuthState = useRequestState();

    const setUserInfo = (info: IUser) => {
        id.value = info.id;
        email.value = info.email;
        isAuth.value = true;
    };

    const resetUserInfo = () => {
        id.value = null;
        email.value = null;
        isAuth.value = false;
    };

    const login = async (payload: IAuthPayload) => {
        try {
            loginState.startRequest();
            const response = await AuthApi.login(payload);
            setUserInfo(response);
            Logger.info(`Successfully login`);
            loginState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            loginState.errorRequest();
            Logger.error(`Login Failed ${error.message}`);
        }
    };

    const logout = async () => {
        try {
            logoutState.startRequest();
            await AuthApi.logout();
            resetUserInfo();
            Logger.info(`Successfully logout`);
            logoutState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            logoutState.errorRequest();
            Logger.error(`Logout Failed ${error.message}`);
        }
    };

    const register = async (payload: IAuthPayload) => {
        try {
            registerState.startRequest();
            const response = await AuthApi.register(payload);
            setUserInfo(response);
            Logger.info(`Successfully register`);
            registerState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            registerState.errorRequest();
            Logger.error(`Register Failed ${error.message}`);
        }
    };

    const checkAuth = async () => {
        try {
            checkAuthState.startRequest();
            const response = await AuthApi.check();
            setUserInfo(response);
            Logger.info(`Successfully checkAuth`);
            checkAuthState.successRequest();
        } catch (e) {
            const error = e as IApiError;
            checkAuthState.errorRequest();
            resetUserInfo();
            Logger.error(`CheckAuth Failed ${error.message}`);
        }
    };

    return {
        email,
        isAuth,

        login,
        loginState,

        logout,
        logoutState,

        register,
        registerState,

        checkAuth,
        checkAuthState,
    };
});
