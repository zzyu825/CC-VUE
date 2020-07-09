<template>
    <div class="demo">
        <button @click="show = !show">点击</button>
        <transition>
            <div class="box" v-if="show">hello vue</div>
        </transition>
    </div>
</template>

<script>
export default {
    data() {
        return {
            show: true
        }
    }
    
}
</script>

<style scoped>
button {
    margin-bottom: 10px;
}

.box {
    width: 100px;
    height: 100px;
    line-height: 100px;
    text-align: center;
    border: 1px solid red;
    color: #f00;
}

.v-leave {
    opacity: 1;
}

.v-leave-active {
    transition: opacity 10s;
}

.v-leave-to {
    opacity: 0;
}

.v-enter {
    opacity: 0;
}

.v-enter-active {
    transition: opacity 10s
}

.v-enter-to {
    opacity: 1;
}

/* 
opacity: 1
transition: opacity .3s
opacity: 0
*/

</style>