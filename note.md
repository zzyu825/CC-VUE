# 组件_处理边界情况
接下来我们要学习的都是和处理边界情况有关的功能，即一些需要对 Vue 的规则做一些小调整的特殊情况。需要注意的是，这些功能都是有劣势或危险场景的。

## 访问元素 & 组件
在绝大多数情况下，我们最好不要触达另一个组件实例内部或手动操作 DOM 元素。不过也确实在一些情况下做这些事情是合适的。

### 访问根实例
在每个子组件中，可以通过 $root 访问根实例。
```js
// Vue 根实例
new Vue({
  data: {
    foo: 1
  },
  computed: {
    bar () { /* ... */ }
  },
  methods: {
    baz () { /* ... */ }
  }
})
```

所有的子组件都可以将这个实例作为一个全局 store 来访问或使用。
```js
// 获取根组件的数据
this.$root.foo

// 写入根组件的数据
this.$root.foo = 2

// 访问根组件的计算属性
this.$root.bar

// 调用根组件的方法
this.$root.baz()
```
在demo或在有少量组件的小型应用中使用是非常方便的。但是在大型应用里使用就会很复杂了。所以，我们还是要用Vuex（后面会学）来管理应用的状态。

### 访问父级组件实例

在子组件中，可以通过 $parent 访问 父组件实例。这可以替代将数据以prop的方式传入子组件的方式。

如：
```html
<cmp-parent>
  <cmp-a></cmp-a>
</cmp-parent>
```
若 cmp-parent 需要共享一个属性 share，它的所有子元素都需要访问 share 属性，在这种情况下 cmp-a 可以通过 this.$parent.share的方式访问share。

但是，通过这种模式构建出来的组件内部仍然容易出现问题。比如，我们在cmp-a 中嵌套一个一个子组件 cmp-b，如：
```html
<cmp-parent>
  <cmp-a>
    <cmp-b></cmp-b>
  </cmp-a>
</cmp-parent>
```
那么，在cmp-b组件中去访问share时，需要先查看一下，其父组件中是否存在share，如果不存在，则在向上一级查找，落实到代码上为：
```js
var share = this.$parent.share || this.$parent.$parent.share;
```

这样做，很快组件就会失控：触达父级组件会使应用更难调试和理解，尤其是当变更父组件数据时，过一段时间后，很难找出变更是从哪里发起的。

碰到上述情况，可以使用依赖注入解决。

### 依赖注入
在上面的例子中，利用 $parent 属性，没有办法很好的扩展到更深层级的嵌套组件上。这也是依赖注入的用武之地，它用到了两个新的实例选项：provide 和 inject。

provide 选项允许我们指定想要提供给后代组件的数据/方法，例如:

```js
Vue.component('cmp-parent', {
  provide () {
    return {
      share: this.share,
    }
  },
  data () {
    return {
      share: 'share',
    }
  },
  template: `<div>cmp-parent</div>`
})
```

然后再任何后代组件中，我们都可以使用 inject 选项来接受指定想要添加在实例上的属性。

```js
Vue.component('cmp-a', {
  inject: ['share'],
  template: `<div>cmp-a</div>`
})
```

相比 $parent 来说，这个用法可以让我们在任意后代组件中访问share，而不需要暴露整个 cmp-parent 实例。这允许我们更好的持续研发该组件，而不需要担心我们可能会改变/移除一些子组件依赖的东西。同时这些组件之间的接口是始终明确定义的，就和 props 一样。

实际上，你可以把依赖注入看作一部分“大范围有效的 prop”，除了：
- 祖先组件不需要知道哪些后代组件使用它提供的属性
- 后代组件不需要知道被注入的属性来自哪里

然而，依赖注入还是有负面影响的。它将你应用程序中的组件与它们当前的组织方式耦合起来，使重构变得更加困难。同时所提供的属性是非响应式的。这是出于设计的考虑，因为使用它们来创建一个中心化规模化的数据跟使用 $root做这件事都是不够好的。如果你想要共享的这个属性是你的应用特有的，而不是通用化的，或者如果你想在祖先组件中更新所提供的数据，那么这意味着你可能需要换用一个像 Vuex 这样真正的状态管理方案了。

### 访问子组件实例或子元素
尽管存在prop和事件，但是有时候我们仍可能需要在JS里直接访问一个子组件，那么此时，我们可以通过 ref 特性为子组件赋予一个ID引用：

```html
<my-cmp ref="cmp"></my-cmp>
```

这样就可以通过this.$refs.cmp 来访问``<my-cmp>``实例。
ref 也可以 对指定DOM元素进行访问，如:
```html
<input ref="input" />
```
那么，我们可以通过 this.$refs.input 来访问到该DOM元素。

当ref 和 v-for 一起使用时，得到的引用将会是一个包含了对应数据源的这些子组件的数组。

注意：\$refs 只会在组件渲染完成之后生效，并且它们不是响应式的。应该避免在模板或计算属性中访问 \$refs。

## 程序化的事件侦听器
除了 v-on 和 $emit 外， Vue 实例在其事件接口中还提供了其它的方法。我们可以：

- 通过 $on(eventName, eventHandler) 侦听一个事件
- 通过 $once(eventName, eventHandler) 一次性侦听一个事件
- 通过 $off(eventName, eventHandler) 停止侦听一个事件

这几个方法一般不会被用到，但是，当需要在一个组件实例上手动侦听事件时，他们是可以派的上用场的。

例如，有时我们会在组件中集成第三方库：
```js
Vue.component('my-cmp', {
  // 一次性将这个日期选择器附加到一个输入框上
  // 它会被挂载到 DOM 上。
  mounted () {
    // Pikaday 是一个第三方日期选择器的库
    this.picker = new Pikaday({
      field: this.$refs.input,
      format: 'YYYY-MM-DD',
    })
  },
  // 在组件被销毁之前，
  // 也销毁这个日期选择器。
  beforeDestroy () {
    this.picker.destroy();
  },
  template: `
    <div>
      <input type="text" ref="input" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `,
})
```

使用上面的方法，有两个潜在的问题：
- 它需要在这个组件实例中保存这个 picker，如果可以的话最好只有生命周期钩子可以访问到它。这并不算严重的问题，但是它可以被视为杂物。
- 我们的建立代码独立于我们的清理代码，这使得我们比较难于程序化地清理我们建立的所有东西。

所有，我们可以通过程序化的侦听器解决这两个问题：
```js
Vue.component('my-cmp', {
  mounted () {
    var picker = new Pikaday({
      field: this.$refs.input,
      format: 'YYYY-MM-DD',
    })
    this.$once('hook:beforeDestroy', () => {
      picker.destroy();
    })
  },
  template: `
    <div>
      <input type="text" ref="input" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `
})
```
使用了这个策略，我们还可以让多个输入框元素使用不同的pikaday：
```js
Vue.component('my-cmp', {
  mounted () {
    this.datePicker('inputA');
    this.datePicker('inputB');
  },
  methods: {
    datePicker (refName) {
      var picker = new Pikaday({
        field: this.$refs[refName],
        format: 'YYYY-MM-DD',
      })
      this.$once('hook:beforeDestroy', () => {
        picker.destroy();
      })
    },
  },
  template: `
    <div>
      <input type="text" ref="inputA" />
      <input type="text" ref="inputB" />
      <button @click="$destroy()">销毁组件</button>
    </div>
  `
})
```
注意，即便如此，如果你发现自己不得不在单个组件里做很多建立和清理的工作，最好的方式通常还是创建更多的模块化组件，在这个例子中，我们推荐创建一个可复用的 ``<input-datepicker>`` 组件。

## 循环引用

### 递归组件
组件是可以在它们自己的模板中调用自身的，不过它们只能通过name选项来做这件事：
```js
name: 'my-cmp'
```
不过当使用 Vue.component 全局注册一个组件时，全局的ID会自动设置为该组件的 name 选项。
```js
Vue.component('my-cmp', { /** */});
```
稍有不慎，递归组件就可能导致无限循环：
```js
name: 'my-cmp',
template: `<div><my-cmp /></div>`
```
类似上述的组件将会导致“max stack size exceeded”错误，所以要确保递归调用是条件性的 (例如使用一个最终会得到 false 的 v-if)。

### 组件之间的循环引用
有时，在去构建一些组件时，会出现组件互为对方的后代/祖先:
```js
Vue.component('cmp-a', {
  template: `
    <div>
      <cmp-b></cmp-b>
    </div>
  `
})
```
```js
Vue.component('cmp-b', {
  template: `
    <div>
      <cmp-a></cmp-a>
    </div>
  `
})
```
此时，我们使用的是全局注册组件，并不会出现悖论，但是如果使用的为局部组件就会出现悖论。

但是即使用了全局注册组件，在使用webpack去导入组件时，也会出现一个错误：Failed to mount component: template or render function not defined。

模块系统发现它需要 A，但是首先 A 依赖 B，但是 B 又依赖 A，但是 A 又依赖 B，如此往复。这变成了一个循环，不知道如何不经过其中一个组件而完全解析出另一个组件。为了解决这个问题，我们需要给模块系统一个点：“A 反正是需要 B 的，但是我们不需要先解析 B。”

```js
beforeCreate () {
  this.$options.components.CmpB = require('./tree-folder-contents.vue').default;
}
```
或者，在本地注册组件的时候，你可以使用 webpack 的异步 import：
```js
components: {
  CmpB: () => import('./tree-folder-contents.vue')
}
```

## 模板定义的替代品

### 内联模板
在使用组件时，写上特殊的特性：inline-template，就可以直接将里面的内容作为模板而不是被分发的内容（插槽）。

```html
<my-cmp inline-template>
  <div>
    <p>These are compiled as the component's own template.</p>
    <p>Not parent's transclusion content.</p>
  </div>
</my-cmp>
```

不过，inline-template 会让模板的作用域变得更加难以理解。所以作为最佳实践，请在组件内优先选择 template 选项或 .vue 文件里的一个 ``<template>`` 元素来定义模板。

### X-Template
另一个定义模板的方式是在一个 ``<script>`` 元素中，并为其带上 text/x-template 的类型，然后通过一个 id 将模板引用过去。例如：
```html
<script 
  type="text/x-template" 
  id="hello-world-template"
>
  <p>Hello hello hello</p>
</script>
```
```js
Vue.component('hello-world', {
  template: '#hello-world-template'
})
```

这些可以用于模板特别大的 demo 或极小型的应用，但是其它情况下请避免使用，因为这会将模板和该组件的其它定义分离开。

## 控制更新

### 强制更新
当 更改了某个数据，页面未重新渲染时，可以调用 \$forceUpdate 来做一次强制更新。

但是在做强制更新前，需要留意数组或对象的变更检测注意事项，99.9%的情况，都是在某个地方做错了事，如果做了上述检查，仍未发现问题，那么可以通过 \$forceUpdate来更新。

### 通过v-once创建低开销的静态组件
渲染普通的 HTML 元素在 Vue 中是非常快速的，但有的时候你可能有一个组件，这个组件包含了大量静态内容。在这种情况下，你可以在根元素上添加 v-once 特性以确保这些内容只计算一次然后缓存起来，就像这样：
```js
Vue.component('terms-of-service', {
  template: `
    <div v-once>
      <h1>Terms of Service</h1>
      ... a lot of static content ...
    </div>
  `
})
```
试着不要过度使用这个模式。当你需要渲染大量静态内容时，极少数的情况下它会给你带来便利，除非你非常留意渲染变慢了，不然它完全是没有必要的——再加上它在后期会带来很多困惑。例如，设想另一个开发者并不熟悉 v-once 或漏看了它在模板中，他们可能会花很多个小时去找出模板为什么无法正确更新。