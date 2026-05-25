<script setup lang="ts">
    import { ref, toRaw, useTemplateRef } from 'vue';

    import { useCardStore } from '@/stores/cards';

    import CustomButton from '@/shared/ui/components/CustomButton.vue';
    import CustomInput from '@/shared/ui/components/CustomInput.vue';

    interface Props {
        sectionId: string;
        whenClose: () => void;
    }

    const props = withDefaults(defineProps<Props>(), {});

    const cardStore = useCardStore();

    const cardForm = useTemplateRef('cardForm');
    const formData = ref({
        sectionId: props.sectionId,
        name: '',
        text: '',
        create: 0,
        forgetCount: 0,
        repeatInfo: {
            level: 0,
            nextRepeat: 0,
        },
    });

    const handleClose = () => {
        formData.value.name = '';
        formData.value.text = '';
        props.whenClose();
    };

    const submitForm = () => {
        if (cardForm.value) cardForm.value.requestSubmit();
    };

    const handleSubmit = async () => {
        const data = {
            ...toRaw(formData.value),
            create: cardStore.tsNowUTC,
        };
        await cardStore.createCard(data);
        if (cardStore.createState.isSuccess) handleClose();
    };
</script>

<template>
    <div class="root">
        <p>Новая карточка</p>
        <form
            ref="cardForm"
            @submit.prevent="handleSubmit"
        >
            <CustomInput
                id="cardName"
                v-model="formData.name"
                type="text"
                placeholder="Название (например: А.С. Пушкин - Зимнее утро)"
                required
            />
            <CustomInput
                id="sectionName"
                v-model="formData.text"
                type="text"
                placeholder="Текст для запоминания..."
                required
            />
        </form>
        <div>
            <div></div>
            <p>Карточка уже проходила повторения</p>
        </div>
        <div>
            <CustomButton
                text="Создать"
                :when-click="submitForm"
            />
            <CustomButton
                text="Отмена"
                :when-click="handleClose"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
    .root {
    }
</style>
