# 过渡_多元素过渡

当切换展示的元素标签名相同时，需要给每一个元素设置不同的key值，否则Vue为了效率只会替换相同标签内部的内容。

```html
<transition>
  <div v-if="show" key="world">hello world</div>
  <div v-else key="shanshan">hello shanshan</div>
</transition>
```

在一些场景中，可以通过给同一个元素的key值设置不同的状态来替代 v-if 和 v-else。如：

```html
<transition>
  <div :key="keyName">hello {{ key Name}}</div>
</transition>
```

```js
keyName: 'world',
```

## 过渡模式
Vue提供一个一个 mode 特性，可以给多个元素过渡应用不同的模式，mode 的值可为：

- in-out：新元素先进行过渡，完成之后当前元素过渡离开。
- out-in：当前元素先进行过渡，完成之后新元素过渡进入。

## 多组件过渡
我们可以使用动态组件切换展示不同的组件。