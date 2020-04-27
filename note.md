# 组件_动态组件

## 基本使用
当我们在一个多标签的界面中，在不同组件之间进行动态切换是非常有用的。
```html
<div id="app">
  <button 
    v-for="page in pages"
    @click="pageCmp = page.cmp"
    :key="page.id"
  >{{ page.name }}</button>
  <component :is="pageCmp"></component>
</div>
```
```js
Vue.component('base-post', {
  data () {
    return {
      postCmp: '',
      posts: [
        { title: "标题1", content: { template: `<div>内容1</div>`}, id: 11}, 
        { title: "标题2", content: { template: `<div>内容2</div>`}, id: 12}, 
        { title: "标题3", content: { template: `<div>内容3</div>`}, id: 13}, 
      ],
    }
  },
  mounted () {
    this.postCmp = this.posts[0].content;
  },
  template: `
    <div>
      <button
        v-for="post in posts"
        @click="postCmp = post.content"
        :key="post.id"
      >{{ post.title }}</button>
      <component :is="postCmp"></component>
    </div>
  `
})
Vue.component('base-more', {
  template: `<div>更多内容</div>`
})

const vm = new Vue({
  el: '#app',
  data: {
    pages: [
      { name: '博客', cmp: 'base-post', id: 0},
      { name: '更多', cmp: 'base-more', id: 1}
    ],
    pageCmp: 'base-post'
  },
})
```
通过上面方法，我们可以实现组件间的切换，能够注意到的是：每一次切换标签时，都会创建一个新的组件实例，重新创建动态组件在更多情况下是非常有用的，但是在这个案例中，我们会更希望哪些标签的组件实例能够在它们第一次被创建的时候缓存下来。为了解决这个问题，我们可以用一个``<keep-alive>``元素将动态组件包裹起来。如：
```html
<!-- 失活的组件将会被缓存！-->
<keep-alive>
  <component v-bind:is="pageCmp"></component>
</keep-alive>
```
注意：``<keep-alive>`` 要求被切换到的组件都有自己的名字，不论是通过组件的 name 选项还是局部/全局注册。

## keep-alive
``<keep-alive>`` 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。``<keep-alive>`` 是一个抽象组件：它自身不会渲染一个 DOM 元素，也不会出现在父组件链中。
当组件在 ``<keep-alive>`` 内被切换，它的 activated 和 deactivated 这两个生命周期钩子函数将会被对应执行。

## activated & deactivated
activated：keep-alive 组件激活时调用。
deactivated: keep-alive 组件停用时调用。