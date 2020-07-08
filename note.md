# VueRouter_导航守卫
导航：路由正在发生变化。

导航守卫主要用来通过跳转或取消的方式守卫导航。

导航守卫被分成三种：全局的、单个路由独享的、组件内的。

## 全局守卫
是指路由实例上直接操作的钩子函数，触发路由就会触发这些钩子函数。

### 全局前置守卫 beforeEach
在路由跳转前触发，一般被用于登录验证。

```js
const router = new VueRouter({ ... })

router.beforeEach((to, from, next) => {
  // ...
})
```

参数说明：
- to 目标路由对象
- from 即将要离开的路由对象
- next 三个参数中最重要的参数。
  - 必须调用next()，才能继续往下执行一个钩子，否则路由跳转会停止
  - 若要中断当前的导航，可以调用next(false)。
  - 可以使用next跳转到一个不同的地址。终端当前导航，进入一个新的导航。next参数值和$routet.push一致。
  - next(error)。2.4+，如果传入的参数是一个Error实例，则导航会被终止，且该错误会被传递给router.onError() 注册过的回调。

### 全局解析守卫 beforeResolve
和boforeEach类似，路由跳转前触发。

和beforeEach的区别：在导航被确认之前，同时在所有组件内守卫和异步路由组件被解析之后，解析守卫就被调用。

```js
const router = new VueRouter({ ... })

router.beforeResolve((to, from, next) => {
  // ...
})
```

### 全局后置钩子 afterEach
和beforeEach相反，路由跳转完成后触发。
```js
const router = new VueRouter({ ... })

router.afterEach((to, from) => {
  // ...
})
```

## 路由独享守卫
是指在单个路由配置的时候也可以设置的钩子函数。

### beforeEnter
和beforeEach完全相同，如果都设置则在beforeEach之后紧随执行。

```js
const router = new VueRouter({
  routes: [
    {
      path: '/home',
      component: Home,
      beforeEnter: (to, from, next) => {
        // ...
      }
    }
  ]
})
```

## 组件内守卫
是指在组件内执行的钩子函数，类似于组件内的生命周期，相当于为配置路由的组件添加的生命周期钩子函数。

### beforeRouteEnter
路由进入之前调用。

在该守卫内访问不到组件的实例，this值为undefined。在这个钩子函数中，可以通过传一个回调给 next来访问组件实例。在导航被确认的时候执行回调，并且把组件实例作为回调方法的参数，可以在这个守卫中请求服务端获取数据，当成功获取并能进入路由时，调用next并在回调中通过 vm访问组件实例进行赋值等操作，（next中函数的调用在mounted之后：为了确保能对组件实例的完整访问）。

```js
beforeRouteEnter (to, from, next) {
    // 在渲染该组件的对应路由被 confirm 前调用
    // 不！能！获取组件实例 `this`
    // 因为当守卫执行前，组件实例还没被创建

    next( vm => {
    // 通过 `vm` 访问组件实例
  })
  },
```

### beforeRouteUpdate
在当前路由改变时，并且该组件被复用时调用，可以通过this访问实例。

何时组件会被复用？
- 动态路由间互相跳转
- 路由query变更

```js
beforeRouteUpdate (to, from, next) {
  // 在当前路由改变，但是该组件被复用时调用
  // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
  // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
  // 可以访问组件实例 `this`
},
```

### beforeRouteLeave
导航离开该组件的对应路由时调用，可以访问组件实例this。

```js
beforeRouteLeave (to, from, next) {
  // 导航离开该组件的对应路由时调用
  // 可以访问组件实例 `this`
}
```

## 完整的导航解析流程
1. 导航被触发。
2. 在失活的组件里调用离开守卫。
3. 调用全局的 beforeEach 守卫。
4. 在重用的组件里调用 beforeRouteUpdate 守卫 (2.2+)。
5. 在路由配置里调用 beforeEnter。
6. 解析异步路由组件。
7. 在被激活的组件里调用 beforeRouteEnter。
8. 调用全局的 beforeResolve 守卫 (2.5+)。
9. 导航被确认。
10. 调用全局的 afterEach 钩子。
11. 触发 DOM 更新。
12. 用创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数。