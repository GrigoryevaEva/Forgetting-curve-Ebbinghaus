<script setup lang="ts">
    import { ref } from 'vue';

    import { useSectionStore } from '@/stores/sections';

    import CustomButton from '@/shared/ui/components/CustomButton.vue';
    import CustomInput from '@/shared/ui/components/CustomInput.vue';

    interface Props {
        whenClose: () => void;
    }

    const props = withDefaults(defineProps<Props>(), {});

    const sectionStore = useSectionStore();

    const formData = ref({
        name: '',
        color: '#bbf7d0',
    });

    const handleClose = () => {
        formData.value.name = '';
        props.whenClose();
    };

    const handleSubmit = async () => {
        const data = {
            ...formData.value,
        };
        await sectionStore.createSection(data);
        if (sectionStore.createState.isSuccess) handleClose();
    };
</script>

<template>
    <div class="root">
        <form @submit.prevent="handleSubmit">
            <CustomInput
                id="sectionName"
                v-model="formData.name"
                label="Новый раздел"
                type="text"
                placeholder="Название раздела"
                required
            />
            <CustomButton text="Создать" />
        </form>
        <CustomButton
            text="Отмена"
            :when-click="handleClose"
        />
    </div>
</template>

<style scoped lang="scss">
    .root {
    }
</style>
