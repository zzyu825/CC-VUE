# 组件_监听组件事件
首先，我们来写一个博文组件，如：
```js
Vue.component('blog-post', {
  props: {
    post: {
      type: Object,
    }
  },
  template: `
    <div class="blog-post">
      <h3>{{ post.title }}</h3>
      <button>放大字号</button>
      <div>{{ post.content }}</div>
    </div>
  `,
})
```
```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      v-for="post in posts"
      :key="post.id"
      :post="post"
    >
    </blog-post>
  </div>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    posts: [
      { title: '标题1', content: '正文内容', id: 0, },
      { title: '标题2', content: '正文内容', id: 1, },
      { title: '标题3', content: '正文内容', id: 2, },
    ],
    postFontSize: 1
  }
})
```

可以看到每一个博文组件中，都有一个按钮，可以去放大页面中字体的字号，也就是说，当点击这个按钮时，我们要告诉父组件改变``postFontSize``数据去放大所有博文的文本。碰见这样的情况，该如何做呢？

Vue 实例提供了一个自定义事件来解决这个问题。父组件可以像处理原生DOM元素一样，通过 ``v-on``指令，监听子组件实例的任意事件，如：
```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      ...
      @enlarge-text="postFontSize += 0.1"
    >
    </blog-post>
  </div>
</div>
```
那么，怎么样能够去监听到一个 ``enlarge-text``这么奇怪的事件呢？这就需要在组件内，去主动触发一个**自定义事件**了。

如何触发？ 
通过调用 $emit 方法 并传入事件名称来触发一个事件，如：

```js
Vue.component('blog-post', {
  props: {
    ...
  },
  template: `
    <div class="blog-post">
      ...
      <button @click="$emit('enlarge-text')">放大字号</button>
      ...
    </div>
  `,
})
```

这样，父组件就可以接收该事件，更新数据 ``pageFontSize`` 的值了。

## 使用事件抛出一个值
在有些情况下，我们可能想让 ``<blog-post>``组件决定它的文本要放大多少。这是可以使用 $emit 的第二个参数来提供这个值，如：

```js
Vue.component('blog-post', {
  props: {
    ...
  },
  template: `
    <div class="blog-post">
      ...
      <button @click="$emit('enlarge-text', 0.2)">放大字号</button>
      ...
    </div>
  `,
})
```

在父组件监听这个事件时，可以通过 $event 访问到被抛出的这个值：

```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      ...
      @enlarge-text="postFontSize += $event"
    >
    </blog-post>
  </div>
</div>
```

或者，将这个事件处理函数写成一个方法：

```html
<div id="app">
  <div :style="{fontSize: postFontSize + 'em'}">
    <blog-post
      ...
      @enlarge-text="onEnlargeText"
    >
    </blog-post>
  </div>
</div>
```

那么，这个值将会作为第一个参数，传入这个方法：
```js
methods: {
  onEnlargeText: function (enlargeAmount) {
    this.postFontSize += enlargeAmount
  }
}
```

## 事件名
不同于组件和prop，事件名不存在任何自动化的大小写转换。而是触发的事件名需要完全匹配监听这个事件所有的名称。如果触发一个camelCase名字的事件：
```js
this.$emit('myEvent')
```
则监听这个名字的kabab-case版本是不会有任何效果的。
```html
<!-- 没有效果 -->
<my-component v-on:my-event="doSomething"></my-component>
```
与组件和prop不同的是，事件名不会被当作一个 JS 变量名或者属性名，所以就没有理由使用camelCase 或 PascalCase 了。

并且 v-on 事件监听器在 DOM 模板中会被自动转换为全小写，所以 @myEvent 将会变成 @myevent，导致 myEvent 不可能被监听到。

因此，推荐**始终使用 kebab-case 的事件名**。

## 将原生事件绑定到组件
在组件上去监听事件时，我们监听的是组件的自动触发的自定义事件，但是在一些情況下，我们可能想要在一个组件的根元素上直接监听一个原生事件。这是，可以使用 v-on 指令的 .native 修饰符，如：
```html
<base-input @focus.native="onFocus" @blur.native="onBlur"></base-input>
```
```js
Vue.component('base-input', {
  template: `
    <input type="text" />
  `
})
```
这样处理，在有些时候是很有用的，不过在尝试监听一个类似``<input>``元素时，这并不是一个好主意，例如``<base-input>``组件可能做了重构，如：
```html
<label>
  姓名：
  <input type="text">
</label>
```
可以看到，此时组件的根元素实际上是一个<label>元素，那么父级的.native监听器将静默失败。它不会产生任何报错，但是``onFocus``处理函数不会如预期被调用。

为了解决这个问题，Vue提供了一个$listeners属性，它是一个对象，里面包含了作用在这个组件上的所有监听器。例如：
```js
{
  focus: function (event) { /* ... */ }
  blur: function (event) { /* ... */ },
}
```

有了这个 \$listeners 属性，父级不用.native监听器，我们也可以配合 v-on="\$listeners" 将所有的原生事件监听器指向这个组件的某个特定的子元素，如：
```js
Vue.component('base-input', {
  template: `
    <label>
      名字：
      <input v-on="$listeners" />
    </label>
  `
})
```

## 在组件上使用 v-model
由于自定义事件的出现，在组件上也可以使用v-model指令。

在 input 元素上使用v-mode指令时，相当于绑定了value特性以及监听了input事件：

```html
<input v-model="searchText" />
```
等价于：
```html
<input
  :value="searchText"
  @input="searchText = $event.target.value"
>
```

当把v-model指令用在组件上时：
```html
<base-input v-model="searchText" /> 
```
则等价于：
```html
<base-input
  :value="searchText"
  @input="searchText = $event"
/>
```
同 input 元素一样，在组件上使用v-model指令，也是绑定了value特性，监听了input事件。

所以，为了让 v-model 指令正常工作，这个组件内的``<input>``必须：
- 将其value特性绑定到一个叫 value 的prop 上
- 在其input事件被触发时，将新的值通过自定义的input事件抛出
如：
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  `
}) 
```
这样操作后，v-model就可以在这个组件上工作起来了。

通过上面的学习，我们知道了，一个组件上的 v-model 默认会利用名为 value 的 prop 和名为 input 的事件，但是像单选框、复选框等类型的输入控件可能会将 value 特性用于不同的目的。碰到这样的情况，我们可以利用 model 选项来避免冲突：
```js
Vue.component('base-checkbox', {
  model: {
    prop: 'checked',
    event: 'change'
  },
  props: {
    checked: Boolean
  },
  template: `
    <input
      type="checkbox"
      :checked="checked"
      @change="$emit('change', $event.target.checked)"
    >
  `
})
```
使用组件：
```html
<base-checkbox v-model="lovingVue"></base-checkbox>
```
这里的 lovingVue 的值将会传入这个名为 checked 的 prop。同时当 <base-checkbox> 触发一个 change 事件并附带一个新的值的时候，这个 lovingVue 的属性将会被更新。

## .sync 修饰符
除了使用 v-model 指令实现组件与外部数据的双向绑定外，我们还可以用 v-bind 指令的修饰符 .sync 来实现。

那么，该如何实现呢？
先回忆一下，不利用 v-model 指令来实现组件的双向数据绑定：

```html
<base-input :value="searchText" @input="searchText = $event"></base-input>
```
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('input', $event.target.value)"
    />
  `
}) 
```
那么，我们也可以试着，将监听的事件名进行更改，如：
```html
<base-input :value="searchText" @update:value="searchText = $event"></base-input>
```
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  `
}) 
```

这样也是可以实现双向数据绑定的，那么和 .sync 修饰符 有什么关系呢？
此时，我们对代码进行修改：
```html
<base-input :value.sync="searchText"></base-input>
```
```js
Vue.component('base-input', {
  props: ['value'],
  template: `
    <input 
      :value="value"
      @input="$emit('update:value', $event.target.value)"
    />
  `
}) 
```

所以，.sync 修饰符 本质上也是一个语法糖，在组件上使用：
```html
<base-input :value.sync="searchText"></base-input>
```

等价于：
```html
<base-input
  :value="searchText"
  @update:value="searchText = $event"
/>
```

当我们用一个对象同时设置多个prop时，也可以将.sync修饰符和 v-bind配合使用：
```html
<base-input v-bind.sync="obj"></base-input>
```

**注意：**
- 带有.sync修饰符的v-bind指令，只能提供想要绑定的属性名，**不能**和表达式一起使用，如：``:title.sync="1+1"``，这样操作是无效的
- 将 ``v-bind.sync`` 用在 一个字面量对象上，如 ``v-bind.sync="{ title: 'haha' }"``，是无法工作的，因为在解析一个像这样的复杂表达式的时候，有很多边缘情况需要考虑。

## v-model VS .sync
先明确一件事情，在 vue 1.x 时，就已经支持 .sync 语法，但是此时的 .sync 可以完全在子组件中修改父组件的状态，造成整个状态的变换很难追溯，所以官方在2.0时移除了这个特性。然后在 vue2.3时，.sync又回归了，跟以往不同的是，现在的.sync完完全全就是一个语法糖的作用，跟v-model的实现原理是一样的，也不容易破环原有的数据模型，所以使用上更安全也更方便。


- 两者都是用于实现双向数据传递的，实现方式都是语法糖，最终通过 ``prop`` + ``事件`` 来达成目的。
- vue 1.x 的 .sync 和 v-model 是完全两个东西，vue 2.3 之后可以理解为一类特性，使用场景略微有区别
- 当一个组件对外只暴露一个受控的状态，且都符合统一标准的时候，我们会使用v-model来处理。.sync则更为灵活，凡是需要双向数据传递时，都可以去使用。