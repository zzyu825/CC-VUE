<template>
    <div class="demo">
        <button @click="show = !show">点击</button>
        <transition
            :css="false"
            appear
            @before-enter="beforeEnter"
            @enter="enter"
            @after-enter="afterEnter"
            @enter-cancelled="enterCancelled"
        >
            <div class="box" v-show="show">hello vue</div>
        </transition>
    </div>
</template>

<script>
import 'animate.css';

export default {
    data() {
        return {
            show: true,
            x: 200
        }
    },
    methods: {
        beforeEnter(el) {
            // console.log(el);
            el.style.transform = 'translateX(200px)';
        },
        enter(el, done) {
            // done.canceled = true;
            // done参数写了，没有使用，动画结束后会默认执行取消动画，如果使用了，动画结束后则会执行动画完成后的钩子函数
            const timer = setInterval(() => {
                this.x -= 2;
                el.style.transform = `translateX(${this.x}px)`;
                if (this.x <= 0) {
                    clearInterval(timer);
                    done();
                }
            }, 10);
        },
        afterEnter() {
            console.log(1);
            this.x = 200;
        },
        enterCancelled() {
            console.log('cancel')
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

</style>