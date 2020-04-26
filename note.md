# 组件_非Prop特性
非Prop特性指的是，一个未被组件注册的特性。当组件接收了一个非Prop特性时，该特性会被添加到这个组件的根元素上。


## 替换/合并已有的特性

想象一下 ``<my-cmp>`` 的模板是这样的：

```html
<input type="date" class="b">
```

为了给我们的日期选择器插件定制一个主题，我们可能需要像这样添加一个特别的类名：

```html
<my-cmp
  class="my-cmp"
></my-cmp>
```

在这种情况下，我们定义了两个不同的 class 的值：

- my-cmp，这是在组件的模板内设置好的
- b，这是从组件的父级传入的

对于绝大多数特性来说，从外部提供给组件的值会替换掉组件内部设置好的值。所以如果传入 type="text" 就会替换掉 type="date" 并把它破坏！庆幸的是，class 和 style 特性会稍微智能一些，即两边的值会被合并起来，从而得到最终的值：my-cmp b。

## 禁用特性继承
如果不希望组件的根元素继承特性，那么可以在组件选项中设置 ``inheritAttrs: false``。如：
```js
Vue.component('my-cmp', {
  inheritAttrs: false,
  // ...
})
```
在这种情况下，非常适合去配合实例的 $attrs 属性使用，这个属性是一个对象，键名为传递的特性名，键值为传递特性值。

```js
{
  required: true,
  placeholder: 'Enter your username'
}
```

使用 ``inheritAttrs: false`` 和 ``$attrs`` 相互配合，我们就可以手动决定这些特性会被赋予哪个元素。如：

```js
Vue.component('base-input', {
  inheritAttrs: false,
  props: ['label', 'value'],
  template: `
    <label>
      {{ label }}
      <input
        v-bind="$attrs"
      >
    </label>
  `,
})
```

注意：inheritAttrs: false 选项不会影响 style 和 class 的绑定。
