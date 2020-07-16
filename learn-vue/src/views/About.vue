<template>
    <div class="about">
        关于
        {{ $store.state.count }}
        <div id="a">aaaaa</div>
        <router-link to="/" class="link">回首页</router-link>
    </div>
</template>

<script>
export default {
    mounted() {
        // console.log(this.$route);
    }
}
</script>

<style scoped>
#a {
    margin-top: 1000px;
}
.link {
    margin-top: 1000px;
}
</style>