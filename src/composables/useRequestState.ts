// composables/useRequestState.js
import { ref } from 'vue';

export const useRequestState = () => {
    const isLoading = ref(false);
    const isError = ref(false);
    const timerId = ref<number | null>(null);

    const DELAY = 3000;

    const setLoading = (value: boolean) => {
        isLoading.value = value;
    };

    const setError = (value: boolean) => {
        isError.value = value;
        if (value) {
            if (timerId.value) clearTimeout(timerId.value);
            timerId.value = setTimeout(() => {
                isError.value = false;
            }, DELAY);
        }
    };

    const reset = () => {
        isLoading.value = false;
        isError.value = false;
        if (timerId.value) clearTimeout(timerId.value);
    };

    return {
        isLoading,
        isError,
        setLoading,
        setError,
        reset,
    };
};
