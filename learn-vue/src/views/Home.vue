<template>
    <div class="home">
        首页
        <router-link to="/about#a">去关于</router-link>
        <br>
        <button @click="$store.state.count ++">点击</button>
        {{ StoreCount }}
        {{ a }}
        {{ b }}
        <div class="test">测试</div>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            // count: this.$store.state.count
            msg: 'hello vue'
        }
    },
    // computed: {
    //     count() {
    //         return this.$store.state.count
    //     },
    //     a() {
    //         return this.$store.state.a
    //     },
    //     b() {
    //         return this.$store.state.b
    //     }
    // },
    // computed: mapState(['count', 'a', 'b']),
    // computed: mapState({
    //     // StoreCount: 'count'
    //     StoreCount: state => state.count + 10
    // }),
    computed: {
        count() {
            return this.msg;
        },
        ...mapState({
            StoreCount: state => state.count + 10,
        }),
        ...mapState(['a', 'b'])
    },
    created() {
        // console.log(this.$store);
    }
}
</script>

<style scoped>
.test {
    margin-top: 1000px;
}
</style>

