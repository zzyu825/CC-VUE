# VueRouter_路由元信息
定义路由的时候可以配置 meta 字段，用于自定义一些信息。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/foo',
      component: Foo,
      children: [
        {
          path: 'bar',
          component: Bar,
          meta: { requiresLogin: true }
        }
      ]
    }
  ]
})
```