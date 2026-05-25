<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { HOME_PATH } from '@/app/routing/constants';

    import { useAuthStore } from '@/stores/auth';

    import CustomButton from '@/shared/ui/components/CustomButton.vue';
    import CustomInput from '@/shared/ui/components/CustomInput.vue';
    import LogoContainer from '@/shared/ui/components/LogoContainer.vue';

    const selectTab = ref<'login' | 'register'>('login');
    const formData = ref({
        email: '',
        password: '',
    });

    const router = useRouter();
    const authStore = useAuthStore();

    const handleSubmit = async () => {
        const data = {
            ...formData.value,
        };

        if (selectTab.value === 'login') {
            await authStore.login(data);
            if (authStore.loginState.isSuccess) router.push(HOME_PATH);
        } else {
            await authStore.register(data);
            if (authStore.registerState.isSuccess) router.push(HOME_PATH);
        }
    };
    const handleChangeTabOnLogin = () => (selectTab.value = 'login');
    const handleChangeTabOnRegister = () => (selectTab.value = 'register');

    const buttonText = computed(() =>
        selectTab.value === 'login' ? 'Войти' : 'Зарегестрирвоаться'
    );
</script>

<template>
    <div class="authWrapper">
        <div class="authModal">
            <LogoContainer size="200" />

            <div class="tabsContainer">
                <div
                    class="tab"
                    :class="{ selectTab: selectTab === 'login' }"
                    @click="handleChangeTabOnLogin"
                >
                    Вход
                </div>
                <div
                    class="tab"
                    :class="{ selectTab: selectTab === 'register' }"
                    @click="handleChangeTabOnRegister"
                >
                    Регистрация
                </div>
            </div>

            <form @submit.prevent="handleSubmit">
                <CustomInput
                    id="login"
                    v-model="formData.email"
                    label="Логин"
                    type="email"
                    placeholder="Ваш логин"
                    required
                />
                <CustomInput
                    id="password"
                    v-model="formData.password"
                    label="Пароль"
                    type="password"
                    placeholder="Ваш пароль"
                    required
                />
                <CustomButton
                    :text="buttonText"
                    class="submitButton"
                    size="200"
                />
            </form>

            <p class="textSeparator">или</p>

            <CustomButton
                icon="briefcase"
                class="testLoginButton"
                theme="transparent"
                text="Тестовый вход"
                size="200"
            />
            <p class="textHint">
                Для работодателей: используйте тестовый вход для быстрого доступа к портфолио без
                регистрации
            </p>
        </div>
    </div>
</template>

<style scoped lang="scss">
    .authWrapper {
        display: flex;
        align-items: center;
        justify-content: center;

        width: 100%;
        height: 100%;

        .authModal {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            gap: var(--gap-7);

            width: 60vw;

            padding: var(--padding-6);

            .tabsContainer {
                display: flex;
                align-items: center;
                gap: var(--gap-2);

                height: 2.125rem;
                width: 100%;

                .tab {
                    flex: 1;
                    align-content: center;
                    text-align: center;
                    height: 100%;

                    color: var(--text-purple-630);

                    border-radius: var(--radius-lg);

                    cursor: pointer;

                    &:hover {
                        background-color: var(--bg-purple-200);
                        transition: all 0.2s;
                    }
                }

                .selectTab {
                    color: var(--text-purple-700);

                    transition: all 0.2s;
                }
            }

            .submitButton,
            .testLoginButton {
                border-radius: var(--radius-2xl);
                width: 100%;
            }

            .textSeparator,
            .textHint {
                text-align: center;
                color: var(--text-purple-200);
                font-size: var(--text-sm);
            }
        }
        form {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: var(--gap-6);

            width: 100%;
        }
    }
</style>
