# 过滤器
自定义过滤器，用于一些常见的文本格式化。

过滤器可用在两个地方：双花括号插值 和 v-bind 表达式，添加在JS表达式的尾部，由“管道”符号表示:
```html
<!-- 在双花括号中 -->
{{ message | filter }}

<!-- 在 v-bind 中 -->
<div v-bind:id="id | filter"></div>
```

## 定义过滤器
全局过滤器：
```js
Vue.filter('filter', value => {})
```

局部过滤器：
```js
filter () {
  return xxx;
}
```

## 参数
当过滤器形式为 `` msg | filter `` 时，filter过滤器接收一个参数，参数为``msg``。

当过滤器形式为 `` msg | filter('a') ``时，filter过滤器接收两个参数，参数为``msg, 'a'``

## 过滤器串联
```js
{{ msg | filterA | filterB }}
``` 
在这个例子中，filterA的参数为``msg``，filterB的参数为filterA。

## 练习
### 首字母大写
```html
{{ content | capitalize }}
```
```js
Vue.filter('capitalize', value => {
  if(!value) { return };
  return value.charAt(0).toUpperCase() + value.slice(1);
})
```

### 数字中间加上逗号
```html
{{ money | toMoney }}
```
```js
Vue.filter('toMoney', value => {
  if(!value) { return };
  return value.toLocaleString();
});
```

### 数字添加文字“万”
```html
{{ likes | addWord }}
```
```js
Vue.filter('addWord', value => {
  if(!value) { return };

  if(value > 10000) {
    return ( value / 10000).toFixed(1) + '万';
  }
  return value;
});
```