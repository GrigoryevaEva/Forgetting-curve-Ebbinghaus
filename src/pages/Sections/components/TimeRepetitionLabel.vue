<script setup lang="ts">
    import IconSprite from '@/shared/ui/assets/icons/IconSprite.vue';
</script>

<template>
    <div class="container">
        <div class="containerInfo">
            <h3>Время повторить!</h3>
            <p>{} карточка ждут вас</p>
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

        background-image: linear-gradient(0.25turn, var(--bg-purple-400), var(--bg-pink-500));

        border-radius: var(--radius-3xl);

        padding: var(--padding-6);

        box-shadow: var(--shadow-md);
        transition: box-shadow 0.2s;

        cursor: pointer;

        &:hover {
            box-shadow: var(--shadow-lg);
            transition: all 0.2s;
        }

        .containerInfo {
            display: flex;
            flex-direction: column;
            gap: var(--gap-2);
        }
        .icon {
            height: 3rem;
            width: 3rem;

            color: var(--bg-purple-100);
        }
        h3 {
            font-size: var(--text-xl);
            color: var(--text-white);
        }
        p {
            color: var(--text-purple-100);
        }
    }
</style>
