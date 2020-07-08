# VueRouter_命名路由-嵌套路由-重定向-别名

## 命名路由
可以通过一个名称标识一个路由，这样在某些时候会显得更方便一些，特别是在链接一个路由，或者是执行一些跳转时，可以在创建Router实例时，在routes配置中给某个路由设置名称：
```js
routes = [
  {
    path: '/activity/personal',
    name: 'personal',
    component: Personal,
  }
];
```
要链接到一个命名路由，可以给 ``router-link`` 的 to 属性传一个对象：
```html
<router-link :to="{ name: 'personal' }">个人中心</router-link>
```

## 嵌套路由
一个被 router-view 渲染的组件想要包含自己的嵌套 router-view 时，可以使用嵌套路由，如：
```js
{
  path: '/activity',
  component: () => import('./views/Activity'),
  children: [
    {
      path: '/activity/academic',
      name: 'academic',
      component: () => import('./views/Academic'),
    },
    {
      path: '/activity/personal',
      name: 'personal',
      component: () => import('./views/Personal'),
    },
    {
      path: '/activity/download',
      name: 'download',
      component: () => import('./views/Download'),
    }
  ],
}
```
经过这样的设置，在 Activity 组件中就可以使用 router-view 了。
子路由的path可以简写：
```js
path: 'personal'
```
这样会自动将父路由的路径，拼接在子路由前，最终结果为：/activity/personal。

当访问 /activity 下的其他路径时，并不会渲染出来任何东西，如果想要渲染点什么，可以提供一个空路由：
```js
{
  path: '/activity',
  children: [
    {
      path: '',
      component: () => import('./views/Academic'),
    },
  ],
}
```

## 重定向
重定向也是通过 routes 配置来完成，下面例子是从 /a 重定向到 /b
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: '/b' }
  ]
})
```
重定向的目标也可以是一个命名的路由：
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: { name: 'foo' }}
  ]
})
```
甚至是一个方法，动态返回重定向目标：
```js
const router = new VueRouter({
  routes: [
    { path: '/a', redirect: to => {
      // 方法接收 目标路由 作为参数
      // return 重定向的 字符串路径/路径对象
    }}
  ]
})
```

## 别名
“重定向”的意思是，当用户访问 /a时，URL 将会被替换成 /b，然后匹配路由为 /b，那么“别名”又是什么呢？

/a 的别名是 /b，意味着，当用户访问 /b 时，URL 会保持为 /b，但是路由匹配则为 /a，就像用户访问 /a 一样。

上面对应的路由配置为：

```js
const router = new VueRouter({
  routes: [
    { path: '/a', component: A, alias: '/b' }
  ]
})
```