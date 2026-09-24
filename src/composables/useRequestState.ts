import { ref } from 'vue';

import { useAuthStore } from '@/stores/auth';

import { ErrorStatusCodes } from '@/api/base';

export const useRequestState = () => {
    const isSuccess = ref(false);
    const isLoading = ref(false);
    const isError = ref(false);
    const timerId = ref<number | null>(null);

    const DELAY = 3000;

    const authStore = useAuthStore();

    const successRequest = () => {
        isSuccess.value = true;
        isLoading.value = false;
    };

    const startRequest = () => {
        isLoading.value = true;
    };

    const errorRequest = (statusCode: number) => {
        isError.value = true;
        isLoading.value = false;
        if (timerId.value) clearTimeout(timerId.value);
        timerId.value = setTimeout(() => {
            reset();
        }, DELAY);
        if (statusCode === ErrorStatusCodes.auth || statusCode === ErrorStatusCodes.forbidden) {
            authStore.checkAuth();
        }
    };

    const reset = () => {
        isSuccess.value = false;
        isLoading.value = false;
        isError.value = false;
        if (timerId.value) clearTimeout(timerId.value);
    };

    return {
        isSuccess,
        isLoading,
        isError,
        startRequest,
        successRequest,
        errorRequest,
        reset,
    };
};
