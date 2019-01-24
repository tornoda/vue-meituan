# vue-meituan

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your tests
```
npm run test
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


### 与老师的冲突
1. 很多组件里面的数据请求没有必要，减少了http请求，提供性能
2. 使用vuex, vue-router使得层级关系更加清晰。这个app实际上是一个半成品，也不可能一个成品。这样写使得之后拓展功能更加方便。
3. 提供素材工具方法，比如better-scroll
4. 对滚动性能进行优化，使用判断代替循环（改善很大）
5. 使用img lazy-load对图片进行懒加载

### TO DOS
1. 把getter里面的三个属性写到mutation里面。did
2. 刷新子路由时的不能够滚动，出现购物车
３．删除购物车时后ｕｉ出现问题