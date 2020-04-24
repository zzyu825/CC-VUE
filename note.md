# Axios
Axios是一个基于promise的HTTP库

浏览器支持情况：Chrome、Firefox、Safari、Opera、Edge、IE8+

## 引入
```js
<script src="https://unpkg.com/axios/dist/axios.min.js"></script>
```

## API

- axios(config)
- axios(url, [config])

## config 配置对象
最常用的配置：
```js
axios({
  method: 'get', // post、get、put....
  baseURL: '', // 请求的域名，基本地址
  url: '', // 请求的路径
  params: {}, // 会将请求参数拼接在url上
  data: {}, // 会将请求参数放在请求体中
  headers: {}, // 设置请求头，例如设置token等
  timeout: 1000, // 设置请求超时时长，单位：ms
})
```

## 方法别名
为方便起见，为所有支持的请求方法提供了别名。

- axios.request(config)
- axios.get(url, [config])
- axios.post(url, [data], [config]])
- axios.delete(url, [config])
- axios.head(url, [config])
- axios.put(url, [data], [config])
- axios.patch(url, [data], [config]])
- axios.options(url, [config])

## 配置默认值
可以指定将被用在各个请求的配置默认值

### 全局配置
```js
axios.defaults.baseURL = 'https://developer.duyiedu.com/vue';
axios.defaults.timeout = 1000;
```

在实际项目中，很少用全局配置。

### 实例配置

> 可以使用自定义配置新建一个axios实例

```js
const instance = axios.create({
  baseURL: 'https://developer.duyiedu.com/vue',
  timeout: 1000,
})

instance.get('/getUserInfo').then(res => {
  // ...
})
```

### 请求配置
```js
const instance = axios.create();
instance.get('/getUserInfo', {
  timeout: 5000
})
```

### 配置的优先顺序

全局 < 实例 < 请求

## 并发
同时进行多个请求，并统一处理返回值

- axios.all(iterable)
- axios.spread(callback)

```js
axios.all([
  axios.get('/a'),
  axios.get('/b')
]).then(axios.spread((aRes, bRes) => {
  console.log(aRes, bRes);
}))
```