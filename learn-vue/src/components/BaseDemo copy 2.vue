<template>
    <div class="demo">
        <button @click="show = !show">点击</button>
        <transition name="box1">
            <div class="box" v-if="show">hello vue</div>
        </transition>
        <transition name="box2">
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

.box1-leave, .box2-enter-to {
    opacity: 1;
    transform: translateX(0px)
}

.box1-leave-active, .box2-enter-active {
    transition: all 1s;
}

.box1-leave-to, .box2-enter {
    opacity: 0;
    transform: translateX(200px)
}

.box1-enter, .box2-leave-to {
    opacity: 0;
    transform: translateY(200px)
}

.box1-enter-active, .box2-leave-active {
    transition: all 1s;
}

.box1-enter-to, .box2-leave {
    opacity: 1;
    transform: translateY(0px)
}

/* 
opacity: 1
transition: opacity .3s
opacity: 0
*/

</style>