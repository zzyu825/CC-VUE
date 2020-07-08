# 组件_异步组件
在项目中，有些组件不会在第一次进入首屏时加载，而是当执行了某些操作时，才会加载进来，所以此时，我们可以将该组件设置成异步加载，什么时候用，什么时候再加载进来，以达到提升首屏性能的目的。

使用方法：
```js
components: {
  AsyncCmp: () => import ('url');
}
```

将多个需要同时加载的组件合并到一个文件中：
```js
components: {
  AsyncCmp1: () => import(/* webpackChunkName: "async" */ 'url'),
  AsyncCmp2: () => import(/* webpackChunkName: "async" */ 'url'),
}
```

异步加载的文件，会在link标签上设置 el="prefech"。浏览器会在空闲时间内下载对应的资源，使用时可以直接从缓存中获取。与之对应的 el="preload"，会及时下载对应的资源。