<template>
    <div class="demo">
        <button @click="show = !show">点击</button>
        <transition
            :css="false"
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
            // 为了保证after-enter异步执行，done参数必须加，这样动画结束后才会调用afterEnter
            // done参数加了之后，如果希望在动画结束后处理一些逻辑，则在合适位置手动调用下done
            // 如果设置了done.canceled，同时调用了done，取消动画会失效

            // done.canceled = true; // 开启下一次动画时，会调用enterCancelled，标记取消动画
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
            console.log('afterEnter');
            this.x = 200;
        },
        enterCancelled() {
            console.log('cancel');
            // 设置状态，做其他逻辑处理
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