<script setup lang="ts">
    import { computed, ref } from 'vue';
    import { useRouter } from 'vue-router';

    import { HOME_PATH } from '@/app/routing/constants';

    import { useAuthStore } from '@/stores/auth';

    import CustomButton from '@/shared/ui/components/CustomButton.vue';
    import CustomInput from '@/shared/ui/components/CustomInput.vue';
    import CustomText from '@/shared/ui/components/CustomText.vue';
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

    const handleTestLogin = async () => {
        await authStore.testLogin();
        if (authStore.testLoginState.isSuccess) router.push(HOME_PATH);
    };

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
                    <CustomText
                        class="text"
                        text="Вход"
                    />
                </div>
                <div
                    class="tab"
                    :class="{ selectTab: selectTab === 'register' }"
                    @click="handleChangeTabOnRegister"
                >
                    <CustomText
                        class="text"
                        text="Регистрация"
                    />
                </div>
            </div>

            <form @submit.prevent="handleSubmit">
                <CustomInput
                    id="login"
                    v-model="formData.email"
                    label="Логин"
                    type="text"
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

            <CustomText
                class="textSeparator"
                text="или"
                size="xs"
            />

            <div class="testLoginContainer">
                <CustomButton
                    icon="briefcase"
                    class="testLoginButton"
                    theme="transparent"
                    :shadow="false"
                    text="Тестовый вход"
                    size="200"
                    :when-click="handleTestLogin"
                />
                <CustomText
                    class="textHint"
                    text="Для работодателей: используйте тестовый вход для быстрого доступа к портфолио без
                регистрации"
                    size="xs"
                />
            </div>
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

            width: 30rem;

            background-color: var(--bg-white);
            border-radius: var(--radius-3xl);

            padding: var(--padding-8) var(--padding-6);

            box-shadow: var(--shadow-lg);

            .tabsContainer {
                display: flex;
                align-items: center;
                gap: var(--gap-2);

                height: 3.25rem;
                width: 100%;

                background-color: var(--bg-purple-50);

                border-radius: var(--radius-lg);

                .tab {
                    flex: 1;
                    align-content: center;
                    text-align: center;
                    height: 90%;

                    color: var(--text-purple-630);

                    border-radius: var(--radius-lg);

                    cursor: pointer;

                    .text {
                        color: var(--text-purple-700);
                    }
                }

                .selectTab {
                    background-color: var(--bg-white);
                    box-shadow: var(--shadow-md);

                    transition: all 0.2s;
                }
            }

            .testLoginContainer {
                display: flex;
                flex-direction: column;
                gap: var(--gap-2);
            }
            .submitButton,
            .testLoginButton {
                border-radius: var(--radius-2xl);
                width: 100%;
            }
            .testLoginButton {
                border: 2px var(--border-purple-200) solid;
            }
            .submitButton {
                background-image: linear-gradient(
                    0.25turn,
                    var(--bg-purple-400),
                    var(--bg-pink-500),
                    var(--bg-purple-400)
                );

                background-size: 200% 100%;
                background-position: 0% 0%;
                transition: transform 0.2s ease;

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
