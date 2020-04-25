# template 选项

> 关于el

提供一个在页面上已存在的 DOM 元素作为 Vue 实例的挂载目标。可以是 CSS 选择器，也可以是一个 HTML 元素 实例。

如果在实例化时存在这个选项，实例将立即进入编译过程，否则，需要显式调用 vm.$mount() 手动开启编译。

> template

一个字符串模板作为 Vue 实例的标识使用。模板将会 替换 挂载的元素，挂载元素的内容都将被忽略。
```html
<div id="app"></div>
```
```js
const vm = new Vue({
  el: '#app',
  template: `
    <div id="ceshi">xxx</div>
  `,
})
```

> Vue初始化到挂载的流程

![](https://developer.duyiedu.com/myVue/template.png)