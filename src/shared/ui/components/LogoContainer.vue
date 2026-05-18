<script setup lang="ts">
    import Logo from '@/shared/ui/assets/icons/Logo.vue';

    interface Props {
        size?: '100' | '200';
    }

    const props = withDefaults(defineProps<Props>(), {
        size: '100',
    });
</script>

<template>
    <div
        class="logoContainer"
        :class="`logoContainer${size}`"
    >
        <Logo class="logo" />
        <p>Memento</p>
    </div>
</template>

<style scoped lang="scss">
    .logoContainer {
        display: flex;
        gap: var(--gap-3);
        align-items: center;
        flex: 1;

        &100 {
            p {
                font-size: var(--text-2xl);
            }

            .logo {
                width: 1.875rem;
                height: 1.875rem;
            }
        }

        &200 {
            p {
                font-size: var(--text-3xl);
            }

            .logo {
                width: 2.125rem;
                height: 2.125rem;
            }
        }

        .logo {
            color: var(--bg-purple-400);
        }

        p {
            color: var(--bg-purple-900);
            font-family: Futurespore;
        }
    }
</style>
