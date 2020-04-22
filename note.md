# 计算属性
有些时候，我们在模板中放入了过多的逻辑，从而导致模板过重，且难以维护。例如：
```html
<div id="app">
  {{ message.split('').reverse().join('') }}
</div>
```
碰到这样的情况，我们必须看一段时间才能意识到，这里是想要显示变量message的翻转字符串，而且，一旦我们想要在模板中多次使用翻转字符串时，会更加麻烦。
所以，当我们处理复杂逻辑时，都应该使用计算属性。

## 基础用法

计算属性是Vue配置对象中的属性，使用方式如下：
```html
<div id="app">
  <!-- 计算属性的值可以像data数据一样，直接被使用 -->
  {{ someComputed }}
</div>
```
```js
const vm = new Vue({
  el: '#app',
  computed: {
    // 返回的值，就是计算属性的值
    someComputed () {
      return 'some values'
    }
  }
})
```

例如，我们想要获取到一串字符串的翻转字符串，我们可以利用计算属性来做：
```html
<div id="app">
  <p>原始字符串: "{{ msg }}"</p>
  <p>翻转字符处啊: "{{ reversedMsg }}"</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello'
  },
  computed: {
    reversedMsg: function () {
      return this.msg.split('').reverse().join('');
    }
  }
})
```
我们可以看到，reversedMsg的值取决于msg的值，所以，当我们更改msg的值是，reversedMsg的值也会随之更改。

## 计算属性 vs 方法
其实，我们上述的功能，利用方法也可以实现，如：
```html
<div id="app">
  <p>原始字符串: "{{ msg }}"</p>
  <p>翻转字符串: "{{ reversedMsg() }}"</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello'
  },
  methods: {
    reversedMsg: function () {
      return this.msg.split('').reverse().join('');
    }
  }
})
```
虽然在表达式中调用方法也可以实现同样的效果，但是使用``计算属性``和使用``方法``有着本质的区别。
当使用方法时，每一次页面重新渲染，对应的方法都会重新执行一次，如：
```html
<div id="app">
  <p>{{ name }}</p>
  <p>{{ reversedMsg() }}</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello',
    name: 'shanshan'
  },
  methods: {
    reversedMsg: function () {
      console.log('方法执行啦');
      return this.msg.split('').reverse().join('');
    }
  }
})
vm.name = 'duyi';  
```
在上面的例子中我们可以看到，一旦更改name的值，页面会重新渲染，此刻控制台中打印出`方法执行啦`这串字符串，代表着reversedMsg这个函数执行了，但是我们并不需要该方法执行，因为改动的数据和这个函数没有任何关系，如果这个函数内的逻辑很复杂，那么对于性能来讲，也是一种消耗。

但是利用计算属性做，就不会有这样的现象出现，如：
```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello',
    name: 'shanshan'
  },
  computed: {
    reversedMsg: function () {
      console.log('计算执行啦');
      return this.msg.split('').reverse().join('');
    }
  }
})
vm.name = 'duyi';  
```
此时可以看到，当给数据name重新赋值时，计算属性并没有执行。
所以，计算属性和方法的最本质的区别，是：<span style="font-weight: bold;">计算属性是基于响应式依赖进行缓存的</span>，计算属性的值一直存于缓存中，只要它依赖的data数据不改变，每次访问计算属性，都会立刻返回缓存的结果，而不是再次执行函数。而方法则是每次触发重新渲染，调用方法将总会再次执行函数。

> 那么，为什么需要缓存呢？

假如说，我们有一个计算属性A，它需要遍历一个巨大的数组并且做巨大的计算。然后我们需要使用到这个计算属性A，如果没有缓存，我们就会再次执行A的函数，这样性能开销就变得很大了。

## 深入计算属性
计算属性除了写成一个函数之外，还可以写成一个对象，对象内有两个属性，getter&setter，这两个属性皆为函数，写法如下：
```js
const vm = new Vue({
  el: '#app',
  computed: {
    fullName: {
      get () {
        // 一些代码
      },
      set () {
        // 一些代码
      }
    }
  }
})
```

### getter 读取
在前面，我们直接将计算属性写成了一个函数，这个函数即为getter函数。也就是说，计算属性默认只有getter。
getter的this，被自动绑定为Vue实例。

> 何时执行？

当我们去获取某一个计算属性时，就会执行get函数。

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello'
  },
  computed: {
    reversedMsg: {
      getter () {
        return this.msg.split('').reverse().join('');
      }
    }
  }
})
```

### setter 设置
可选，set函数在给计算属性重新赋值时会执行。
参数：为被重新设置的值。
setter的this，被自动绑定为Vue实例。


```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'Hello',
    firstStr: ''
  },
  computed: {
    reversedMsg: {
      get () {
        return this.msg.split('').reverse().join('');
      },
      set (newVal) {
        this.firstStr = newVal[0];
      }
    }
  }
})
```
要注意，即使给计算属性赋了值，计算属性也不会改变，在重复一遍，只有当依赖的响应式属性变化了，计算属性才会重新计算。