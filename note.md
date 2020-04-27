# 组件_插槽
和 HTML 元素一样，我们经常需要向一个组件传递内容，像这样：
```html
<my-cmp>
  Something bad happened.
</my-cmp>
```
如果有这样的需求，我们就可以通过插槽来做。

## 插槽内容
通过插槽，我们可以这样合成组件：

```html
<my-cmp>
  写在组件标签结构中的内容
</my-cmp>
```

组件模板中可以写成：

```html
<div>
  <slot></slot>
</div>
```

当组件渲染时，``<slot></slot>``将会被替换为“写在组件标签结构中的内容”。
插槽内可以包含任何模板代码，包括HTML和其他组件。
如果``<my-cmp>``没有包含``<slot>``元素，则该组件起始标签和结束标签之间的任何内容都会被抛弃。

## 编译作用域
当在插槽中使用数据时：
```html
<my-cmp>
  这是插槽中使用的数据：{{ user }}
</my-cmp>
```
该插槽跟模板的其他地方一样可以访问相同的实例属性，也就是相同的“作用域”，而不能访问``<my-cmp>``的作用域。
请记住：
**父级模板里的所有内容都是在父级作用域中编译的；子模板里的所有内容都是在子作用域中编译的。**

## 后备内容
我们可以设置默认插槽，它会在没有提供内容时被渲染，如，在``<my-cmp>``组件中：
```js
Vue.compopnent('my-cmp', {
  template: `
    <button type="submit">
      <slot></slot>
    </button>
  `
})
```
我们希望这个``<button>``内绝大多数情况下都渲染文本“Submit”，此时就可以将“Submit”作为后备内容，如：
```js
Vue.compopnent('my-cmp', {
  template: `
    <button type="submit">
      <slot>Submit</slot>
    </button>
  `
})
```
当使用组件未提供插槽时，后备内容将会被渲染。如果提供插槽，则后备内容将会被取代。

## 具名插槽
有时我们需要多个插槽，如``<my-cmp>``组件：
```js
Vue.compopnent('my-cmp', {
  template: `
    <div class="container">
      <header>
        <!-- 页头 -->
      </header>
      <main>
        <!-- 主要内容 -->
      </main>
      <footer>
        <!-- 页脚 -->
      </footer>
    </div>
  `
})
```
此时，可以在``<slot>``元素上使用一个特殊的特性：name。利用这个特性定义额外的插槽：
```js
Vue.compopnent('my-cmp', {
  template: `
    <div class="container">
      <header>
        <slot name="header"></slot>
      </header>
      <main>
        <slot></slot>
      </main>
      <footer>
        <slot name="footer"></slot>
      </footer>
    </div>
  `
})
```
一个不带 name 的 ``<slot>`` 出口会带有隐含的名字“default”。
在向具名插槽提供内容的时候，我们可以在一个 ``<template>`` 元素上使用 v-slot 指令，并以 v-slot 的参数的形式提供其名称：
```html
<my-cmp>
  <template v-slot:header>
    <h1>头部</h1>
  </template>

  <p>内容</p>
  <p>内容</p>

  <template v-slot:footer>
    <p>底部</p>
  </template>
</my-cmp>
```
现在``<template>``元素中的所有内容都会被传入相应的插槽。任何没有被包裹在带有``v-slot``的``<template>``中的内容都会被视为默认插槽的内容。
为了模板更清晰，也可以写成以下这样：
```html
<my-cmp>
  <template v-slot:header>
    <h1>头部</h1>
  </template>

  <template v-slot:default>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template v-slot:footer>
    <p>底部</p>
  </template>
</my-cmp>
```

**注意：v-slot只能添加在``<template>``上，只有一种例外情况。**

## 作用域插槽
为了能够让插槽内容访问子组件的数据，我们可以将子组件的数据作为``<slot>``元素的一个特性绑定上去：
```js
Vue.component('my-cmp', {
  data () {
    return {
      user: {
        name: '杉杉',
        age: 18,
      }
    }
  },
  template: `
    <span>
      <slot v-bind:user="user"></slot>
    </span>
  `,
})
```
绑定在 ``<slot>`` 元素上的特性被称为**插槽 prop**。
那么在父级作用域中，我们可以给``v-slot``带一个值来定义我们提供的插槽prop的名字：
```html
<div id="app">
  <my-cmp>
    <template v-slot:default="slotProps">
      {{ slotProps.user.name }}
    </template>
  </my-cmp>
</div>
```

### 独占默认插槽的缩写语法
当被提供的内容只有默认插槽时，组件的标签可以被当作插槽的模板来使用，此时，可以将``v-slot``直接用在组件上：
```html
<my-cmp v-slot:default="slotProps">
  {{ slotProps.user.name }}
</my-cmp>
```
也可以更简单：
```html
<my-cmp v-slot="slotProps">
  {{ slotProps.user.name }}
</my-cmp>
```
注意：**默认插槽的缩写语法不能和具名插槽混用，因为它会导致作用域不明确**。
```html
<!-- 无效，会导致警告 -->
<my-cmp v-slot="slotProps">
  {{ slotProps.user.name }}
  <template v-slot:other="otherSlotProps">
    slotProps 在这里是不合法的
  </template>
</my-cmp>
```
只要出现多个插槽，就需要为所有的插槽使用完整的基于``<template>``的语法。

### 解构插槽Prop
我们可以使用解构传入具体的插槽prop，如：
```html
<my-cmp v-slot="{ user }">
  {{ user.name }}
</my-cmp>
```
这样模板会更简洁，尤其是在为插槽提供了多个prop时。
此外还可以有其他可能，如prop重命名：
```html
<my-cmp v-slot="{ user: person }">
  {{ person.name }}
</my-cmp>
```
以及自定义后备内容，当插槽prop是undefined时生效：
```html
<my-cmp v-slot="{ user = { name: 'Guest' } }">
  {{ user.name }}
</my-cmp>
```

## 动态插槽名
> Vue 2.6.0新增
```html
<my-cmp>
  <template v-slot:[dynamicSlotName]>
    ...
  </template>
</my-cmp>
```

## 具名插槽的缩写
> Vue 2.6.0新增

跟``v-on``和``v-bind``一样，``v-slot``也有缩写，将``v-slot:``替换为``#``。

```html
<my-cmp>
  <template #header>
    <h1>头部</h1>
  </template>

  <template #default>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template #footer>
    <p>底部</p>
  </template>
</my-cmp>
```
当然，和其它指令一样，该缩写只在其有参数的时候才可用。

## 废弃了的语法

### 带有slot特性的具名插槽
> 自 2.6.0 起被废弃
```html
<my-cmp>
  <template slot="header">
    <h1>头部</h1>
  </template>

  <template>
    <p>内容</p>
    <p>内容</p>
  </template>

  <template slot="footer">
    <p>底部</p>
  </template>
</my-cmp>
```

### 带有slot-scope特性的作用域插槽
> 自 2.6.0 起被废弃
```html
<my-cmp>
  <template slot="default" slot-scope="slotProps">
    {{ slotProps.user.name }}
  </template>
</my-cmp>
```