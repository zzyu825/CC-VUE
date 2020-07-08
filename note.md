# VueRouter_命名视图-路由组件传参

## 命名视图
想同时展示多个视图时，并且每个视图展示不同的组件时，可以使用命名视图。

可以在界面中拥有多个单独命名的视图，而不是只有一个单独的出口。如果 router-view 没有设置名字，那么默认为 default。

```html
<router-view class="view one"></router-view>
<router-view class="view two" name="a"></router-view>
<router-view class="view three" name="b"></router-view>
```
一个视图使用一个组件渲染，因此对于同个路由，多个视图就需要多个组件。确保正确使用 components 配置 (带上 s)：
```js
const router = new VueRouter({
  routes: [
    {
      path: '/',
      components: {
        default: Foo,
        a: Bar,
        b: Baz
      }
    }
  ]
})
```

## 路由组件传参
在组件中使用 $route 会使之与其对应路由形成高度耦合，从而使组件只能在某些特定的 URL 上使用，限制了其灵活性。

使用 props 将组件和路由解耦。

### 布尔模式
如果 props 被设置为 true，route.params 将会被设置为组件属性。

### 对象模式
如果 props 是一个对象，它会被按原样设置为组件属性。当 props 是静态的时候有用。
```js
const router = new VueRouter({
  routes: [
    { 
      path: '/promotion/from-newsletter', 
      component: Promotion, 
      props: { newsletterPopup: false } 
    }
  ]
})
```

### 函数模式
你可以创建一个函数返回 props。函数的第一个参数是 route （即$route）。
```js
const router = new VueRouter({
  routes: [
    { path: '/search', component: SearchUser, props: (route) => ({ query: route.query.q }) }
  ]
})
```