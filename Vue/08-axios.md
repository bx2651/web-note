## 为什么不选择传统的Ajax请求？

* 配置和调用方式非常混乱

* 编码看起来很复杂

## 为什么不选择Jquery里的Ajax

* 在Vue的整个开发过程中，都不需要使用Jquery,这就意味着，为了方便我们进行网络请求，而特意引用Jquery是非常得不偿失的，因为Jquery的代码有1w多行，而Vue的代码也才1w多行。所以我们没有必要为了玩过请求而引用这个重量级的框架。

## 为什么不适用Vue配套的vue-resource？

* 作者已经不再维护Vue-resource,那么就意味着它以后不再支持新的版本，这对以后项目的开发和维护都存在很大的隐患。

* 官方建议使用Axios

# Jsonp

在前端开发中，我们一种常见的网络请求方式就是Jsonp,使用它可以解决跨域访问的问题，那么他的原理是什么呢？

* JSONP的核心在于通过script标签的src来帮助我们请求数据，将数据当做一个javascript函数来执行，并且执行的过程中传入我们需要的json。所以封装JSONP的核心就在于我们监听window上的jsonp进行回掉时的名称。

# 为什么使用Axios?

* 首先，这是作者推荐的框架
* 它支持在浏览器及node环境中发送http请求
* 支持Promise
* 支持拦截请求和相应
* 可以转换请求和相应数据

### Axios支持的请求的方式：

* axios(config)
* axios.request(url[,config])
* axios.get(url[,config])
* axios.delete(url[,config])
* axios.head(url[,config])
* axios.post(url[,data[,config])
* axios.put(url[,data[,config])
* axios.patch(url[,data[,config])


### axios的使用方法

1.首先我们需要安装axios

2.将安装好的axios引入到文件当中

3.

```

axios({
    url:'',//输入要请求的服务器的地址
    method:'get',//输入请求的方式,不写默认为get方法，所以get可省略。
    params:{
        type:'pop',
        page:1
    }//可以将要拼接到url后面的数据直接拼接到url后面，或者是以params或query的方式传递进去，浏览器会自动帮我们拼接。
})
    .then(res => console.log(res))//axios支持promise，所以可以直接通过.then的方式拿到返回的数据并做处理。

```

我们有时候可能会有类似的需求：我们需要发送两个请求，并且在两个请求都到达后再做一些处理，那么我们就需要这么做：

```
//axios发送并发请求
axios.all([axios({//通过axios自带的all方法，当所有的axios请求到达后，再执行最后的then
    url:'url1'
}),axios({
    url:'url2',
    params:{
        type:'pop',
        page:2
    }
})]).then(axios.spread((res1,res2)=>{//可以通过axios.spread方法将拿到的两个结果展开为两个参数，也可以不展开，直接只写一个参数
    console.log(res1)
    console.log(res2)
}))

```

我们在进行网络请求的时候，一般前面的地址都是相同的，这就意味着，前面的url我们可能会写很多遍，那么我们就可以将基础的url抽离出来，单独抽出来一个baseURL以及超时时间等。

我们可以通过全局配置，配置：

axios.defaults.baseURL:'192.108.1.1',
axios.defaults.timeout:3000
