# JSX 
在Vue中使用JSX语法。可以让我们回到更接近模板的语法上。
```js
render () {
  return (
    <h1>这是一个标题</h1>
  )
}
```

## 插值
```js
<div>{ this.value }</div>
```

## 指令
在JSX中，一些指令并不存在，所以我们可以换一种方式来处理。

### v-text
```html
<div domPropsTextContent="<p>i am a p</p>"></div>
```

### v-html
```html
<div domPropsInnerHTML="<p>i am a p</p>"></div>
```

### v-show
jsx支持v-show指令：
```html
<div v-show={this.show}></div>
```

### v-if 
```html
<!-- v-if -->
{true && <div>div</div>}
{true ? <div>div</div> : <span>span</span>}
```

### v-for
```html
{ [1, 2, 3].map(item => (<div key={item}>{ item }</div>))}
```

### v-on
```html
<button onClick={this.handleClick}>点击事件</button>
<button on-click={this.handleClick}>点击事件</button>
<!-- 对应@click.native -->
<cmp-button nativeOnClick={this.handleClick}>原生点击事件</cmp-button>
<!-- 传递参数 -->
<button onClick={e => this.handleClick(this.id)}>触发点击事件时，传递参数</button>
```

### v-bind
```html
<input value={this.value} />
```

在JSX中可以直接使用class="xx"来指定样式类，内联样式可以直接写成style="xxx"
```html
<div class="a b" style="font-size: 12px;">Content</div>
<div class={{a: true, b: false}}>Content</div>
<div style={{color: 'red', fontSize: '14px'}}>Content</div>
```

### v-model
有相应的插件 支持 v-model，所以可以直接使用：

```html
<input type="text" v-model={this.value} />
```

### v-slot
```html
<my-cmp>
  默认插槽
  <div slot="a">具名插槽 a</div>
</my-cmp>
```

### v-pre
### v-cloak
### v-once
以上三个指令，不常用，无替代方案

## Ref 
```html
<div ref="xxx">xxx</div>
```

当遍历元素或组件时，如：
```js
[1, 2, 3].map(item => <div ref="xx" key={ item }>{ item }</div>)
```
会发现从 this.$refs.xxx 中获取的并不是期望的数组值，此时就需要将refInFor属性设置为true了：
```js
[1, 2, 3].map(item => <div ref="xx" refInFor={true} key={item}>{ item }</div>)
```

## 自定义指令
```js
render () {
  // 1
  return (
    <input v-splice={{value: this.value, modifiers: {number: true }}}/>
  )

  // 2
  const directives = [
    { 
      name: 'splice', 
      value: this.value,  
      modifiers: {number: true }
    }
  ];

  return (
    <div {...{ directives} }></div>
  )
}
```

## 过滤器
```html
<!-- 正常使用过滤器 -->
<div>{{ msg | capitalize }}</div>

<!-- 在jsx中使用过滤器 -->
<div>{ this.$options.filters('capitalize')(this.msg)}</div>
```


## 插槽
模板写法：
```html
<!-- 组件内 -->
<div class="demo">
  <slot name="header"></slot>
  <slot></slot>
</div>

<!-- 使用时 -->
<my-cmp>
  default
  <template v-slot:header>header</template>
</my-cmp>
```

JSX写法：
```html
<!-- 组件内 -->
<div class="demo">
  { this.$slots.header }
  { this.$slots.default }
</div>

<!-- 使用时 -->
<my-cmp>
  default
  <template slot="header">header</template>
</my-cmp>
```

作用域插槽：
模板写法：
```html
<!-- 组件内 -->
<div class="demo">
  <slot :text="'HelloWorld'"></slot>
</div>

<!-- 使用时 -->
<my-cmp v-slot="slotProps">
  {{ slotProps.text }}
</my-cmp>
```

JSX写法：
```html
<!-- 组件内 -->
<div class="demo">
  { 
    this.$scopedSlots.default({
      text: 'HelloWorld',
    }) 
  }
</div>

<!-- 使用时 -->
<div id="app">
  <base-demo {...{
    scopedSlots: {
      default: props => props.text
    },
  }}></base-demo>
</div>
```