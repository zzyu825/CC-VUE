# Vue相关指令
- 具有特殊含义、拥有特殊功能的特性
- 指令带有v-前缀，表示它们是Vue提供的特殊特性
- 指令可以直接使用data中的数据

## v-pre
- 跳过这个元素和它的子元素的编译过程。可以用来显示原始 Mustache 标签。
- 作用：跳过大量没有指令的节点会加快编译。不常用
  ```html
  <!-- 不会被编译 -->
  <span v-pre>{{ msg }}</span>
  ```

## v-cloak
- 这个指令保持在元素上直到关联实例编译结束
- 可以解决闪烁的问题 不常用
- 和 CSS 规则如 [v-cloak] { display: none } 一起用时，这个指令可以隐藏未编译的 Mustache 标签直到实例准备完毕

  ```css
  [v-cloak] {
    display: none;
  }
  ```
  ```html
  <!-- {{ message }}不会显示，直到编译结束 -->
  <div v-cloak>
    {{ message }}
  </div>
  ```

## v-once
- 只渲染元素一次。随后的重新渲染，元素及其所有的子节点将被视为静态内容并跳过。
- 这可以用于优化更新性能
  ```html
  <!-- 单个元素 -->
  <span v-once>{{msg}}</span>
  <!-- 有子元素 -->
  <div v-once>
    <h1>comment</h1>
    <p>{{msg}}</p>
  </div>
  ```

## v-text
- 更新元素的 textContent
  ```html
  <span v-text="msg"></span>
  <!-- 和下面的一样 -->
  <span>{{msg}}</span>
  ```

> v-text VS Mustache(胡子)插值表达式
- v-text替换元素中所有的文本，Mustache只替换自己，不清空元素内容
  ```html
  <!-- 渲染为：<span></span> -->
  <span v-text="msg">----</span>
  <!-- 渲染为：<span>--------</span> -->
  <span>----{{msg}}----</span>
  ```
- v-text 优先级高于 Mustache

> textContent VS innerText
1. 设置文本替换时，两者都会把指定节点下的所有子节点也一并替换掉。
2. textContent 会获取所有元素的内容，包括 ```<script>``` 和 ```<style> ```元素，然而 innerText 不会。
3. innerText 受 CSS 样式的影响，并且不会返回隐藏元素的文本，而textContent会。
4. 由于 innerText 受 CSS 样式的影响，它会触发重排（reflow），但textContent 不会。
5. innerText 不是标准制定出来的 api，而是IE引入的，所以对IE支持更友好。textContent虽然作为标准方法但是只支持IE8+以上的浏览器，在最新的浏览器中，两个都可以使用。
6. 综上，Vue这里使用textContent是从性能的角度考虑的。

  > 测试一下innerText & textContent两者性能

  ```html
  <ul class="list">
    <li>1</li>
    <!-- 此处省略998个 -->
    <li>1000</li>
  </ul>
  ```
  ```js
  const oList = document.getElementById("list");

  console.time("innerText");
  for(let i = 0; i < oList.childElementCount; i++){
    ul.children[i].innerText="innerText";
  }
  console.timeEnd("innerText");

  console.time("textContent");
  for(let i = 0; i < oList.childElementCount; i++){
    ul.children[i].textContent="innerText";
  }
  console.timeEnd("textContent");
  ```
  

## v-html
- 更新元素的innerHTML
- ***注意***：内容按普通 HTML 插入，不会作为 Vue 模板进行编译 
- 在网站上动态渲染任意 HTML 是非常危险的，因为容易导致 XSS 攻击。只在可信内容上使用 v-html，不要用在用户提交的内容上。
  ```html
  <input type="text" />
  <button>点击</button>
  <div id="app">
    <div v-html="msg"></div>
  </div>
  ```
  ```js
  const vm = new Vue({
    el: '#app',
    data: {
      msg: 'hello world'
    }
  })

  const oInput = document.getElementsByTagName('input')[0];
  const oButton = document.getElementsByTagName('button')[0];
  let msg = null;
  oButton.onclick = function () {
    vm.msg = oInput.value;
  }
  ```