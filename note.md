# 组件_Prop

## 注册自定义特性
组件默认只是写好结构、样式和行为，使用的数据应由外界传递给组件。
> 如何传递？注册需要接收的prop，将数据作为一个自定义特性传递给组件。

如：
```html
<div id="app">
  <video-item 
    title="羊村摇" 
    poster="https://developer.duyiedu.com/bz/video/955bac93ccb7f240d25a79b2ff6a9fdbda9537bc.jpg@320w_200h.webp" 
    play="638000" 
    rank="1207"
  ></video-item>
</div>
```
```js
Vue.component('video-item', {
  props: ['title', 'poster', 'play', 'rank'],
})
```
在上述模板中，你会发现我们能够在组件实例中访问这个值，就像访问 data 中的值一样：
```html
<div id="app">
  <video-item 
    title="羊村摇" 
    poster="https://developer.duyiedu.com/bz/video/955bac93ccb7f240d25a79b2ff6a9fdbda9537bc.jpg@320w_200h.webp" 
    play="638000" 
    rank="1207"
  ></video-item>
</div>
```
```js
Vue.component('video-item', {
  props: ['title', 'poster', 'play', 'rank'],
  template: `<div>{{ title }}</div>`
})
```

## Prop的大小写

HTML 中的特性名是大小写不敏感的，所以浏览器会把所有大写字符解释为小写字符。故：当 传递的prop为 短横线分隔命名时，组件内 的props 应为 驼峰命名 。
如：
```html
<div id="app">
  <!-- 在 HTML 中是 kebab-case 的 -->
  <video-item sub-title="hello!"></video-item>
</div>
```
```js
Vue.component('video-item', {
  // 在 JavaScript 中是 camelCase 的
  props: ['subTitle'],
  template: '<h3>{{ postTitle }}</h3>'
})
```
要注意的是：如果使用的是字符串模板，那么这个限制就不存在了。

## 传递静态或动态 Prop
像这样，我们已经知道了可以给 prop 传入一个静态的值：
```html
<video-item title="羊村摇"></video-item>
```

若想要传递一个动态的值，可以配合v-bind指令进行传递，如：
```html
<video-item :title="title"></video-item>
```

### 传递一个对象的所有属性
如果你想要将一个对象的所有属性都作为 prop 传入，你可以使用不带参数的 v-bind 。例如，对于一个给定的对象 person：
```js
person: {
  name: 'shanshan',
  age: 18
}
```

传递全部属性：
```html
<my-component v-bind="person"></my-component>
```

上述代码等价于：
```html
<my-component
  :name="person.name"
  :age="person.age"
></my-component>
```