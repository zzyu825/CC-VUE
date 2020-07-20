<template>
    <div class="home">
        首页
        <router-link to="/about#a">去关于</router-link>
        <br>
        <button @click="handel">点击</button>
        {{ $store.state.count.count }}
        {{ StoreCount }}
        <!-- {{ a }}
        {{ b }} -->
        <!-- {{ countDouble(3) }} -->
        <!-- {{ obj }}
        {{ arr }} -->
        <!-- <input v-model="$store.state.msg"/>{{ $store.state.msg }} -->
        <!-- <input v-model="msg"/>{{ msg }} -->
        <!-- <input :value="msg" @input="handelInput"/>{{ msg }} -->
        <input v-model="msg"/>{{ msg }}
        <div class="test">测试</div>
    </div>
</template>

<script>
import { mapState, mapGetters, mapMutations } from 'vuex';
import { ADD, CHANGE_OBJ, UPDATE_MSG } from '@/store/mutation-types'

export default {
    data() {
        return {
            // count: this.$store.state.count
            // msg: 'hello vue'
        }
    },
    computed: {
        count() {
            return this.msg;
        },
        ...mapState({
            StoreCount: state => state.count.count + 10,
        }),
        ...mapGetters('count', ['countDouble']),
        msg: {
            get() {
                return this.$store.state.msg;
            },
            set(value) {
                this.$store.commit(UPDATE_MSG, { value });
            }
        }
    },
    created() {
        // console.log(this.$store);
    },
    methods: {
        handel() {  
            const num = Math.floor(Math.random() * 10);
            this.$store.dispatch('count/increment', { num }).then(() => {
                alert('共享状态count值已经增加!');
            })
        },
        handelInput(e) {
            const value = e.target.value;
            this.$store.commit(UPDATE_MSG, { value });
        }
    }
}
</script>

<style scoped>
.test {
    margin-top: 1000px;
}
</style>

