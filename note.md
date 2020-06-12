# vue的响应式-1
- 数据变化，页面就会重新渲染

- 怎么更改数据？so easy
``` html
  <div id="app">
    {{ mrDeng }}
  </div>
```
``` js
  const vm = new Vue({
    el: '#app',
    data: {
      mrDeng: '老王：风姿绰约、花枝招展'
    }
  });
  vm.mrDeng = '手如柔荑、肤如凝脂'; // 见证奇迹的时刻，页面变化啦
```
- 问：为什么data会直接出现在vm实例对象中咧？
> 答：当创建vue实例时，vue会将data中的成员代理给vue实例，目的是为了实现响应式，监控数据变化，执行某个监听函数（怎么实现的？想一想，提示：Object.defineProperty，试着实现一下）
> vue 2.x vue 3.0(alpha beta release)

- 问：实例中除了data数据外，其他东西是啥子？
> 为了防止名称冲突。因为会将data中数据代理给vue，假如说我们自己写的data名称和vue中自带的属性冲突了，那么就会覆盖vue内部的属性，所以vue会把自己内部的属性成员名称前加上\$或\_，如果加上的是\$，代表是我们可以使用的，如果加上的是\_，是vue自己内部使用的方法或属性，我们不需要调用

- 更改的数据必须是声明的数据，否则不能重新渲染页面，因为他监听不到，如：
``` html
  <!-- 即使更改了数据，也不会重新渲染页面 -->
  <div id="app">
    {{ mrWang.wife }} 
  </div>
```
```js
  const vm = new Vue({
    el: '#app',
    data: {
      mrWang: {
        name: '老王', 
        age: 80, 
        height: '140cm', 
        weight: '100kg'
      }
    }
  })

  vm.mrWang.wife = 'liu';
```

- 更改的数据必须已渲染过的数据，否则从性能角度考虑，不会重新渲染页面，如：
``` html
  <!-- 即使更改了数据，也不会重新渲染页面 -->
  <div id="app">
    {{ mrWang.wife }} 
  </div>
```
```js
  const vm = new Vue({
    el: '#app',
    data: {
      msg: '老王：风姿绰约、花枝招展',
      mrWang: {
        name: '老王', 
        age: 80, 
        height: '140cm', 
        weight: '100kg'
      }
    }
  })

  vm.mrWang.wife = 'liu';
  vm.msg = '老王：手如柔荑、肤如凝脂';
```

- 更改数据后，页面会立刻重新渲染吗？
> vue更新DOM的操作是异步执行的，只要侦听到数据变化，将开启一个异步队列，如果一个数据被多次变更，那么只会执行队列中的最新(后)一次，这样可以避免不必要的计算和DOM操作。

> 同步执行栈执行完毕后，会执行异步队列

```html
<div id="app">{{ msg }}</div>
```
``` js
const vm = new Vue({
  el: '#app',
  data: {
    msg: '老王'
  }
})
vm.msg = '老王超帅的';
console.log(vm.msg); // 老王超帅的，此时数据已更改
console.log(vm.$el.innerHTML); // 老王。此时页面还未重新渲染
```
## vm.$el
- 值为被Vue控制的元素（或者说，Vue挂载的元素）

## vm.$nextTick & Vue.nextTick
- 如何在更改数据后，拿到渲染后的页面上的值？
> 答：利用vm.$nextTick或Vue.nextTick，在页面重新渲染，DOM更新后，会立刻执行vm.$nextTick
> 在Vue生命周期的created()钩子函数进行的DOM操作一定要放在Vue.nextTick()的回调函数中
```html
<div id="app">{{ msg }}</div>
```
``` js
const vm = new Vue({
  el: '#app',
  data: {
    msg: '老王'
  }
})
vm.msg = '老王超帅的';
console.log(vm.msg); // 老王超帅的，此时数据已更改
// 1. 使用vm.$nextTick
vm.$nextTick(() => {
  console.log(vm.$el.innerHTML); // 老王超帅的
})
// 2. 使用Vue.nextTick
Vue.nextTick(() => {
  console.log(vm.$el.innerHTML); // 老王超帅的
})
```
- vm.nextTick和Vue.nextTick还可以作为Promise使用
```html
<div id="app">{{ msg }}</div>
```
``` js
const vm = new Vue({
  el: '#app',
  data: {
    msg: '老王'
  }
})
vm.msg = '老王超帅的';
// 1. 使用vm.$nextTick
vm.$nextTick().then(() => {
  console.log(vm.$el.innerHTML); // 老王超帅的
})
// 2. 使用Vue.nextTick
Vue.nextTick().then(() => {
  console.log(vm.$el.innerHTML); // 老王超帅的
})
```

- vm.$nextTick 和 Vue.nextTick的区别？
> Vue.nextTick内部函数的this指向window
```js
  Vue.nextTick(function () {
    console.log(this); // window
  })
```
> vm.\$nextTick内部函数的this指向Vue实例对象
```js
  vm.$nextTick(function () {
    console.log(this); // vm实例
  })
```

- 好奇nextTick是怎么实现的吗？
- 异步任务分为宏任务（macro）和微任务（micro）
- 宏任务比较慢（如setTimeout等），微任务比较快（如Promise.then()等）
- 微任务在前，宏任务在后（eventloop，事件循环）
  ```js
    // 控制台打印顺序：promise > timeout
    setTimeout(() => {
      console.log('timeout');
    }, 0)  
    Promise.resolve().then(() => {
      console.log('promise');
    })
  ```
- 在nextTick的实现源码中，2.4 之前的版本几乎都是基于 micro task 实现的
- 2.5 默认走 micro task，对于一些 DOM 交互事件，如 v-on 绑定的事件回调函数的处理，会强制走 macro task
- 2.6 又优先使用 microtask
- vue的降级策略
  ```js
    if(typeof Promise !== 'undefined') {
      // 微任务
      // 首先看一下浏览器中有没有promise
      // 因为IE浏览器中不能执行Promise
      const p = Promise.resolve();

    } else if(typeof MutationObserver !== 'undefined') {
      // 微任务
      // 突变观察 - 2.4 + 2.6
      // 监听节点的属性、文本内容、子节点，就会执行回调
      // vue的具体做法是：创建一个假节点，然后让这个假节点稍微改动一下，就会执行对应的函数
    } else if(typeof setImmediate !== 'undefined') {
      // 宏任务
      // 只有IE和node支持
    } 
    // else if (typeof MessageChannel !== 'undefined') {
      // 宏任务 2.5 
      // 消息通道 
    // } 
    else {
      // 宏任务
      // 如果上面都不能执行，那么则会调用setTimeout
    }
  ```