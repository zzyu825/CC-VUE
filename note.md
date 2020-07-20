# Vuex_Module
由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。

为了解决以上问题，Vuex 允许我们将 store 分割成模块（module）。每个模块拥有自己的 state、mutation、action、getter。

```js
modules: {
  a,
  b
}
```
- 获取 state：this.\$store.state.moduleName.xxx
- 获取 getter：this.\$store.getters.xxx
- 提交 mutation：this.\$store.commit('xxx');
- 分发 action：this.\$store.dispatch('xxx');
- 可以通过mapXXX的方式拿到getters、mutations、actions，但是不能拿到state，如果想通过这种方式获得state，需要加命名空间。

## 命名空间
可以通过添加 namespaced: true 的方式使其成为带命名空间的模块。
- 获取 state：this.\$store.state.moduleName.xxx
- 获取 getter：this.\$store.['moduleName/getters'].xxx
- 提交 mutation：this.\$store.commit('moduleName/xxx');
- 分发 action：this.\$store.dispatch('moduleName/xxx');
- 通过mapXXX的方式获取到state、getters、mutations、actions，需要加第一个参数为模块名。

## 模块的局部状态

对于模块内部的 mutation 和 getter，接收的第一个参数是模块的局部状态对象。

同样，对于模块内部的 action，局部状态通过 context.state 暴露出来，根节点状态则为 context.rootState。

对于模块内部的 getter，根节点状态会作为第三个参数暴露出来。