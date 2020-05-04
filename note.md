# 渲染函数

## 基础
当我们需要使用JavaScript的编程能力时，可以利用渲染函数。渲染函数比模板更接近于编译器。

例如，我们想要生成一些标题：
```html
<h1>Hello world!</h1>
```
如果，我们按照之前的方式，那么模板内将会十分冗余。如果此时利用渲染函数，那么代码写起来将会简洁很多。
```js
props: {
  level: {
    type: Number,
    required: true
  }
},
render: function (createElement) {
  return createElement(
    'h' + this.level,   // 标签名称
    this.$slots.default // 子节点数组
  )
},
```

## 节点、树、以及虚拟DOM
在深入渲染函数之前，先来了解一些浏览器的工作原理。例如，下面这段HTML：
```html
<div>
  <h1>My title</h1>
  Some text content
  <!-- TODO: Add tagline -->
</div>
```
当浏览器读到这些代码时，它会建立一个**DOM节点树** 来保持追踪所有内容，如同你会画一张家谱树来追踪家庭成员的发展一样。
以上HTML对应的DOM节点树如下图所示：
![avatar](https://cn.vuejs.org/images/dom-tree.png)

每个元素都是一个节点。每段文字也是一个节点。甚至注释也都是节点。一个节点就是页面的一个部分。就像家谱树一样，每个节点都可以有孩子节点。

高效地更新所有这些节点是比较困难的，不过幸运的是，我们不需要手动完成这个工作。只需要告诉Vue希望页面上的HTML是什么，例如在模板中：
```html
<h1>{{ blogTitle }}</h1>
```
或者是在一个渲染函数中：
```js
render: function (createElement) {
  return createElement('h1', this.blogTitle)
}
```
在这两种情况下，Vue 都会自动保持页面的更新，即便 blogTitle 发生了改变。

### 虚拟DOM
Vue通过建立一个**虚拟DOM**来追踪自己要如何改变真实DOM。例如：
```js
return createElement('h1', this.blogTitle);
```
createElement 会返回什么呢？
它不会返回一个实际的DOM元素。更准确的名字可能是：``createNodeDescription``，因为它所包含的信息会告诉Vue页面上需要渲染什么样的节点，包括其子节点的描述信息。我们把这样的节点描述为“虚拟节点（virtual node）”，也常简写它为“VNode”。“虚拟DOM”是我们对由Vue组件树建立起来的整个VNode树的称呼。

## createElement参数
createElement接收的参数：
```js
createElement(标签名(必需), 与模板中属性对应的数据对象(可选), 子级虚拟节点(可选));
```

### 深入数据对象
```js
{
  // 与 `v-bind:class` 的 API 相同，接受一个字符串、对象或字符串和对象组成的数组
  class: {
    foo: true,
    bar: false
  },
  // 与 `v-bind:style` 的 API 相同，接受一个字符串、对象，或对象组成的数组
  style: {
    color: 'red',
    fontSize: '14px',
  },
  // 普通的 HTML attribute
  attrs: {
    id: 'foo',
  },
  // 组件 prop
  props: {
    myProp: 'bar',
  },
  // DOM属性
  domProps: {
    innerHTML: 'baz',
  },
  // 事件监听器，不支持如“v-on:keyup.enter”这样的修饰器
  on: {
    click: this.onClick
  },
  // 仅用于组件，用于监听原生事件，而不是组件内部使用 vm.$emit 触发的事件。
  nativeOn: {
    click: this.nativeClickHandler
  },
  // 自定义指令。注意，无法对 `binding` 中的 `oldValue`赋值，因为 Vue 已经自动为你进行了同步。
  directives: [
    {
      name: 'my-custom-directive',
      value: '2',
      expression: '1 + 1',
      arg: 'foo',
      modifiers: {
        bar: true
      }
    }
  ],
  // 其它特殊顶层属性
  key: 'myKey',
  ref: 'myRef',
  // 如果在渲染函数中给多个元素都应用了相同的 ref 名，那么 `$refs.myRef` 会变成一个数组。
  refInFor: true
  // 作用域插槽，格式为：{ name: props => VNode | Array<VNode> }
  // 如果组件是其它组件的子组件，需为插槽指定名称
  slot: 'name-of-slot',
  scopedSlots: {
    default: props => createElement('span', props.text)
  },
}
```

## 使用JavaScript代替模板功能

### v-if 和 v-for
只要在原生的 JavaScript 中可以轻松完成的操作，Vue 的渲染函数就不会提供专有的替代方法。比如，在模板中使用的 v-if 和 v-for：
```html
<ul v-if="items.length">
  <li v-for="item in items">{{ item }}</li>
</ul>
<p v-else>No items found.</p>
```
这些都可以在渲染函数中用 JavaScript 的 if/else 和 map 来重写：
```js
props: ['items'],
render (createElement) {
  if(items.length) {
    return createElement('ul', this.items.map(item => createElement('li', item)))
  } else {
    return createElement('p', 'No items found');
  }
}
```

### v-model
渲染函数中没有与v-model的直接对应---必须自己实现相应的逻辑：
```html
<input v-model="value" />
```

```js
data () {
  return {
    value: 'ceshi',
  }
},
render (createElement) {
  const self = this;
  return createElement('input', {
    attrs: {
      value: self.value
    },
    on: {
      input (e) {
        self.value = e.target.value;
      }
    },
  });
},
```

### 事件&按键修饰符
对于 .passive、.capture 和 .once 这些事件修饰符, Vue 提供了相应的前缀可以用于 on：
修饰符 | 前缀  
:-: | :-:  
.passive | & 
.capture | ! 
.once | ~ 
.capture.once 或 .once.capture | ~! 

例如：

```js
on: {
  '!click': this.doThisInCapturingMode,
  '~keyup': this.doThisOnce,
  '~!mouseover': this.doThisOnceInCapturingMode
}
```

对于所有其它的修饰符，私有前缀都不是必须的，因为你可以在事件处理函数中使用事件方法：

修饰符 | 处理函数中的等价操作  
:-: | :-:  
.stop | event.stopPropagation()
.prevent | event.preventDefault() 
.self | if (event.target !== event.currentTarget) return 
按键：.enter, .13 | if (event.keyCode !== 13) return <br> 对于别的按键修饰符来说，可将 13 改为另一个按键码
修饰键：.ctrl, .alt, .shift, .meta | if (!event.ctrlKey) return (将 ctrlKey 分别修改为 altKey、shiftKey 或者 metaKey)

### 插槽
可以通过 this.$slots 访问静态插槽的内容，每个插槽都是一个 VNode 数组：
```html
<div>
  <slot></slot>
</div>
```
```js
render: function (createElement) {
  return createElement('div', this.$slots.default)
}
```

也可以通过 this.$scopedSlots 访问作用域插槽，每个作用域插槽都是一个返回若干 VNode 的函数：
```html
<div>
  <slot :text="message"></slot>
</div>
```
```js
data() {
  return {
    msg: 'hello world',
  }
},
render: function (createElement) {
  return createElement('div', [
    this.$scopedSlots.default({
      text: this.msg
    })
  ])
}
```
如果要用渲染函数向子组件中传递作用域插槽，可以利用 VNode 数据对象中的 scopedSlots 字段：
```html
<div>
  <base-slot v-slot="slotProps">
    {{ slotProps.text }}
  </base-slot>
</div>
```
```js
render: function (createElement) {
  return createElement('div', [
    createElement('base-slot', {
      // 在数据对象中传递 `scopedSlots`
      // 格式为 { name: props => VNode | Array<VNode> }
      scopedSlots: {
        default: function (props) {
          return createElement('span', props.text)
        }
      }
    })
  ])
}
```