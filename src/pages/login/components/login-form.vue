<template>
    <div class="login-form-wrapper">
        <div class="login-form-title">登录 Fast Vue3</div>
        <div class="login-form-sub-title">扫地盲僧</div>
        <div class="login-form-error-msg">{{ errorMessage }}</div>
        <a-form
            ref="loginForm"
            :model="userInfo"
            class="login-form"
            layout="vertical"
            @submit="handleSubmit"
        >
            <a-form-item
                field="username"
                :rules="[{ required: true, message: '用户名不能为空' }]"
                :validate-trigger="['change', 'blur']"
                hide-label
            >
                <a-input
                    v-model="userInfo.username"
                    placeholder="saodimangseng"
                    @keyup.enter="handleSubmit"
                >
                    <template #prefix>
                        <icon-user />
                    </template>
                </a-input>
            </a-form-item>
            <a-form-item
                field="password"
                :rules="[{ required: true, message: '密码不能为空' }]"
                :validate-trigger="['change', 'blur']"
                hide-label
            >
                <a-input-password
                    v-model="userInfo.password"
                    placeholder="密码：saodimangseng"
                    allow-clear
                    @keyup.enter="handleSubmit"
                >
                    <template #prefix>
                        <icon-lock />
                    </template>
                </a-input-password>
            </a-form-item>
            <a-space :size="16" direction="vertical">
                <div class="login-form-password-actions">
                    <a-checkbox checked="rememberPassword" @change="setRememberPassword">记住密码</a-checkbox>
                    <a-link>忘记密码</a-link>
                </div>
                <a-button type="primary" html-type="submit" long :loading="loading">登录</a-button>
                <a-button type="text" long class="login-form-register-btn">注册</a-button>
            </a-space>
        </a-form>
    </div>
</template>

<script lang="ts">
import { Message } from '@arco-design/web-vue';
import { ValidatedError } from '@arco-design/web-vue/es/form/interface';
import { useUserStore } from '@/store';
import useLoading from '@/hooks/loading';
import { LoginData } from '@/api/user';

export default defineComponent({
    setup() {
        const router = useRouter();
        const errorMessage = ref('');
        const { loading, setLoading } = useLoading();
        const userStore = useUserStore();
        const userInfo = reactive({
            username: 'admin',
            password: 'admin',
        });
        const handleSubmit = async ({
            errors,
            values,
        }: {
            errors: Record<string, ValidatedError> | undefined;
            values: LoginData;
        }) => {
            if (!errors) {
                setLoading(true);
                try {
                    await userStore.login(values);
                    const { redirect, ...othersQuery } = router.currentRoute.value.query;
                    router.push({
                        name: (redirect as string) || 'workplace',
                        query: {
                            ...othersQuery,
                        },
                    });
                    Message.success('欢迎使用');
                } catch (err) {
                    errorMessage.value = (err as Error).message;
                } finally {
                    setLoading(false);
                }
            }
        };
        const setRememberPassword = () => {
            //
        };
        return {
            loading,
            userInfo,
            errorMessage,
            handleSubmit,
            setRememberPassword,
        };
    },
});
</script>

<style lang="less" scoped>
.login-form {
    &-wrapper {
        width: 320px;
    }

    &-title {
        color: var(--color-text-1);
        font-weight: 500;
        font-size: 24px;
        line-height: 32px;
    }

    &-sub-title {
        color: var(--color-text-3);
        font-size: 16px;
        line-height: 24px;
    }

    &-error-msg {
        height: 32px;
        color: rgb(var(--red-6));
        line-height: 32px;
    }

    &-password-actions {
        display: flex;
        justify-content: space-between;
    }

    &-register-btn {
        color: var(--color-text-3) !important;
    }
}
</style>
