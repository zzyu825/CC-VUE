# Vuex_State
Vuex是vue的状态管理工具，为了更方便的实现多个组件共享状态。

## 安装
```js
npm install vuex --save
```

## 使用
```js
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    count: 0
  }
})

new Vue({
  store,
})
```

## State
单一状态树，使用一个对象就包含了全部的应用层级状态。

### 在Vue组件中获得Vuex状态
Vuex 通过store 选项，提供了一种机制将状态从跟组件“注入”到每一个子组件中（调用Vue.use(Vuex)）。

通过在根实例中注册store选项，该store实例会注入到根组件下的所有子组件中，且子组件能通过this.\$store访问。
```html
<div class="home">
  {{ $store.state.count }}
</div>
```

### mapState 辅助函数
当一个组件需要获取多个状态时，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用mapState辅助函数帮助我们生成计算属性：

```js
import { mapState } from 'vuex';

computed: {
  ...mapState(['count']),
},

```
使用不同的名字：
```js
computed: {
  ...mapState({
    storeCount: state => state.count,
    // 简写
    storeCount: 'count', // 等同于 state => state.count
  }),
},

```