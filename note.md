# VueRouter_编程式的导航
通过在 Vue 根实例的 router 配置传入 router 实例，\$router、 \$route 两个属性会被注入到每个子组件。

## $router
路由实例对象。

除了使用  ``<router-link>`` 创建 a 标签来定义导航链接，我们还可以借助 router 的实例
方法，通过编写代码来实现。

### $router.push
想要导航到不同的 URL，则使用 router.push 方法。这个方法会向 history 栈添加一个新的记录，所以，当用户点击浏览器后退按钮时，则回到之前的 URL。

当你点击 ``<router-link>`` 时，这个方法会在内部调用，所以说，点击 ``<router-link :to="...">`` 等同于调用 \$router.push(...)。

声明式 | 编程式
:-: | :-:
``<router-link :to="...">`` | this.$router.push(...) 

该方法的参数可以是一个字符串路径，或者一个描述地址的对象。例如：
```js
// 字符串
this.$router.push('home')

// 对象
this.$router.push({ path: 'home' })

// 命名的路由
this.$router.push({ name: 'user' })
```

### $router.replace
跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是替换掉当前的 history 记录。

声明式 | 编程式
:-: | :-:
``<router-link :to="..." replace>`` | this.$router.replace(...) 

### $router.go(n)
这个方法的参数是一个整数，意思是在 history 记录中向前或者后退多少步，类似 window.history.go(n)。

```js
// 在浏览器记录中前进一步，等同于 history.forward()
this.$router.go(1)

// 后退一步记录，等同于 history.back()
this.$router.go(-1)

// 前进 3 步记录
this.$router.go(3)

// 如果 history 记录不够用，那就默默地失败呗
this.$router.go(-100)
this.$router.go(100)
```

## $route
只读，路由信息对象。

### $route.path
字符串，对应当前路由的路径，总是解析为绝对路径，如 "/foo/bar"。

### $route.params
一个 key/value 对象，包含了动态片段和全匹配片段，如果没有路由参数，就是一个空对象。

### $route.query
一个 key/value 对象，表示 URL 查询参数。例如，对于路径 /foo?user=1，则有 \$route.query.user == 1，如果没有查询参数，则是个空对象。

### $route.hash
路由的 hash 值 (带 #) ，如果没有 hash 值，则为空字符串。

### $route.fullPath
完成解析后的 URL，包含查询参数和 hash 的完整路径。

### $route.matched
一个数组，包含当前路由的所有嵌套路径片段的路由记录 。路由记录就是 routes 配置数组中的对象副本 (还有在 children 数组)。
    ```js
      const router = new VueRouter({
        routes: [
          // 下面的对象就是路由记录
          {
            path: '/foo',
            component: Foo,
            children: [
              // 这也是个路由记录
              { path: 'bar', component: Bar }
            ]
          }
        ]
      })
    ```

    当 URL 为 /foo/bar，\$route.matched 将会是一个包含从上到下的所有对象 (副本)。

### $route.name
当前路由的名称，如果有的话

### $route.redirectedFrom
如果存在重定向，即为重定向来源的路由的名字。