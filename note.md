# VueRouter_基础

## 什么是路由？
路由是根据不同的url地址展现不同的内容或页面。
早期的路由都是后端直接根据url来重载页面实现的，即后端控制路由。
后来页面越来越复杂，服务器压力越来越大，随着ajax（异步刷新技术）的出现，页面的实现非重载就能刷新数据，让前端也可以控制url自行管理，前端路由由此而生。

## 什么时候使用前端路由？
前端路由更多用在单页应用上，也就是SPA(Single Page Web Application)，在单页面应用中，大部分页面结果不变，只改变部分内容的使用。

## 安装路由
> 安装：``npm install vue-router``。

## 使用路由
### JavaScript
1. 引入路由
```js
import VueRouter from 'vue-router';
```

2. 使用路由
```js
Vue.use(VueRouter);
```

3. 定义路由组件
```js
// 可以从其他文件 import 进来
const Foo = { template: '<div>foo</div>' }
const Bar = { template: '<div>bar</div>' }
```

4. 定义路由
```js
// 每个路由应该映射一个组件
const routes = [
  { path: '/foo', component: Foo },
  { path: '/bar', component: Bar }
]
```

5. 创建 router 实例，然后传 `routes` 配置
```js
const router = new VueRouter({
  routes 
})
```

6. 创建和挂载根实例
```js
const app = new Vue({
  router
}).$mount('#app')
```

### html
```html
<div id="app">
  <h1>Hello App!</h1>
  <p>
    <!-- 使用 router-link 组件来导航. -->
    <!-- 通过传入 `to` 属性指定链接. -->
    <!-- <router-link> 默认会被渲染成一个 `<a>` 标签 -->
    <router-link to="/foo">Go to Foo</router-link>
    <router-link to="/bar">Go to Bar</router-link>
  </p>
  <!-- 路由出口 -->
  <!-- 路由匹配到的组件将渲染在这里 -->
  <router-view></router-view>
</div>
```




## router-link class
- router-link-exact-active 当前展示路径完全匹配组件to属性的值
- router-link-active  当前展示路径包含to属性的值

> 更改class名
```js
VueRouter({
  linkActiveClass: 'link-active',
  linkExactActiveClass: 'link-exact-active',
})
```

## hash模式
vue-router 默认 hash 模式 —— 使用 URL 的 hash 来模拟一个完整的 URL，于是当 URL 改变时，页面不会重新加载。

## history 模式
如果不想要很丑的 hash，我们可以用路由的 history 模式，这种模式充分利用 history.pushState API 来完成 URL 跳转而无须重新加载页面。
在路由配置中设置：
```js
VueRouter({
  mode: 'history',
})
```
当你使用 history 模式时，URL 就像正常的 url，例如 http://yoursite.com/user/id, 也好看！

不过这种模式要玩好，还需要后台配置支持。因为我们的应用是个单页客户端应用，如果后台没有正确的配置，当用户在浏览器直接访问 http://oursite.com/user/id 就会返回 404，这就不好看了。

所以呢，你要在服务端增加一个覆盖所有情况的候选资源：如果 URL 匹配不到任何静态资源，则应该返回同一个 index.html 页面，这个页面就是你 app 依赖的页面。