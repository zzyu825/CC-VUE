# 函数式组件
当一个组件不需要状态（即响应式数据）、不需要任何生命周期场景、只接受一些props来显示组件时，我们可以将其标记为函数式组件。

```js
functional: true,
```

因为函数式组件只是函数，所以渲染开销会低很多。

在 2.3.0 之前的版本中，如果一个函数式组件想要接收 prop，则 props 选项是必须的。在 2.3.0 或以上的版本中，你可以省略 props 选项，所有组件上的 attribute 都会被自动隐式解析为 prop。

为了弥补缺少的实例，render 函数提供第二个参数context作为上下文。context包括如下字段：
- props：提供所有 prop 的对象
- slots: 一个函数，返回了包含所有插槽(非作用域)的对象
- scopedSlots: (2.6.0+) 一个暴露传入的作用域插槽的对象。也以函数形式暴露普通插槽。
- data：传递给组件的整个数据对象，作为 createElement 的第二个参数传入组件
- parent：对父组件的引用
- listeners: (2.3.0+) 一个包含了所有父组件为当前组件注册的事件监听器的对象。这是  data.on 的一个别名。
- injections: (2.3.0+) 如果使用了 inject 选项，则该对象包含了应当被注入的属性。
- children: VNode 子节点的数组，包含了所有的非作用域插槽和非具名插槽。

## slots() VS children

示例1：
```html
<base-level :level="1" @click="handleClick">

  <template v-slot:header>
    <div>我是头部</div>
  </template>

  <div>div</div>
  <p>p</p>
  <template>template</template>

</base-level>
```
slots()的结果为：
```js
{
  default:[<div>div</div>, <p>p</p>, template],
  header: [<div>我是头部</div>]
}
```

children的结果为：
```
[<div>div</div>, <p>p</p>, template]
```

示例2：

```html
<base-level :level="1" @click="handleClick">

  <template v-slot:header>
    <div>我是头部</div>
  </template>

  <template v-slot:default>
    <div>div</div>
  </template>

  <p>p</p>
  <template>template</template>

</base-level>
```

slots()的结果为：
```js
{
  default:[<div>div</div>],
  header: [<div>我是头部</div>]
}
```

children的结果为：
```
[<p>p</p>, template]
```



## 基于模板的函数式组件
在 2.5.0 及以上版本中，如果你使用了单文件组件，那么基于模板的函数式组件可以这样声明：
```html
<template functional>
</template>
```