# Vuex_Getter
store的计算属性。getter的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

Getter 接收state作为其第一个参数、getters作为其第二个参数。

```js
getters: {
  doubleCount (state) {
    return state.count * 2;
  }
}
```

## 通过属性访问
Getter会暴露为store.getters对象：``this.$store.getters.doubleCount``

## 通过方法访问
也可以让getter返回一个函数，来实现给getter传参
```js
getters: {
  addCount: state => num => state.count + num;
}
```
```js
this.$store.getters.addCount(3);
```

## mapGetters 辅助函数
```js
import { mapsGetters } from 'vuex';

export default {
  computed: {
    ...mapGetters([
      'doubleCount',
      'addCount',
    ])
  }
}
```

如果你想将一个 getter 属性另取一个名字，使用对象形式：
```js
mapGetters({
  // 把 `this.doneCount` 映射为 `this.$store.getters.doneTodosCount`
  storeDoubleCount: 'doubleCount'
})
```