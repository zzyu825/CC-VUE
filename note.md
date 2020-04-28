# 混入
## 基础
混入 (mixin) 提供了一种非常灵活的方式，来分发 Vue 组件中的可复用功能。
一个混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被“混合”进入该组件本身的选项。

```js
const mixin = {
  created () {
    this.hello();
  },
  methods: {
    hello () {
      console.log('hello，我是混入中的函数');
    },
  }
}

Vue.component('my-cmp', {
  mixins: [mixin],
  template: `
    <div>xx</div>
  `
})
```

## 选项合并
当组件和混入对象含有同名选项时，这些选项会以恰当的方式进行“合并”。

合并数据，以组件数据优先：

```js
var mixin = {
  data () {
    return {
      msg: 'hello',
    }
  }
}
new Vue({
  mixins: [mixin],
  data: {
    msg: 'goodbye',
  },
  created: function () {
    console.log(this.msg)
})
```

合并钩子函数，将合并为一个数组。先调用混入对象的钩子，再调用组件自身钩子。

```js
var mixin = {
  created () {
    console.log('混入对象钩子')
  }
}

new Vue({
  el: '#app',
  mixins: [mixin],
  created () {
    console.log('组件钩子')
  }
})
```

合并值为对象的选项，如 methods、components 等，将被合并为同一个对象。两个对象键名冲突时，取组件对象的键值对。

## 全局混入
混入也可以进行全局注册。使用时格外小心！一旦使用全局混入，它将影响每一个之后创建的 Vue 实例。使用恰当时，这可以用来为自定义选项注入处理逻辑。
```js
// 为自定义的选项 'myOption' 注入一个处理器。
Vue.mixin({
  created () {
    const myOption = this.$options.myOption
    if (myOption) {
      console.log(myOption)
    }
  }
})

new Vue({
  myOption: 'hello!'
})
```

谨慎使用全局混入，因为它会影响每个单独创建的 Vue 实例 (包括第三方组件)。大多数情况下，只应当应用于自定义选项。