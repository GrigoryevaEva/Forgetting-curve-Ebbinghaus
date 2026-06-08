<script setup lang="ts">
    import { useRouter } from 'vue-router';

    import { REPETITION_PATH } from '@/app/routing/constants';

    import { useCardStore } from '@/stores/cards';

    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
    import CustomText from '@/shared/ui/components/CustomText.vue';

    const cardStore = useCardStore();
    const router = useRouter();

    const handleTransferToRepetition = () => router.push(REPETITION_PATH);
</script>

<template>
    <div
        class="container"
        @click="handleTransferToRepetition"
    >
        <div class="containerInfo">
            <CustomText
                class="textHeader"
                text="Время повторить!"
                size="xl"
            />
            <CustomText
                class="count"
                :text="`Карточек: ${cardStore.getRepetitionCards().length}`"
            />
        </div>
        <IconSprite
            name="clock"
            class="icon"
        />
    </div>
</template>

<style scoped lang="scss">
    .container {
        display: flex;
        align-items: center;
        justify-content: space-between;

        background-image: linear-gradient(
            0.25turn,
            var(--bg-purple-400),
            var(--bg-pink-500),
            var(--bg-purple-400)
        );

        background-size: 200% 100%;
        background-position: 0% 0%;

        &:hover {
            transform: translateY(-2px);
            animation: spinGradient 2s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes spinGradient {
            0% {
                background-position: 0% 0%;
            }
            100% {
                background-position: 200% 0%;
            }
        }

        border-radius: var(--radius-3xl);

        padding: var(--padding-6);

        box-shadow: var(--shadow-md);
        transition: all 0.2s;

        cursor: pointer;

        &:hover {
            box-shadow: var(--shadow-lg);
            transition: all 0.2s;
        }

        .containerInfo {
            display: flex;
            flex-direction: column;
            gap: var(--gap-2);

            .textHeader {
                color: var(--text-white);
            }
            .count {
                color: var(--text-purple-100);
            }
        }
        .icon {
            height: 3rem;
            width: 3rem;

            color: var(--text-white);
        }
    }
</style>
