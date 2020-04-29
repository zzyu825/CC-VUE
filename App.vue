<template>
    <div>
        father
        {{ msg }}
        <p>我是父组件p元素</p>
        <base-son/>
    </div>
</template>

<script>
import baseSon from './Son'

export default {
    components: {
        baseSon
    },
    data () {
        return {
            msg: 'hello vue'
        }
    }
}
</script>

<style>
    div {
        background-color: #f00;
    }
</style>