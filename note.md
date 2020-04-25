## 拦截器
interceptors，在发起请求之前做一些处理，或者在响应回来之后做一些处理。

### 请求拦截器 
```js
axios.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config;
})
```

### 响应拦截器
```js
axios.interceptors.response.use(response => {
  // 对响应数据做点什么
  return response;
})
```

### 移除拦截器
```js
const myInterceptor = axios.interceptors.request.use(config => {});
axios.interceptors.request.eject(myInterceptor);
```

### 为axios实例添加拦截器
```js
const instance = axios.create();
instance.interceptors.request.use(config => {});
```

## 取消请求
用于取消正在进行的http请求
```js
const source = axios.CancelToken;
const source = CancelToken.source();

axios.get('/getUserInfo', {
  cancelToken: source.token
}).then(res => {
  console.log(res);
}).catch(error => {
  if(axios.isCancel(error)) {
    // 取消请求
    console.log(error.message);
  } else {
    // 处理错误
  }
})

// 取消请求 参数 可选
source.cancel('取消请求');
```

## 错误处理
在请求错误时进行的处理
request / response 是error的上下文，标志着请求发送 / 得到响应
在错误中，如果响应有值，则说明是响应时出现了错误。
         如果响应没值，则说明是请求时出现了错误。
在错误中，如果请求无值，则说明是请求未发送出去，如取消请求。

```js
axios.get('/user/12345')
  .catch(function (error) {
    // 错误可能是请求错误，也可能是响应错误
    if (error.response) {
      // 响应错误
    } else if (error.request) {
      // 请求错误
    } else {
      console.log('Error', error.message);
    }
    console.log(error.config);
  });
```

在实际开发过程中，一般在拦截器中统一添加错误处理
请求拦截器中的错误，会当请求未成功发出时执行，但是要注意的是：取消请求后，请求拦截器的错误函数也不会执行，因为取消请求不会抛出异常，axios对其进行了单独的处理。
在更多的情况下，我们会在响应拦截器中处理错误。
```js
const instance = axios.create({});
instance.interceptors.request(config => {

}, error => {
  return Promise.reject(error);
})

instance.interceptors.response(response => {

}, error => {
  return Promise.reject(error);
})
```

## axios 预检
当axios的请求为非简单请求时，浏览器会进行预检，及发送OPTIONS请求。请求到服务器，询问是否允许跨域。如果响应中允许预检中请求的跨域行为，则浏览器会进行真正的请求。否则会报405错误。