# 侦听属性
侦听属性，响应数据（data&computed）的变化，当数据变化时，会立刻执行对应函数，

## 值类型

### 函数类型

例：

```js
const vm = new Vue({
  el: '#app',
  data: {
    msg: 'hello，你好呀，我是杉杉',
  },
  watch: {
    msg () {
      console.log('msg的值改变啦~');
    }
  }
})
// 更改msg的值
vm.msg = 'hello~~~~'; // 此时会在控制台中打印出` msg的值改变啦 `
```

侦听器函数，会接收两个参数，第一个参数为newVal(被改变的数据)，第二个参数为oldVal(赋值新值之前的值)。如在上述代码中，将侦听器watch更改一下，如：
```js
watch: {
  msg (newVal,oldVal) {
    conosle.log(newVal, oldVal);
  }
}

// 更改msg的值
vm.msg = 'hello~~~~'; // 此时会在控制台中打印出`hello，你好呀，我是杉杉  hello~~~~`
```

### 字符串类型
值为方法名字，被侦听的数据改变时，会执行该方法。
```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: 'msgChange'
  },
  methods: {
    msgChange () {
      console.log('msg的值改变啦');
    }
  }
})
vm.msg = 'hello'; // 此时msgChange函数会执行，控制台中打印出 ` msg的值改变啦 `
```

### 对象类型
写成对象类型时，可以提供选项。

#### handler
必需。handler时被侦听的数据改变时执行的回调函数。
handler的值类型为函数/字符串，写成字符串时为一个方法的名字。
```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: {
      handler () {
        console.log('msg的值改变啦');
      }
    }
  }
})
vm.msg = 'hello'; // 此时回调函数会执行，控制台中打印出 ` msg的值改变啦 `
```

#### deep
在默认情况下，侦听器侦听对象只侦听引用的变化，只有在给对象赋值时它才能被监听到。所以需要使用deep选项，让其可以发现对象内部值的变化，将deep的值设置为true，那么无论该对象被嵌套的有多深，都会被侦听到。

```js
const vm = new Vue({
  el: '#app'
  data: {
    personObj: {
      name: '邓旭明',
      age: 88
    }
  },
  watch: {
    personObj: {
      handler () {
        console.log('对象的值改变啦');
      }，
      deep: true   // 开启深度侦听
    }
  }
})
vm.obj.name = '老邓头'; // 此时回调函数会执行，控制台中打印出 ` 对象的值改变啦 `
```
注意，当对象的属性较多的时候，性能开销会比较大，此时可以监听对象的某个属性，这个后面再说。

#### immediate
加上immediate选项后，回调将会在侦听开始之后立刻被调用。而不是等待侦听的数据更改后才会调用。
```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: {
      handler () {
        console.log('回调函数执行啦');
      },
      immediate: true
    }
  }
})
// 此时未更改msg的值，就会在控制台打印出来` 回调函数执行啦 `
``` 

### 数组类型
可以将多种不同值类型写在一个数组中。如：

```js
const vm = new Vue({
  el: '#app'
  data: {
    msg: '杉杉'
  },
  watch: {
    msg: [
      'msgChange',
      function () {},
      {
        handler () {},
        deep: true,
        immediate: true
      }
    ]
  }
})
```

## 键类型

### 正常对象key值
以上演示的都是正常的对象key值，这里不再赘述。

### 字符串类型key值
当key值类型为字符串时，可以实现监听对象当中的某一个属性，如：
```js
const vm = new Vue({
  el: '#app'
  data: {
    personObj: {
      name: '邓旭明',
      age: 88
    }
  },
  watch: {
    'personObj.name' () {
      console.log('对象的值改变啦');
    }
  }
})
vm.obj.name = '老邓头'; // 此时回调函数会执行，控制台中打印出 ` 对象的值改变啦 `
```

## vm.$watch
Vue实例将会在实例化时调用\$watch，遍历watch对象的每一个属性。
我们也可以利用vm.\$watch来实现侦听，用法与watch选项部分一致，略有不同。以下为使用方法。

1. 侦听某个数据的变化
```js
// 1. 三个参数，一参为被侦听的数据；二参为数据改变时执行的回调函数；三参可选，为设置的选项对象
vm.$watch(
  'msg', 
  function () {
    // 干了点事儿
  }, 
  {
    deep: Boolean, 
    immediate: Boolean
  }
)

// 2. 二个参数，一参为被侦听的数据；二参为选项对象，其中handler属性为必需，是数据改变时执行的回调函数，其他属性可选。
vm.$watch(
  'msg', 
  {
    handler () {
      // 干了点事儿
    },
    deep: Boolean, 
    immediate: Boolean
  }
)
```

2. 侦听某个对象属性的变化
```js
vm.$watch('obj.name', /**参数和上面一之*/)
```
3. 当监听的数据的在初始不确定，由多个数据得到时，此时可以将第一个参数写成函数类型
```js
vm.$watch(function () {
  // 表达式`this.a + this.b`每次得出一个不同的结果时该函数都会被调用
  // 这就像监听一个未被定义的计算属性
  return this.a + this.b;
}, /**参数和上面一致*/)
```

侦听器函数执行后，会返回一个取消侦听函数，用来停止触发回调：
```js
const unwatch = vm.$watch('msg', function () {});
unwatch(); // 执行后会取消侦听msg数据
```
使用unwatch时，需要注意的是，在带有immediate选项时，不能在第一次回调时取消侦听数据。
```js
const unwatch = vm.$watch('msg', function () {
    // 干了点儿事
    unwatch();  // 此时会报错
  },{
    immediate: true
  }
})
```
如果仍然希望在回调内部用一个取消侦听的函数，那么可以先检查该函数的可用性：
```js
var unwatch = vm.$watch('msg', function () {
    // 干了点儿事
    if(unwatch) {
      unwatch();  
      return;
    }
  },{
    immediate: true
  }
)
```

## 侦听器 vs 计算属性
1. 两者都可以观察和响应Vue实例上的数据的变动。
2. watch擅长处理的场景是：一个数据影响多个数据。计算属性擅长处理的场景是：多个数据影响一个数据。

3. 在侦听器中可以执行异步，但是在计算属性中不可以，例：

使用侦听器：
```js
var vm = new Vue({
  el: '#app',
  data: {
    question: '',
  },
  watch: {
    question () {
      setTimeout(() => {
        alert(this.question);
      }, 1000)
    }
  }
})
```