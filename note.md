# vue的响应式-2
- 除了未被声明过和未被渲染的数据外，还有什么数据更改后不会渲染页面？
  > 1.&nbsp;利用索引直接设置一个数组项时：
  ```html
  <!-- 即使向数组中添加了第4项，数组仍然显示3项 -->
  <!-- 咳咳，一家三口，有第4个人也不能摆出来给大家看呀~ -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      wangFamily: ['老王', '小刘', '王小宝']
    }
  })
  vm.wangFamily[3] = '铁锤妹妹'; // 不是响应式的
  ```

  > 2.&nbsp;修改数组的长度时：
  ```html
  <!-- 更改了数组长度后，数组仍然显示1项 -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      wangWife: ['小刘']
    }
  })
  vm.wangWife.length = 0; // 不是响应式的
  ```

  > 3.&nbsp;添加或删除对象：
  ```html
  <!-- 身高还是那个身高，媳妇也只有一个，不要痴心妄想 -->
  <div id="app">{{ wang }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      wang: {
        wife: '小刘',
        son: '王小宝',
        weight: '100kg',
        height: '140cm',
        age: 60
      }
    }
  })
  vm.wang.secondWife = '铁锤妹妹'; // 不是响应式的
  delete vm.wang.height; // 不是响应式的
  ```
- 问：要如何响应式的更新数组和对象？
  > 更改数组：<br> 1. 利用数组变异方法：push、pop、shift、unshift、splice、sort、reverse <br> 2. 利用vm.\$set/Vue.set实例方法<br>3. 利用vm.\$delete或Vue.delete删除数组中的某一项

  > vm.\$set是Vue.set的别名<br>使用方法：Vue.set(target, key, value)，也就是这个意思：Vue.set(要改谁，改它的什么，改成啥)

  > vm.\$delete是Vue.delete的别名<br>使用方法：Vue.delete(target, key)，也就是这个意思：Vue.delete(要删除谁的值，删除哪个)

  ```html
  <!-- 从此，一家三口过上了愉快生活 -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      wangFamily: ['老王', '小刘', '王小宝']
    }
  })
  // 使用数组变异方法
  vm.wangFamily.push('铁锤妹妹');
  // 使用vm.$set
  vm.$set(vm.wangFamily, 3, '铁锤妹妹');
  
  ```

  ```html
  <!-- 老王的媳妇多了起来~ -->
  <div id="app">{{ list }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      wangWife: ['小刘']
    }
  })
  // 更改长度时，可以用数组的splice方法
  vm.wangWife.splice(100); 
  ```
  > 更改对象：<br>1. 添加利用vm.\$set/Vue.set实例方法<br>2. 删除利用vm.\$delete/Vue.delete方法

  ```html
  <div id="app">{{ wang }}</div>
  ```
  ```js 
  const vm = new Vue({
    el: '#app'
    data: {
      wang: {
        wife: '小刘',
        son: '王小宝',
        weight: '100kg',
        height: '140cm',
        age: 60
      }
    }
  })
  // 添加
  vm.$set(vm.wang, 'secondWife', '铁锤妹妹');
  // 删除
  vm.$delete(vm.wang, 'height')
  ```

- 总结：
  > 更改数组用变异方法，就够了
  > 更改对象就用vm.\$set和vm.\$delete

- 问题解决了，但是为什么会这样呢？
  > Object.defineProperty的锅，咱们下节课说~