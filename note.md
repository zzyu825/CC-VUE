# vue-resource
在Vue中实现异步加载需要使用到vue-resource库，利用该库发送ajax。

## 引入vue-resource
```js
<script src="https://cdn.jsdelivr.net/npm/vue-resource@1.5.1"></script>
```
要注意的是，vue-resource依赖于Vue，所以要先引入Vue，再引入vue-resource。

引入vue-resource之后，在Vue的全局上会挂载一个\$http方法，在vm.\$http方法上有一系列方法，每个HTTP请求类型都有一个对应的方法。

vue-resource使用了promise，所以\$http中的方法的返回值是一个promise。

## 请求方法

### POST请求
用于提交数据
<br/>

<span style="font-weight: bold;">常用data格式：</span>
  - 表单提交：multipart/form-data，比较老的网站会使用表单提交去获取数据，现在基本都不用表单提交，而是使用ajax，但是现在表单提交仍然存在，有时候需要做图片上传、文件上传。
  - 文件上传：application/json，现在大多数情况下都是用这个格式
<br/>

<span style="font-weight: bold;">使用方法：</span>vm.\$http.post(url, [body], [options])
- url: 必需，请求目标url
- body: 非必需，作为请求体发送的数据
- options：非必需，作为请求体发送的数据

```js
this.$http.post('https://developer.duyiedu.com/vue/setUserInfo', {
    name: this.name,
    mail: this.mail
  })
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
```

### GET请求
获取数据

<span style="font-weight: bold;">使用方法：</span>vm.\$http.get(url, [options])

```js
this.$http.get('https://developer.duyiedu.com/vue/getUserInfo')
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
```

在get请求时传参：
```js
this.$http.get('https://developer.duyiedu.com/vue/getUserInfo'， {
  params: {
    id: 'xxx'
  }
})
  .then(res => {
    console.log(res);
  })
  .catch(error => {
    console.log(error);
  })
```

### PUT请求
更新数据，将所有的数据全都推送到后端
<span style="font-weight: bold;">使用方法：</span>vm.\$http.put(url, [body], [config])

### PATCH请求
更新数据，只将修改的数据全都推送到后端
<span style="font-weight: bold;">使用方法：</span>vm.\$http.patch(url, [body], [config])

### DELETE请求
删除数据
<span style="font-weight: bold;">使用方法：</span>vm.\$http.delete(url, [config])

### HEAD请求
请求头部信息
<span style="font-weight: bold;">使用方法：</span>vm.\$http.head(url, [config])

### JSONP请求
除了jsonp以外，以上6种的API名称是标准的HTTP方法。
<br />
<span style="font-weight: bold;">使用方法：</span>vm.\$http.jsonp(url, [options]);

```js
this.$http.jsonp('https://developer.duyiedu.com/vue/jsonp').then(res => {
  this.msg = res.bodyText;
});


this.$http.jsonp('https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su', {
  params: {
    wd: 'nn',
  },
  jsonp: 'cb', //jsonp默认是callback,百度缩写成了cb，所以需要指定下 
})
  .then(res => {
    console.log(res);
  })
```

## options 参数说明

参数 | 类型 | 描述  
:-: | :-: | :-:
url | String | 请求目标url |
body | Object, FormData, string | 作为请求体发送的数据 |
headers | Object | 作为请求头部发送的头部对象 |
params | Object | 作为URL参数的参数对象 |
method | String | HTTP方法 (例如GET，POST，...) |
responseType | String | 设置返回数据的类型 |
timeout | Number | 在请求发送之前修改请求的回调函数 |
credentials | Boolean | 是否需要出示用于跨站点请求的凭据 |
emulateHTTP | Boolean | 是否需要通过设置X-HTTP-Method-Override头部并且以传统POST方式发送PUT，PATCH和DELETE请求。 |
emulateJSON | Boolean |  设置请求体的类型为application/x-www-form-urlencoded |
before | function(request) | 在请求发送之前修改请求的回调函数 |
uploadProgress | function(event) | 用于处理上传进度的回调函数 |
downloadProgress | function(event) | 用于处理下载进度的回调函数 |

## 响应对象
通过如下属性和方法处理一个请求获取到的响应对象：

### 属性

属性 | 类型 | 描述  
:-: | :-: | :-:
url | String | 响应的 URL 源 |
body | Object, Blob, string | 响应体数据 |
headers | Header | 请求头部对象 |
ok | Boolean | 当 HTTP 响应码为 200 到 299 之间的数值时该值为 true |
status | Number | HTTP 响应码 |
statusText | String | HTTP 响应状态 |

### 方法

方法 |  描述  
:-: | :-:
text() |  以字符串方式返回响应体 |
json() | 以格式化后的 json 对象方式返回响应体 |
blob() |  以二进制 Blob 对象方式返回响应体 |

以json()为例：

```js
this.$http.get('https://developer.duyiedu.com/vue/getUserInfo')
  .then(res => {
    return res.json();
  })
  .then(res => {
    console.log(res);
  })
```

## 最后的话
很不幸，Vue官方已不再维护这个库了，so...哈哈哈，我们再学点其他的୧[ * ಡ ▽ ಡ * ]୨