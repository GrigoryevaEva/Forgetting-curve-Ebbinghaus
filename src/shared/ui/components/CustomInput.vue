<script setup lang="ts">
    import CustomText from './CustomText.vue';

    interface Props {
        id: string;
        modelValue: string;
        type: string;
        placeholder: string;
        required: boolean;
        label?: string;
        isTextarea?: boolean;
    }

    const props = withDefaults(defineProps<Props>(), {
        label: undefined,
    });

    interface Emits {
        (e: 'update:modelValue', value: string): void;
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
        <CustomText
            v-if="label"
            class="text"
            :text="label"
            size="sm"
        />
        <textarea
            v-if="isTextarea"
            :id="id"
            class="input textarea"
            rows="10"
            :placeholder="placeholder"
            :value="modelValue"
            :required="required"
            @input="updateValue"
        ></textarea>
        <input
            v-else
            :id="id"
            class="input"
            :type="type"
            :placeholder="placeholder"
            :required="required"
            :value="modelValue"
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
    .textarea {
        resize: vertical;

        scrollbar-width: thin;
        scrollbar-color: var(--bg-purple-200) transparent;
    }
    .input {
        color: var(--text-purple-700);
        font-size: var(--text-base);

        border: 2px solid var(--border-purple-200);
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
            -webkit-box-shadow: 0 0 0px 1000px var(--bg-white) inset !important;
        }
    }
</style>
