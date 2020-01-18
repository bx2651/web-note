一般我们不会手动进行写webpack文件，而是使用脚手架来生成。

为什么在开发大型项目时，会需要使用脚手架：

1.大型项目中，我们需要考虑代码目录结构、项目结构、部署、热加载、代码单元测试等。

2.如果每个项目都手动完成这些工作，那么效率会比较低，所以通常会选择脚手架工具来帮助我们完成这些事情。

### 使用前提：

Node：因为在按照脚手架时会自动生成webpack配置，而webpack是依赖于node环境的。

安装Node环境会自动安装npm包管理工具，可以通过在命令行输入以下内容来获取当前电脑的npm和node的版本号。

```
npm -v
node -v

```

### 安装脚手架

```
npm install -g @vue/cli

```
-g是globla全局的意思

### 创建项目

```
vue create project_name
```

* project name:可以单独取名字，也可以和文件夹名字相同，通常做法是和文件夹名字相同。
* project description:项目的描述。
* Author:作者
* 选择runtime+compiler或runtime-only,前者是官方推荐的，但在实际开发中，后者用的更多。
* install vue-router:安装路由
* use eslint:对代码进行规范限制，比较不太好用，如果选择的是yes,可以选择自己配置规范，或使用标准规范，或使用airbnb的规范
* set up unit test:是否集成单元测试，对模块进行测试
* set e2e tests with nightwatch:end to end测试，端到端测试，依赖nightwatch直接写出一套端到端测试，自动在浏览器中进行一系列测试。一般由高级的测试人员进行编写
选择使用npm或yarn

根据刚才的选择进行安装。


### 补充：runtime+compiler和runtime-only的区别

官方：

```

Runtime + Compiler: recommended for most users
推荐给大多数用户

Runtime-only: about 6KB lighter min+gzip, but templates (or any Vue-specificHTML) are ONLY allowed in .vue files - render functions are required elsewhere
大约6KB的轻量级min+gzip，但是模板(或任何特定于vue的html)只允许在.vue文件中使用——其他地方需要呈现函数

```

其实二者的区别只在main.js文件当中。

我们先看一下Vue程序的运行过程：

1. template模板传给vue,vue保存到vue.options里保存
2. 将模板parse解析为ast(抽象语法树)abstract syntax tree
3. compiler编译为render函数
4. 通过render函数将template翻译未virtual DOM虚拟DOM,最终形成虚拟DOM树
5. 渲染成真实DOM树

```
//runtime-compiler
new Vue({
	el:"#app",
	template:"<APP/>",
	components:{App}
})
```

```
//runtime-only
new Vue({
	el:"#app",
	render:h=>(App)
	//直接render属性渲染这一步开始，省去前两步。
})
```

在render函数中，render:h=>(App)本质上其实是传了一个函数给render,这个函数叫createElement

1.普通用法：

```
new Vue({
	el:"#app",
	render:function(){
		//createElement('标签',{标签的属性},[标签的内容]),这个函数会将挂载的app替换掉，
		return createElement('h2',{class:"box"},['hello world'])
	}

})
```

2.传入组件对象：

```
new Vue({
	el:"#app",
	render:function(){
		return createElement(组件名)
	}
})
```


3.传入App组件对象：

```
new Vue({
	el:"#app",
	render:function(){
		return createElement(App)
	}
})
```

而第三种用法，就是我们的runtime-only：

```
new Vue({
	el:"#app",
	render:h=>(App)
})
```

那么问题来了，我们的App是一个template，我们难度不需要解析template吗？

回答是**不需要**的：App的template最终编译出来的就是render函数，所以我们拿到的App对象，没有包含任何template。

那么，.vue文件中的template文件是由谁处理的呢？

我们在最开始为了运行和编译.vue文件，安装了vue-loader和**vue-template-compiler**：前者帮助我们加载.vue文件，后者帮助我们处理template模板，将他转换为render函数。

