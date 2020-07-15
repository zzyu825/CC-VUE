<template>
    <div class="student">
        学员展示
    </div>
</template>

<script>
export default {
    data() {
        return {
            list: []
        }
    },
    beforeRouteEnter(to, from, next) {  
        // console.log(this);
        // this.$axios
        // console.log('beforeRouteEnter');
        next(vm => {
            // console.log(vm);
            // 数据请求
        });
    },
    // beforeRouteUpdate(to, from, next) {
    //     console.log('beforeRouteUpdate');
    //     next();
    // },
    beforeRouteLeave(to, from, next) {
        // console.log('beforeRouteLeave');
        next();
    }

}
</script>