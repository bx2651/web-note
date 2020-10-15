# 路由router

## 路由懒加载

路由中通常会定义不同的页面，这个页面最后被一起打包到一个js文件当中，由于页面比较多，所以打包的文件往往会很大，如果从服务器一次性去请求这个页面，会需要花费一定的时间，甚至用户的电脑还出现短暂的空白情况，这种时候就需要用到路由懒加载。

路由懒加载的主要作用就是将路由对应的组件打包成一个个的js代码块,只有在这个路由被访问到的时候, 才加载对应的组件

正常的加载：

```
import Home from '../components/Home'
const routes={
	path:'/home',
	component:Home
	}
```

懒加载：

```
const routes={
	path:'/home',
	component:()=> import('../components/Home')//用到这个页面的时候再加载
	}
```

懒加载的方式：

1.结合Vue异步组件和webpack的代码分析（不推荐）

```
const Home = resolve => { require.ensure(['../components/Home.vue'], () => { resolve(require('../components/Home.vue')) })};```

2.AMD写法：

```
const About = resolve => require(['../components/About.vue'], resolve);
```

3.ES6中的Vue异步组件和webpack代码分割：

```
const Home = () => import('../components/Home.vue')//动态导入组件
const routes={
	path:'/home',
	component:Home
	}
```

## 路由嵌套

在开发过程中，我们可能会希望一个访问首页的新闻的时候，加载一些新闻的信息，访问消息的时候，加载一些消息的信息。就是说，在路径下面，还有不同的子路径，访问不同的路径展示不同的组件。

**实现步骤：**

1.创建对应的子组件，并且在路由映射中配置对应的子路由，是谁的子路由，就在谁的内部写一个children的数组，数组内部的对象和正常的路由配置映射关系的方法相同。如果需要某个子路由默认显示，则需要在配置路由映射关系时，在children内加一个重定向的路由。

2.在组件内部使用router-view标签，在那个页面内部显示，就将标签添加到哪个页面。

```
const Home = () => import('../components/Home.vue')
const HomeNews = () => import('../components/HomeNews.vue')
//对子组件进行路由懒加载
const HomeMessage = () => import('../components/HomeMessage.vue')//对子组件进行路由懒加载//动态导入组件
const routes={
	path:'/home',
	component:Home，
	children:[
	{
	path:'',
	redirect:'news'
	//将news组件默认显示在首页中，而不是点击才显示其内容
	}，
	{
	//由于他是首页的子路由，所以router-view应该写在首页中，且router-link to需要写成to='/home/news'，写成完整的路径。
		path:'news',//子路由不需要写/
	component:HomeNews，
	},{
		path:'message',
	component:HomeMessage，
	}]
	}
```

## 传递参数

什么是传递参数？当我们从一个页面跳转到另一个页面的时候，我们可能会希望传递一些消息，

传递参数主要有两种类型: params和query
#### params的类型:
1.配置路由格式: /router/:id（冒号后面的内容实际为形参）传递的方式: 在path后面跟上对应的值。传递后形成的路径: /router/123, /router/abc

2.在router-link :to="'/路径/'+id"(注意，此处的to是v-bind:to,需要绑定一下数据，否则id只是一个字符串"id",而不是一个变量)

3.通过route.$params.id拿到传递的值

#### query的类型:
配置路由格式: /router, 也就是普通配置;传递的方式: 对象中使用query的key作为传递方式;传递后形成的路径: /router?id=123, /router?id=abc

2.在router-link :to="{path:'/router',query:{name:'bx2651',age:18}"(注意，此处的to是v-bind:to,需要绑定一下数据，否则id只是一个字符串"id",而不是一个变量)

传递参数也可以不使用router-link来传递，比如希望通过一个按钮来跳转页面并实现参数的传递，则可以这么写：

```

<script>
...
methods:{
	paramsClick(){
		this.$router.push('/cart'+userId)
	},
	queryClick(){
		this.$router.push({
			path:'/cart',
			query:{
				name:'baixue',
				age:18
			}
		})
	}
}
</script>

//在跳转到的页面拿传递的参数：
mounted() {
  console.log(this.$router.history.current.query.name);
  },
  this.drawFocus(this.$router.history.current.query.name);

```


## 导航守卫

在一个SPA应用中, 如何改变网页的标题呢?
网页标题是通过title来显示的, 但是SPA只有一个固定的HTML, 切换不同的页面时, 标题并不会改变.但是我们可以通过JavaScript来修改title的内容.window.document.title = '新的标题'.
那么在Vue项目中, 在哪里修改? 什么时候修改比较合适呢?
#### 普通的修改方式:
我们比较容易想到的修改标题的位置是每一个路由对应的组件.vue文件中.通过mounted声明周期函数, 执行对应的代码进行修改即可.但是当页面比较多时, 这种方式不容易维护(因为需要在多个页面执行类似的代码).有没有更好的办法呢? 使用导航守卫即可.
#### vue的修改方式：
vue-router提供的导航守卫主要用来监听监听路由的进入和离开的.vue-router提供了beforeEach和afterEach的钩子函数, 它们会在路由即将改变前和改变后触发.

```
const routes={
	path:'/home',
	component:Home,
	meta:{
		title:'首页'
		//2.在所有需要修改标题的路径下面加meta属性，属性内部写需要修改的title标题。
	}
}


//1.调用router.beforeEach的函数。注意点：这个函数原本是自动执行的，其内部会调用next函数，但由于我们现在手动调了它用，导致手动调用的覆盖了原来的函数，所以我们在调用时必须执行一下next函数。

router.beforeEach(to,from,next){
	document.title = to.meta.title//由于当前存在路由嵌套，所以会拿不到最外层的页面的标题首页
	document.title = to.matched[0].meta.title
	next()//前置钩子必须调next
}

```

#### 路由独享守卫
#### 组件内守卫
#### 全局解析守卫


## keep-alive
keep-alive是vue内置的组件，可以使被包含的组件保留状态，避免每次重新渲染。使用方法：

将router-view标签放到keep-alive标签里。

如果某一个或几个组件需要被频繁创建，则在router-view标签里写exclude='name1,name2',name为需要被频繁创建的组件的name属性。

有时候，我们可能会遇到这样一个场景：

离开B页面进入C页面，缓存B页面数据（keepAlive: true）
离开B页面进入A页面，不缓存B页面数据（keepAlive: false)

那么，我们可以这么写：

```
// 操作指定name的路由的元信息
private changeKeepAlive (parentName: string, name: string, keepAlive: boolean) {
  // @ts-ignore
  this.$router.options.routes.map((item: any) => {
    if (item.name === parentName) {
      item.children.map((a: any) => {
        if (a.name === name) {
          a.meta.keepAlive = keepAlive
        }
      })
    }
  })
}

beforeRouteLeave (to: any, from: any, next: any) {
    // 导航离开该组件的对应路由时调用
    // 可以访问组件实例 `this`
    if (to.name === 'C') {
      this.changeKeepAlive('Home', 'B', true)
    } else {
      this.changeKeepAlive('Home', 'B', false)
    }
    next()
  }

```