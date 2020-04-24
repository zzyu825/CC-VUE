# 练习_仿百度搜索联想
url: https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su

请求方式：jsonp

发送参数：
1. wd：字符串，搜索的文字
2. cb：字符串，callback函数的名字

返回结果：（JSON格式）
```js
{
  q: String,
  p: Boolean,
  s: Array   // 搜索联想列表
}
```