<template>
    <div class="demo">
        <button @click="show = !show">点击</button>
        <!-- <transition 
            enter-active-class="enter-active"
            leave-active-class="leave-active"
        >
            <div class="box" v-if="show">hello vue</div>
        </transition> -->
        <transition 
            enter-active-class="animate__animated animate__bounceInDown"
            leave-active-class="animate__animated animate__bounceOutDown"
        >
            <div class="box" v-if="show">hello vue</div>
        </transition>
    </div>
</template>

<script>
import 'animate.css';

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

.enter-active {
    animation: animate 2s;
}

.leave-active {
    animation: animate 2s reverse;
}

@keyframes animate {
    0% {
        opacity: 0;
        transform: translateX(400px) scale(1);
    }

    50% {
        opacity: .5;
        transform: translateX(200px) scale(1.5);
    }

    100% {
        opacity: 1;
        transform: translateX(0px) scale(1);
    }
}

/* 
opacity: 0

opacity: 1

0%{}

100%{}
*/

</style>