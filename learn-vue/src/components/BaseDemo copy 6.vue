<template>
    <div class="demo">
        <button @click="show = !show">点击</button>
        <!-- <transition 
            :duration="3000"
            enter-active-class="animate__animated animate__shakeX v-enter-active"
            leave-active-class="animate__animated animate__shakeY v-leave-ctive"
        >
            <div class="box" v-if="show">hello vue</div>
        </transition> -->
        <transition name="div" :duration="{enter: 4000, leave: 8000}">
            <div class="box" v-show="show">
                <transition name="span">
                    <span v-if="show">hello vue</span>
                </transition>
            </div>
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

/* .v-enter,
.v-leave-to {
    opacity: 0;
}

.v-enter-active, 
.v-leave-ctive {
    transition: opacity 10s;
}

.v-enter-to,
.v-leave {
    opacity: 1;
} */

.div-enter,
.div-leave-to {
    /* opacity: 0; */
    transform: translateX(200px);
}

.div-enter-active, 
.div-leave-active {
    transition: all 2s;
}

.div-enter-to,
.div-leave {
    transform: translateX(0px)
}

.span-enter,
.span-leave-to {
    font-size: 12px;
}

.span-enter-active, 
.span-leave-active {
    transition: all 2s 2s;
}

.span-enter-to,
.span-leave {
    font-size: 18px;
}



</style>