<script setup lang="ts">
    interface Props {
        id: string;
        label?: string;
        modelValue: string;
        type: string;
        placeholder: string;
        required: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        label: undefined,
    });

    interface Emits {
        (e: 'update:modelValue', value: string): void; // Добавлен emit
    }
    const emit = defineEmits<Emits>();

    const updateValue = (event: Event) => {
        const target = event.target as HTMLInputElement;
        emit('update:modelValue', target.value);
    };
</script>

<template>
    <label
        class="label"
        :for="id"
    >
        <p v-if="label">{{ label }}</p>
        <input
            :id="id"
            class="input"
            :v-model="modelValue"
            :type="type"
            :placeholder="placeholder"
            :required="required"
            @input="updateValue"
        />
    </label>
</template>

<style scoped lang="scss">
    .label {
        display: flex;
        flex-direction: column;
        gap: var(--gap-2);

        width: 100%;

        color: var(--text-purple-700);
        font-size: var(--text-sm);

        p {
            margin-left: 0.5rem;
        }
    }
    .input {
        color: var(--text-purple-700);
        font-size: var(--text-base);

        border: 1px solid var(--border-purple-200);
        border-radius: var(--radius-2xl);

        padding: var(--padding-4);

        &::placeholder {
            color: var(--text-purple-100);
            opacity: 1;
        }

        &::-webkit-input-placeholder {
            color: var(--text-purple-100);
        }

        &::-moz-placeholder {
            color: var(--text-purple-100);
        }

        &:focus {
            border-color: var(--border-purple-400);

            transition: all 0.2s;
        }

        &:-webkit-autofill,
        &:-webkit-autofill:hover,
        &:-webkit-autofill:focus,
        &:-webkit-autofill:active {
            -webkit-text-fill-color: var(--text-purple-700) !important;
            caret-color: var(--text-purple-700) !important;
        }
    }
</style>
