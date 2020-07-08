# Vuex_Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。

```js
const store = new Vuex.Store({
  state: {
    count: 1
  },
  mutations: {
    increment (state) {
      // 变更状态
      state.count++
    }
  }
})
```

不能直接调用一个mutation handler。这个选项更像是事件注册：“当触发一个类型为``increment``的mutation时，调用次函数。”：
```js
this.$store.commit('increment');
```

## 在组件中提交 Mutation
除了在组件中使用 ``this.$store.commit('xxx')`` 提交 mutation之外，还可以使用 mapMutations 辅助函数：
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```

## 提交载荷（Payload）
你可以向store.commit传入额外的参数，即mutation的载荷（payload）：
```js
mutations: {
  increment (state, n) {
    state.count += n
  }
}
```
```js
store.commit('increment', 10)
```
在大多数情况下，载荷应该是一个对象，这样可以包含多个字段并且记录的mutation会更易读：
```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```
```js
store.commit('increment', {
  amount: 10
})
```

## 对象风格的提交方式
提交 mutation 的另一种方式是直接使用包含 type 属性的对象：
```js
store.commit({
  type: 'increment',
  amount: 10
})
```
当使用对象风格的提交方式，整个对象都作为载荷传给 mutation 函数，因此 handler 保持不变：
```js
mutations: {
  increment (state, payload) {
    state.count += payload.amount
  }
}
```

## 使用常量替代 Mutation 事件类型
把这些常量放在单独的文件中可以让你的代码合作者对整个 app 包含的 mutation 一目了然：
```js
// mutation-types.js
export const COUNT_INCREMENT = 'COUNT_INCREMENT'
```
```js
// store.js
import Vuex from 'vuex'
import { COUNT_INCREMENT } from './mutation-types'

const store = new Vuex.Store({
  state: { ... },
  mutations: {
    [COUNT_INCREMENT] (state) {
      // ...
    }
  }
})
```
用不用常量取决于自己，在需要多人协作的大型项目中，这会很有帮助。

## Mutation 需遵守 Vue 的响应规则
既然 Vuex 的 store 中的状态是响应式的，那么当我们变更状态时，监视状态的 Vue 组件也会自动更新。这也意味着 Vuex 中的 mutation 也需要与使用 Vue 一样遵守一些注意事项：

- 最好提前在你的 store 中初始化好所有所需属性。
- 当需要在对象上添加新属性时，你应该
  - 使用 Vue.set(obj, 'newProp', 123), 或者
  - 以新对象替换老对象。例如，利用对象展开运算符我们可以这样写：
    ```js
    state.obj = { ...state.obj, newProp: 123 }
    ```

## 表单处理
在Vuex的state上使用v-model时，由于会直接更改state的值，所以Vue会抛出错误。

如果想要使用双向数据的功能，就需要自己模拟一个v-model: :value="msg" @input="updateMsg"。

### 双向绑定的计算属性
上面的做法，比v-model本身繁琐很多，所以我们还可以使用计算属性的setter来实现双向绑定：
```html
<input v-model="msg">
```

```js
computed: {
  msg: {
    get () {
      return this.$store.state.obj.msg;
    },
    set (value) {
      this.$store.commit(UPDATE_MSG, { value });
    }
  }
}
```

## Mutation 必须是同步函数
要记住 **mutation 必须是同步函数**。why？

```js
mutations: {
  [COUNT_INCREMENT] (state) {
    setTimeout(() => {
      state.count ++;
    }, 1000)
  },
}
```
执行上端代码，我们会发现更改state的操作是在回调函数中执行的，这样会让我们的代码在devtools中变的不好调试：当 mutation 触发的时候，回调函数还没有被调用，devtools 不知道什么时候回调函数实际上被调用，任何在回调函数中进行的状态的改变都是不可追踪的。

## 严格模式
开启严格模式，仅需在创建 store 的时候传入 strict: true：

```js
const store = new Vuex.Store({
  // ...
  strict: true
})
```
在严格模式下，无论何时发生了状态变更且不是由 mutation 函数引起的，将会抛出错误。这能保证所有的状态变更都能被调试工具跟踪到。

### 开发环境与发布环境
不要在发布环境下启用严格模式！严格模式会深度监测状态树来检测不合规的状态变更，要确保在发布环境下关闭严格模式，以避免性能损失。

```js
const store = new Vuex.Store({
  // ...
  strict: process.env.NODE_ENV !== 'production'
})
```