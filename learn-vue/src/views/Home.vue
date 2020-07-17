<template>
    <div class="home">
        首页
        <router-link to="/about#a">去关于</router-link>
        <br>
        <button @click="handel">点击</button>
        {{ StoreCount }}
        <!-- {{ a }}
        {{ b }} -->
        <!-- {{ countDouble(3) }} -->
        <!-- {{ obj }}
        {{ arr }} -->
        <!-- <input v-model="$store.state.msg"/>{{ $store.state.msg }} -->
        <!-- <input v-model="msg"/>{{ msg }} -->
        <!-- <input :value="msg" @input="handelInput"/>{{ msg }} -->
        <!-- <input v-model="msg"/>{{ msg }} -->
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
        ...mapState(['a', 'b', 'obj', 'arr']),
        // countDouble() {
        //     // return this.$store.getters.countDouble;
        //     return this.$store.getters.countDouble(3);
        // },
        ...mapGetters(['countDouble']),
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
        // ...mapMutations(['add']),
        handel() {
            const num = Math.floor(Math.random() * 10);
            // const num = 10;
            // this.$store.commit('add', { num });
            // this.$store.commit({
            //     type: ADD,
            //     num
            // });
            // this.$store.commit(CHANGE_OBJ);
            // this.add();
            // this.$store.dispatch('increment', { num });
            this.$store.dispatch('increment', { num }).then(() => {
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

