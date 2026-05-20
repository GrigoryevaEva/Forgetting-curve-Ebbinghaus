import { Ref, ref } from 'vue';

import { onClickOutside, useEventListener } from '@vueuse/core';

export const useModalController = (modalRef: Ref<HTMLElement | null>) => {
    const isOpen = ref(false);

    const open = () => (isOpen.value = true);

    const close = () => (isOpen.value = false);

    const toggle = () => {
        if (isOpen.value) {
            close();
        } else {
            open();
        }
    };

    if (modalRef) {
        onClickOutside(modalRef, () => {
            if (isOpen.value) close();
        });
    }

    useEventListener('keydown', (e) => {
        if (e.key === 'Escape' && isOpen.value) close();
    });

    return {
        isOpen,
        open,
        close,
        toggle,
    };
};
