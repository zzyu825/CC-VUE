# 组件基础

## 组件是什么？
组件是可复用的Vue实例，且带有一个名字，例如名字为shanshan-cmp，那么我们则可以在一个通过new Vue创建的根实例中，把这个组件作为自定义元素来使用：
```html
<div id="app">
  <shanshan-cmp></shanshan-cmp>
</div>
```
```js
const vm = new Vue({
  el: '#app'
})
```
因为组件是可复用的 Vue 实例，所以它们与 new Vue 接收相同的选项，例如 data、computed、watch、methods 以及生命周期钩子等。仅有的例外是像 el 这样根实例特有的选项。

## 组件注册

### 全局组件
> Vue.component

利用Vue.component创建的组件组件是全局注册的。也就是说它们在注册之后可以用在任何新创建的 Vue 根实例 (new Vue) 的模板中。

参数：
  - {string}
  - {Function | Object} [definition]

用法：
  注册或获取全局组件。注册还会自动使用给定的id设置组件的名称。

示例：
```html
<div id="app">
  <button-counter></button-counter>
</div>
```

```js
Vue.component('button-counter', {
  data () {
    return {
      count: 0,
    }
  },
  template: `
    <button @click="count ++">你按了我{{ count }}次</button>
  `
})

const vm = new Vue({
  el: '#app',
})
```

### 局部组件
在components选项中定义要使用的组件。
对于 components 对象中的每一个属性来说，其属性名就是自定义元素的名字，其属性值就是这个组件的选项对象。

示例：
```html
<div id="#app">
  <button-counter></button-counter>
</div>
```
```js
const buttonCounter = {
  data () {
    return {
      count: 0
    }
  },
  template: `
    <button @click="count ++">你按了我{{ count }}次</button>
  `,
}

const vm = new Vue({
  el: '#app',
  components: {
    'button-counter': buttonCounter
  }
})
```

### 组件名
在注册一个组件的时候，我们始终需要给它一个名字。你给予组件的名字可能依赖于你打算拿它来做什么，所以命名要语义化。

> 组件名大小写

定义组件名的方式有两种：

> 使用kebab-case (横短线分隔命名)

```js
Vue.component('my-component', {/***/});
```

当使用kebab-case定义一个组件时，你必须在引用这个自定义元素时使用kebab-case，例如：``<my-component></my-component>``。

> 使用PascalCase (大驼峰命名)

```js
Vue.component('MyComponent', {/***/});
```
当使用PascalCase定义一个组件时，你在引用这个自定义元素时两种命名法都可以。也就是说``<my-component-name>`` 和 ``<MyComponentName>`` 都是可接受的。注意，尽管如此，直接在 DOM (除字符串模板或单文件组件) 中使用时只有 kebab-case 是有效的。

另：我们强烈推荐遵循 W3C 规范中的自定义组件名 (字母全小写且必须包含一个连字符)。这会帮助你避免和当前以及未来的 HTML 元素相冲突。

### 组件复用
可以将组件进行任意次数的复用：
```html
<div id="#app">
  <button-counter></button-counter>
  <button-counter></button-counter>
  <button-counter></button-counter>
</div>
```
### 自闭合组件
在单文件组件、字符串模板和 JSX 中没有内容的组件应该是自闭合的——但在 DOM 模板里永远不要这样做，因为它只认作一个。

自闭合组件表示它们不仅没有内容，而且刻意没有内容。其不同之处就好像书上的一页白纸对比贴有“本页有意留白”标签的白纸。而且没有了额外的闭合标签，你的代码也更简洁。

不幸的是，HTML 并不支持自闭合的自定义元素——只支持官方的“空”元素。所以上述策略仅适用于进入 DOM 之前 Vue 的模板编译器能够触达的地方，然后再产出符合 DOM 规范的 HTML。

### 组件的data选项
当我们定义一个组件时，它的 data 并不是像这样直接提供一个对象：
```js
data: {
  count: 0
}
```
取而代之的是，一个组件的 data 选项必须是一个函数，因此每个实例可以维护一份被返回对象的独立的拷贝：
```js
data () {
  return {
    count: 0
  }
}
```
如果 Vue 没有这条规则，点击一个按钮就可能会像下面一样影响到其它所有实例:

![avatar](https://developer.duyiedu.com/myVue/data.gif)

### 单个根元素
每个组件必须只有一个根元素，当模板的元素大于1时，可以将模板的内容包裹在一个父元素内。