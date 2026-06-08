<script setup lang="ts">
    import { computed, onMounted, ref, watch } from 'vue';

    import CustomText from '@/shared/ui/components/CustomText.vue';

    interface Props {
        countCards: number;
    }
    const props = withDefaults(defineProps<Props>(), {});

    const allCount = ref(0);
    const currentProgress = ref(0);

    onMounted(() => {
        allCount.value = props.countCards;
        currentProgress.value = 0;
    });

    watch(
        () => props.countCards,
        (newValue, oldValue) => {
            if (newValue < oldValue) {
                currentProgress.value = allCount.value - newValue;
            } else if (newValue > oldValue) {
                currentProgress.value = allCount.value - newValue;
            }
        }
    );

    const progressPercentage = computed(() => {
        if (allCount.value === 0) return 0;
        return (currentProgress.value / allCount.value) * 100;
    });
</script>

<template>
    <div class="progressBar">
        <div class="numbers">
            <CustomText :text="`${currentProgress}`" />
            <CustomText
                class="slash"
                text="/"
            />
            <CustomText :text="`${allCount}`" />
        </div>
        <div class="progressContainer">
            <div
                class="progressFill"
                :style="{ width: `${progressPercentage}%` }"
            ></div>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .progressBar {
        display: flex;
        align-items: center;
        gap: var(--gap-2);

        background-color: var(--bg-white);

        border-radius: var(--radius-2xl);

        padding: var(--padding-3);

        box-shadow: var(--shadow-md);

        .numbers {
            display: flex;
            gap: var(--gap-1);

            .slash {
                color: var(--text-purple-200);
            }
        }

        .progressContainer {
            width: 5rem;
            height: 6px;
            background-color: var(--bg-purple-100);
            border-radius: var(--radius-lg);
            overflow: hidden;

            .progressFill {
                height: 100%;
                background: linear-gradient(0.25turn, var(--bg-purple-400), var(--bg-pink-500));
                border-radius: 4px;
                transition: width 0.3s ease;
                min-width: 0;
            }
        }
    }
</style>
