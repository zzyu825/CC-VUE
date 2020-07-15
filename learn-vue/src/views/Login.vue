<template>
    <div class="login">
        <button @click="handel">{{ btnText }}</button>
    </div>
</template>

<script>
import Login from '../utils/login'
export default {
    data() {
        return {
            isLogin: Login.isLogin()
        }
    },
    methods: {
        handel() {
            if (this.isLogin) {
                login.cancelLogin();
            } else {
                Login.login();
                this.goBack();
            }
            this.isLogin = !this.isLogin;
        },
        goBack() {
            const flag = window.confirm('登录成功，是否要回到原来的页面？');
            if (flag) {
                this.$router.go(-1);
            }
        }
    },
    computed: {
        btnText() {
            return this.isLogin ? '取消登录' : '登录'
        }
    }
}
</script>