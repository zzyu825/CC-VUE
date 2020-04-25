# Vue生命周期
每个 Vue 实例在被创建时都要经过一系列的初始化过程，例如，需要设置数据监听、编译模板、将实例挂载到 DOM 并在数据变化时更新 DOM 等。同时在这个过程中也会运行一些叫做生命周期钩子的函数，这给了用户在不同阶段添加自己的代码的机会。

## 生命周期图示
![](https://developer.duyiedu.com/myVue/lifecycle1.png) 

## 生命周期钩子
所有的生命周期钩子自动绑定 this 上下文到实例中，因此你可以访问数据，对属性和方法进行运算

![](https://developer.duyiedu.com/myVue/lifecycle2.png) 

### beforeCreate
在实例初始化之后，数据观测 (data observer) 和 event/watcher 事件配置之前被调用。

```html
<div id="app">
  <div @click="handleClick">点击事件</div>
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
  },
  beforeCreate () {
    console.log(this.msg);   // undefined
    console.log(this.handleClick);  // undefined
    console.log('-----beforeCreate-----'); 
  },
  methods: {
    handleClick () {
      console.log(handleClick);
    }
  },
  watch: {
    msg: {
      handler () {
        console.log('侦听msg的值'); 
      },
      immediate: true,
    }
  }
})
```

打印顺序：
```js
undefined
undefined
-----beforeCreate-----
侦听msg的值
```

### created
在实例创建完成后被立即调用。

在这一步，实例已完成以下的配置：数据观测 (data observer)，属性和方法的运算，watch/event 事件回调。

如果要在第一时间调用methods中的方法，或者操作data中的数据，可在此钩子中进行操作。
需要注意的是，执行此钩子时，挂载阶段还未开始，$el 属性目前不可见。

此时，可以进行数据请求，将请求回来的值赋值给data中的数据。

```html
<div id="app">
  <div @click="handleClick">点击事件</div>
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
  },
  created () {
    console.log(this.msg);  // hello world
    console.log(this.handleClick);  // function () {...}
    console.log(this.$el);  // undefined
    console.log('----------created-------');
  },
  methods: {
    handleClick () {
      console.log(handleClick);
    }
  },
  watch: {
    msg: {
      handler () {
        console.log('侦听msg的值'); 
      },
      immediate: true,
    }
  }
})
```

打印顺序：
```js
侦听msg的值
hellow world
ƒ handleClick () { console.log(handleClick); }
undefined
----------created-------
```

### beforeMount
在挂载开始之前被调用，此时模板已经编译完成，只是未将生成的模板替换el对应的元素。

在此钩子函数中，可以获取到模板最初始的状态。

此时，可以拿到vm.$el，只不过为旧模板

```js
const vm = new Vue({
  el: '#app',
  beforeMount () {
    console.log(this.$el);
  }
})
```

### mounted
el 被新创建的 vm.$el 替换，并挂载到实例上去之后调用该钩子。

在该钩子函数中的vm.$el为新模板。

执行完该钩子函数后，代表实例已经被完全创建好。

如果要在第一时间，操作页面上的dom节点时，可以在此钩子函数中操作

```js
const vm = new Vue({
  el: '#app',
  mounted () {
    console.log(this.$el);
  }
})
```

### beforeUpdate
数据更新时调用，发生在虚拟 DOM 打补丁之前。此时数据已经更新，但是DOM还未更新

```html
<div id="app">
  {{ msg }}
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
  },
  beforeUpdate () {
    console.log(this.msg);
    console.log(this.$el);
  },
  methods: {
    handleClick () {
      console.log('handleClick');
    }
  }
})
this.msg = 'xxx';
```
### updated
数据更改导致DOM重新渲染后，会执行该钩子函数。

此时数据和dom同步。

### beforeDestroy
实例销毁之前调用。在这一步，实例仍然完全可用。

可以在该钩子函数中，清除定时器。
```html
<div id="app">
  {{ msg }}
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hellow world',
    timer: 0,
  },
  created () {
    this.timer = setInterval(() => {
      console.log('xxx');
    }, 500)
  },
  beforeDestroy () {
    clearInterval(this.timer);
  }
})
```

### destroyed
Vue 实例销毁后调用。调用后，Vue 实例指示的所有东西都会解绑定，所有的事件监听器会被移除。