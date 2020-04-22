# v-model指令
可以在表单元素上创建双向数据绑定。即数据更新元素更新、元素更新数据也会更新。
> 本质上v-model为语法糖

元素类型 | 属性 |  事件  
-|-|-
input[type=text]、textarea | value | input |
input[checkbox]、input[radio] | checked | change |
select | value | change |


## input

### type=text 文本框
```html
<div id="app">
  <input v-model="message">
  <p>Message 为: {{ message }}</p>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data:; {
    message: ''
  }
})
```

### type=checkbox 复选框
#### 单个复选框
绑定到布尔值，v-model="Boolean"
```html
<div id="app">
  <input 
    type="checkbox" 
    id="checkbox" 
    v-model="checked"
  />
  <label for="checkbox">{{ checked }}</label>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    checked: true
  }
})
```

#### 多个复选框
绑定到同一个数组，v-model="Array"
数组中的值为被选中的input框value值
```html
<div id="app">
  <input type="checkbox" id="cheng" value="小明" v-model="checkedNames">
  <label for="cheng">小明</label>

  <input type="checkbox" id="deng" value="小李" v-model="checkedNames">
  <label for="deng">小李</label>
  
  <input type="checkbox" id="tong" value="小王" v-model="checkedNames">
  <label for="tong">小王</label>
  <br>
  <span>被选中的人有: {{ checkedNames }}</span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    checkedNames: []
  }
}) 
```

### type=radio 单选框
被绑定的数据和value同步
```html
<div id="app">
  <input type="radio" id="cheng" value="小明" v-model="picked">
  <label for="cheng">小明</label>
  <input type="radio" id="deng" value="小李" v-model="picked">
  <label for="deng">小李</label>
  <input type="radio" id="tong" value="小王" v-model="picked">
  <label for="deng">小王</label>
  <br>
  <span>被选中的人: {{ picked }}</span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    picked: ''
  }
}) 
```

## textarea
```html
<div id="app">
  <p >多行文本为：{{ message }}</p>
  <textarea v-model="message" placeholder="添加文本"></textarea>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    message: ''
  }
})  
```

## select
匹配的值为option中的汉字
### 单选
```html
<div id="app">
  <select v-model="selected">
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>选择: {{ selected === '请选择' ? '' : selected }}</span>
</div>
```
```js
const vm = new Vue({
  el: '#app',
  data: {
    selected: '请选择'
  }
}) 
```
<span style="color: red;">注意：</span>如果 v-model 表达式的初始值未能匹配任何选项，``<select>`` 元素将被渲染为“未选中”状态。在 iOS 中，这会使用户无法选择第一个选项。因为这样的情况下，iOS 不会触发 change 事件。因此，可以提供一个值为空的禁用选项：
```html
<div id="app">
  <select v-model="selected">
    <option :disabled="selected">请选择</option>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>选择: {{ selected === '请选择' ? '' : selected }}</span>
</div>
```

### 多选
绑定到一个数组
```html
<div id="app">
  <select v-model="selected" multiple>
    <option>A</option>
    <option>B</option>
    <option>C</option>
  </select>
  <span>选择: {{ selected }}</span>
</div>
```

```js
const vm = new Vue({
  el: '#app',
  data: {
    selected: []
  }
}) 
```

## 修饰符
### .lazy
在默认情况下，v-model在每次input事件触发后将输入框的值与数据进行同步。如果要变为使用change事件同步可以添加lazy修饰符：
```html
<!-- 在“change”时而非“input”时更新 -->
<input v-model.lazy="msg" >
```

### .number
自动将用户的输入值转为数值类型：
```html
<input v-model.number="age" type="number">
```

### .trim
自动过滤用户输入的<span style="font-weight: bold;">首尾</span>空白字符：
```html
<input v-model.trim="msg">
```