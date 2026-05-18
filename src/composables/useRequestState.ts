import { ref } from 'vue';

export const useRequestState = () => {
    const isSuccess = ref(false);
    const isLoading = ref(false);
    const isError = ref(false);
    const timerId = ref<number | null>(null);

    const DELAY = 3000;

    const successRequest = () => {
        isSuccess.value = true;
        isLoading.value = false;
    };

    const startRequest = () => {
        isLoading.value = true;
    };

    const errorRequest = () => {
        isError.value = true;
        isLoading.value = false;
        if (timerId.value) clearTimeout(timerId.value);
        timerId.value = setTimeout(() => {
            reset();
        }, DELAY);
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
