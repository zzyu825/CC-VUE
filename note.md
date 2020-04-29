# 自定义指令

## 简介

我们可以自己写一个自定义指令去操作DOM元素，以达到代码复用的目的。注意，在 Vue 中，代码复用和抽象的主要形式是组件。然而，有的情况下，你仍然需要对普通 DOM 元素进行底层操作，这时候就会用到自定义指令。

全局注册指令：
```js
Vue.directive('focus', {/** */})
```

局部注册指令
```js
const vm = new Vue({
  el: '#app',
  directives: {
    focus: {/** */}
  }
})
```

使用：
```js 
<input v-focus></input>
```

例如，写一个自动聚焦的输入框：
```js
Vue.directive('focus', {
  // 当被绑定的元素插入到DOM时执行
  inserted: function (el) {
    el.focus();
  }
})
```
此时，在input元素上使用 v-focus 指令就可以实现自动聚焦了。

## 钩子函数
自定义指令对象提供了钩子函数供我们使用，这些钩子函数都为可选。

### bind
只调用一次，指令第一次绑定到元素时调用。在这里可以进行一次性的初始化设置。

### inserted
被绑定元素插入父节点时调用(仅保证父节点存在，但不一定已被插入文档中)。

### update
所在组件的 VNode 更新时调用，**但是可能发生在其子 VNode 更新之前**。

### componentUpdated
指令所在组件的 VNode **及其子 VNode** 全部更新后调用。

### unbind
只调用一次，指令与元素解绑时调用(被绑定的Dom元素被Vue移除)。

## 钩子函数参数
- el: 指令所绑定的元素，可以用来直接操作DOM。
- binding：对象，包含以下属性：
  - name：指令名，不包括 v- 前缀。
  - value：指令的绑定值，例如：v-my-directive="1 + 1" 中，绑定值为 2。
  - oldValue：指令绑定的前一个值，仅在 update 和 componentUpdated 钩子中可用。无论值是否改变都可用。
  - expression：字符串形式的指令表达式。例如 v-my-directive="1 + 1" 中，表达式为 "1 + 1"。
  - arg：传给指令的参数，可选。例如 v-my-directive:foo 中，参数为 "foo"。
  - modifiers：一个包含修饰符的对象。例如：v-my-directive.foo.bar 中，修饰符对象为 { foo: true, bar: true }。
- vnode：Vue 编译生成的虚拟节点。
- oldVnode：上一个虚拟节点，仅在 update 和 componentUpdated 钩子中可用。

## 练习

### 模拟 v-show
```js
// 绑定的值为false，display为none，值为true，display为""
Vue.directive('myshow', {
  bind (el, binding, vnode, oldVnode) {
    var display = binding.value ? '' : 'none';
    el.style.display = display;
  },
  update (el, binding, vnode, oldVnode) {
    var display = binding.value ? '' : 'none';
    el.style.display = display;
  }
})
```
### 模拟 v-model
```js
// 1. 通过绑定的数据，给元素设置value
// 2. 当触发input事件时，去更改数据的值
// 3. 更改数据后，同步input的value值
Vue.directive('mymodel', {
  bind (el, binding, vnode) {
    const vm = vnode.context;
    const { value, expression } = binding;
    el.value = value;

    el.oninput = function (e) {
      const inputVal = el.value;
      vm[expression] = inputVal;
    }
  },
  update (el, binding) {
    const { value } = binding;
    el.value = value;
  },
})
```

### 写一个 v-slice（截取文本框）
```js
Vue.directive('slice', {
  bind (el, binding, vnode) {
    const vm = vnode.context;
    let { value, expression, arg, modifiers } = binding;

    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }


    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);

    el.oninput = function (e) {
      let inputVal = el.value;

      if(modifiers.number) {
        inputVal = inputVal.replace(/[^0-9]/g, '');
      }

      el.value = inputVal.slice(0, arg);
      vm[expression] = inputVal.slice(0, arg);
    }
  },
  update (el, binding, vnode) {
    const vm = vnode.context;
    let { value, arg, expression, modifiers } = binding;

    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }

    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);
  },
})
```

### 动态指令参数
指令的参数可以是动态的。如：``v-directive:[arguments]="value``，``argument``参数可以根据组件实例数据进行更新。

> 重写 v-slice

```js
Vue.directive('slice', {
  bind (el, binding, vnode) {
    const vm = vnode.context;
    let { value, expression, arg, modifiers } = binding;

    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }


    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);

    el.oninput = function (e) {
      let inputVal = el.value;

      if(modifiers.number) {
        inputVal = inputVal.replace(/[^0-9]/g, '');
      }

      el.value = inputVal.slice(0, arg);
      vm[expression] = inputVal.slice(0, arg);
    }
  },
  update (el, binding, vnode) {
    const vm = vnode.context;
    let { value, arg, expression, modifiers } = binding;
    
    if(modifiers.number) {
      value = value.replace(/[^0-9]/g, '');
    }

    el.value = value.slice(0, arg);
    vm[expression] = value.slice(0, arg);

    el.oninput = function (e) {
      let inputVal = el.value;

      if(modifiers.number) {
        inputVal = inputVal.replace(/[^0-9]/g, '');
      }

      el.value = inputVal.slice(0, arg);
      vm[expression] = inputVal.slice(0, arg);
    }
  },
})
```

## 函数简写
当想在 bind 和 update 中触发相同行为，而不关心其他钩子时，可以写成函数的形式：
```js
Vue.directive('myshow', (el, binding) => {
  const { value } = binding;
  const display = value ? '' : 'none';
  el.style.display = display;
})
```
```js
Vue.directive('slice', (el, binding, vnode) => {
  const vm = vnode.context;
  let { value, expression, arg, modifiers } = binding;

  if(modifiers.number) {
    value = value.replace(/[^0-9]/g, '');
  }


  el.value = value.slice(0, arg);
  vm[expression] = value.slice(0, arg);

  el.oninput = function (e) {
    let inputVal = el.value;

    if(modifiers.number) {
      inputVal = inputVal.replace(/[^0-9]/g, '');
    }

    el.value = inputVal.slice(0, arg);
    vm[expression] = inputVal.slice(0, arg);
  }
})
```

## 对象字面量
如果自定义指令需要多个值，可以传入一个 JS 对象字面量。指令函数能够接受所有合法的 JS 表达式。

```html
<div v-demo="{ color: 'white', text: 'hello!' }"></div>
```
```js
Vue.directive('demo', function (el, binding) {
  console.log(binding.value.color) // => "white"
  console.log(binding.value.text)  // => "hello!"
})
```