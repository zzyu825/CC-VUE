<template>
    <div class="demo">
        <button @click="show = !show">点击</button>
        <transition 
            type="transition"
            enter-active-class="animate__animated animate__shakeX v-enter-active"
            leave-active-class="animate__animated animate__shakeY v-leave-ctive"
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

.v-enter,
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
}

</style>