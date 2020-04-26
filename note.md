# 组件_Prop验证
我们可以为组件的 prop 指定验证要求，例如你可以要求一个 prop 的类型为什么。如果说需求没有被满足的话，那么Vue会在浏览器控制台中进行警告，这在开发一个会被别人用到的组件时非常的有帮助。

为了定制 prop 的验证方式，你可以为 props 中的值提供一个带有验证需求的对象，而不是一个字符串数组。例如：

```js
Vue.component('my-component', {
  props: {
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise
  }
})
```

上述代码中，对prop进行了基础的类型检查，类型值可以为下列原生构造函数中的一种：``String``、``Number``、``Boolean``、``Array``、``Object``、``Date``、``Function``、``Symbol``、任何自定义构造函数、或上述内容组成的数组。
需要注意的是`null` 和 `undefined` 会通过任何类型验证。
除基础类型检查外，我们还可以配置高级选项，对prop进行其他验证，如：类型检测、自定义验证和设置默认值。
如：
```js
Vue.component('my-component', {
  props: {
    title: {
      type: String, // 检查 prop 是否为给定的类型
      default: '杉杉最美',   // 为该 prop 指定一个默认值，对象或数组的默认值必须从一个工厂函数返回，如：default () { return {a: 1, b: 10} },
      required: true, // 定义该 prop 是否是必传项
      validator (prop) {  // 自定义验证函数，该prop的值回作为唯一的参数代入，若函数返回一个falsy的值，那么就代表验证失败
        return prop.length < 140;
      }
    }
  }
})
```

为了更好的团队合作，在提交的代码中，prop 的定义应该尽量详细，至少需要指定其类型。