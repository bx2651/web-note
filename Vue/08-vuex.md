在vue中，我们有四种传值的方式：

* 父传子
* 子传父
* eventBus
* vuex传值

vuex是一个专为vue.js应用程序开发的**状态管理模式**

* 它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。
* 它集成了vue的官方调试工具devtools extention,提供了诸如零配置的time-travel调试、状态快照导入导出等高级调试功能。

那么，什么是状态管理呢？

简单来讲，就是多个组件共享的变量全部存储在一个对象里，然后将这个对象放在顶层的vue实例中，让其他组件可以使用。

比如，我们在淘宝的商品列表中，将某一个商品加入了购物车，现在我们切到购物车页面，我们可以看到购物车内是有商品的，购物车和商品列表，并不是同一个组件，他们甚至没有任何关系，我们无法使用组件传值来让商品列表告诉购物车用户加入购物车这个行为，那么我们可以怎么做呢？我们可以使用eventBus，但是当我们需要共享的信息非常多的时候，eventBus就显得有些业余了，这个时候我们就可以用到vuex。可以说，vuex是eventBus的plus版。

我们现在就来深入了解一下vuex:


## 引入vuex

要使用vuex，我们需要先安装一下：

```
npm install vuex --save
```

接下来，我们在项目src目录下新建一个目录store,在下面新建一个Index.js文件。

创建vuex实例：然后再该文件中引入vue和vuex,创建Vuex.Store实例保存到变量store中，最后使用export default导出：

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

然后main.js文件引入该文件

```
import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
```

然后，我们就可以开始写相关代码了。


## state

vuex中的数据源，我们需要保存的数据就保存在这里。

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  	count:0
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
```

在页面，我们可以通过this.$store.state.count来获取这个数据：

```
<p>我是从store获取的数字：{{this.$store.state.count}}</p>
```

## mutations:

我们可以通过this.$store.state.count来拿到我们的数据，我们也可以以这样的方式去修改数据，但是官方并不建议我们这么做，具体原因稍后再讲。

那么我们应该怎样去修改数据呢？

第一种方式就是使用mutations的commit提交操作：

index.js文件：

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    add(state,n){
      state.count = n
    },
    reduction(state){
      state.count-=1
    }
  },
  actions: {
  },
  modules: {
  }
})
```

页面：

```
<template>
  <div>
    <button @click="add()">加</button>
    <p>我是从store获取的数字：{{this.$store.state.count}}</p>
    <button @click="reduction()">减</button>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  },
  mounted() {
  },
  methods: {
    add(){
      this.$store.commit("add")
    },
    reduction(){
      this.$store.commit("reduction")
    }
  }
};
</script>
```

## actions

刚刚说到修改state数据的第一种方法是通过提交commit给mutations提交修改，那么第二种就是通过actions的dispatch来修改：

index.js:

```
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    count:0
  },
  mutations: {
    add(state,n){
      state.count = n
    },
    reduction(state){
      state.count-=1
    }
  },
  actions: {
    addFun(context,n){
      context.commit("add",n)
    },
    reductionFun(context){
      context.commit("reduction")
    }
  },
  modules: {
  }
})
```

页面：

```
<template>
  <div>
    <button @click="addFun()">加</button>
    <p>我是从store获取的数字：{{this.$store.state.count}}</p>
    <button @click="reductionFun()">减</button>
  </div>
</template>

<script>

export default {
  name: "Home",
  components: {
  },
  mounted() {
  },
  methods: {
    add(){
      this.$store.commit("add")
    },
    reduction(){
      this.$store.commit("reduction")
    },
    addFun(){
      var n = 5
      this.$store.dispatch("addFun",n)
    },
    reductionFun(){
      this.$store.dispatch("reductionFun")
    }
  }
};
</script>
```

mutations和actions提交的修改的效果看起来是一样的，因为actions其实就是调了一下mutations来提交修改的操作，那么，为什么要这么做呢？并且他们两者之间到底有什么区别？

### mutations和actions的区别：

![avatar](../img/vuex.png)

这是vuex官网的一张图，通过这张图我们可以看到，当我们对数据的操作涉及到网络请求（backend API）时，官方建议我们是用到actions来提交修改操作。

devtools会监控mutation操作。

这是因为**mutation 必须是同步函数**，如果在mutation中使用了异步操作，会让devtools无法观察到数据到底是被谁修改的，给调试带来了麻烦。

而action提交的是mutation，而不是直接变更状态。并且actions可以包含任意的异步操作。

  [-1],
 [2,3],
[1,-1,-3]