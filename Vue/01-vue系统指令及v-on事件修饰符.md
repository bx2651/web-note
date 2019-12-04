# Vue.js
1.vue是目前最火的前端框架；react是最流行的前端框架(react可以进行手机app和网站的开发，vue借助weex也可以进行手机app开发)
2.前端三大框架：vue,react,angular
3.vue是进行构建前端页面的的框架，只关注视图层

## vue的特点和高级功能
1.解耦视图和数据
2.可复用的组件
3.前端路由技术
4.状态管理
5.虚拟DOM

## vue中的MVVM



```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <!--1、导入Vue的包-->
    <script src="https://cdn.jsdelivr.net/npm/vue@2.6.10/dist/vue.js"></script>
</head>
<body>
<!--这个div区域就是MVVM中的 View-->
<div id="div1">
    {{name}}
</div>
</body>

<script>
    // 2、创建一个Vue的实例
    //new出来的对象就是MVVM中的 View Module（调度者）
    var myVue = new Vue({
        el: '#div1', //当前vue对象将接管上面的div1区域,string|HTMLElement
        data: {//data就是MVVM中的 module,Pbject|Function
            name: 'smyhvae'
        }
    });
</script>
</html>
```

## Vue的系统指令
### v-cloak和v-text
**相同点：**都没有闪烁问题

**不同点：**1.两者虽然都没有闪烁问题，但是解决闪烁问题的原理不同。

v-cloak+插值表达式(mustache语法)将数据放到页面中，在Vue实例化完毕之前，都是隐藏状态的，实例化完毕后，v-cloak属性自动移除，插值表达式显示出来。
```
<span v-cloak>{{name}}</span>
```

v-text是通过属性绑定数据插入到页面中，不存在插值表达式
```
<span v-text="name"></span>
```

2.v-cloak+插值表达式只会替换插值表达式自己的占位符，不会把整个元素都清空。

v-text会覆盖元素中原本的内容

### v-html
v-html会被解析为html元素

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>

<body>
    <div id="app">
        <p>{{msg}}</p>
        <p v-text="msg"></p>
        <p v-html="msg"></p>

    </div>
    <script src="vue2.5.16.js"></script>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                msg: '<h1>我是一个大大的h1标题</h1>'
            }
        })
    </script>

</body>

</html>
```

### v-once
加上v-once后，页面中的插值表达式的值不随着data数据的变化而变化。
```
<div id="app">
	<h1>{{msg}}</h1> //会随着msg的内容改变而改变
	<h1 v-once>{{msg}}</h1>//不随着msg的内容改变而改变
</div>
<script>
	const vm = new Vue({
		el:'#app',
		data:{
			msg:"你好"
		}
	})
</script>
```

### v-pre
```
类似于<pre></pre>的标签，不解析内容，直接将内容原封不动的展示出来。
<h1 v-pre>{{msg}}</h1> //显示为{{msg}}
```

### v-bind:属性绑定
动态的给属性添加值，比如网页上的图片往往都不会写死，而是动态的获取地址，vue实例通过解析服务器返回来的数据获取到图片的url,通过v-bind绑定到src属性上，当地址发生改变时，页面上的图片也会随之更新。

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <style>
  </style>
</head>

<body>
  <div id="div1">
    <!-- value里的值只是简单的字符串 -->
    <input type="text" value="name">
    <!-- 加上 v-bind 之后，value里的值是 Vue 里的变量 -->
    <input type="text" v-bind:value="name">
    <!-- 超链接后面的path是 Vue 里面的变量 -->
    <a v-bind="{href:'http://www.baidu.com/'+path}">超链接</a>

  </div>
</body>

<script src="vue.js"></script>
<script>
  new Vue({
    el: '#div1',
    data: {
      name: 'bx2651',
      path: `2.html`
    }
  });
</script>

</html>
```
v-bind:value可简写为:value

**动态绑定class的四种方式**

```
<body>
    <div id="app">
        <h1 :class="['my-red', 'my-thin']">我是数组方式添加的，我需要加单引号</h1>
        <h1 :class="[ {'my-active':flag} ]">我是数组中使用对象添加的类，flag的值为true则会添加这个类</h1>
        <h1 :class="[flag?'my-active':'']">我是通过数组中使用三元表达式添加的类，如果flag为true则会添加这个类，我的可读性较差</h1>
        <h1 :class="{style1:true, style2:false}">我是直接使用对象添加的类</h1>
    </div>
    

    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                flag: true
            }
        });
    </script>
</body>
```

#### v-on:事件绑定
```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Title</title>
  <!--vue的版本：2.5.15-->
  <script src="vue.js"></script>
</head>

<body>
  <!--这个div区域就是MVVM中的 View-->
  <div id="div1">
    <!-- 给button节点绑定按钮的点击事件 -->
    {{name}}
    <button v-on:click="change">改变name的值</button>
    <!--不需要给change方法传递参数时，change后面的括号可以省略，如果change方法需要传参数但没有传，,但是写了小括号，则会传入undefined，如果没有写小括号，则会将浏览器产生的event事件对象作为参数传入-->
  </div>


</body>

<script>
  //new出来的对象就是MVVM中的 View Module
  var myVue = new Vue({
    el: '#div1', //当前vue对象将接管上面的div区域
    data: { //data就是MVVM中的 module
      name: 'smyhvae'
    },

    //注意，下方这个 `methods` 是Vue中定义方法的关键字，不能改
    //这个 methods 属性中定义了当前Vue实例所有可用的方法
    methods: {
      change: function() { //上面的button按钮的点击事件
        this.name += '1';
      }
    }
  });
</script>

</html>
```

**如果change方法不需要传递参数，change后面的括号可以省略，change方法需要传参数但没有传时,写了小括号，则会传入undefined，没有写小括号，则会将浏览器产生的event事件对象作为参数传入**

v-on:click可简写为@click.

v-on的常用事件：

@click

@keydown

@keyup

@mousedown

@mouseover

@submit

##### v-on事件修饰符：

v-on 提供了很多事件修饰符来辅助实现一些功能。事件修饰符有如下：

.stop 阻止冒泡。本质是调用 event.stopPropagation()。

.prevent 阻止默认事件（默认行为）。本质是调用 event.preventDefault()。

.capture 添加事件监听器时，使用捕获的方式（也就是说，事件采用捕获的方式，而不是采用冒泡的方式）。

.self 只有当事件在该元素本身（比如不是子元素）触发时，才会触发回调。

.once 事件只触发一次。

.{keyCode | keyAlias} 只当事件是从侦听器绑定的元素本身触发时，才触发回调。

.native 监听组件根元素的原生事件。

PS：一个事件，允许同时使用多个事件修饰符。

写法示范：
```
          <!-- click事件 -->
        <button v-on:click="doThis"></button>

        <!-- 缩写 -->
        <button @click="doThis"></button>

        <!-- 内联语句 -->
        <button v-on:click="doThat('hello', $event)"></button>

        <!-- 阻止冒泡 -->
        <button @click.stop="doThis"></button>

        <!-- 阻止默认行为 -->
        <button @click.prevent="doThis"></button>

        <!-- 阻止默认行为，没有表达式 -->
        <form @submit.prevent></form>

        <!--  串联修饰符 -->
        <button @click.stop.prevent="doThis"></button>
        
```
### 跑马灯
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="vue.js">
    </script>
</head>

<body>
    <div id="app">
        
        <input type="button" value="浪起来" @click="lang">
        <input type="button" value="猥琐" @click="stop">
        <h4>{{msg}}</h4>
        <!-- 将msg里的信息通过插值表达式放入到网页中 -->
    </div>
    <script>
        var vm = new Vue({//vm实例会监听自己身上的数据变化，一旦数据发生变化，则将变化更新到页面上
            el: '#app',//接管id为app的区域
            data: {
                msg: '猥琐发育，别浪~~',
                timer:null
            },
            methods: {
                lang() {
                    // 在执行定时器之前，先判断一下是否已经存在定时器了（即字符串是否已经在不断拼接了），如果已经存在定时器，则return
                    if(this.timer!=null)return;
                    // 添加一个定时器，每400毫秒调用一次，从而实现字符串动起来的效果
                    this.timer = setInterval( ()=>{
                        console.log(this.msg)
                        //获取第一个字符
                        var msgStart = this.msg.substring(0, 1)
                        // 获取后面所有的字符
                        var msgEnd = this.msg.substring(1)
                        // 将第一个字符拼接到最后
                        this.msg = msgEnd + msgStart
                    }, 400)

                },
                stop(){
                    // 将定时器清空
                    clearInterval(this.timer)
                    // 将定时器设置为Null,否则下次将无法正常开启
                    this.timer = null;
                }
            }
        })

    </script>
</body>

</html>
```
VM实例，会监听自己身上 data 中所有数据的改变，只要数据一发生变化，就会自动把最新的数据，从data上同步到页面中去。

这样做的好处是：程序员只需要关心数据，不需要考虑如何重新渲染DOM页面；减少DOM操作

### v-model
v:bind实现的是数据的单向绑定，从M自动绑定到V

v-model实现的是双向数据绑定，可以实现数据的双向同步，但只能用在表单元素当中。

常见的表单元素包括：input(radio（当v-model和radio绑定了同一个值的时候，不需要绑定name属性，也可以做到互斥，单选框对应的是布尔值）, text, address, email....) 、select、checkbox（多选框对应的是数组） 、textarea。

（label标签的好处：label标签的for属性和表单元素的id属性绑定，可以聚焦，一般都会写）

代码举例：

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Document</title>
    <script src="vue.js"></script>
</head>
<body>
<div id="app">

    <form action="#">
    	<!-- 将 input 标签中的value值双向绑定到 Vue实例中的data。注意，v-model 后面不需要跟冒号 -->
        <input type="text" id="username" v-model="myAccount.username">
        <input type="password" id="pwd" v-model="myAccount.userpwd">

        <input type="submit" v-on:click="submit1" value="注册">

    </form>
</div>
</body>

<script>
    var vm = new Vue({
        el: '#app',
        //上面的标签中采用v-model进行双向数据绑定，数据会自动更新到data里面来
        data: {
            name: 'smyhvae',
            myAccount: {username: '', userpwd: ''}
        },
        //在methods里绑定各种方法，根据业务需要进行操作
        methods: {
            submit1: function () {
                alert(this.myAccount.username + "  pwd=" + this.myAccount.userpwd);
            }
        }
    });
</script>

</html>
```

v-model.lazy:不实时绑定，敲回车的时候绑定

v-model。number:在默认情况下赋值都是string类型，可以通过v-model.number将默认类型改为number类型

v-model.trim修饰符:去掉字符串中的空格

### v-for循环遍历

```
<body>
  <div id="app">
    <ul>
      <!-- 使用v-for对多个li进行遍历赋值 -->
      <!-- 遍历数组时，括号里如果写两个参数：第一个参数代表值，第二个参数代表index 索引,如果只有一个参数，则代表值；在遍历对象时，如果只有一个参数，则为value，如果有两个参数，则为(value,key),如果有三个参数，最后一个参数为index -->
      <li v-for="(item,index) in list">{{index}} {{item}}</li>
    </ul>
    
    
  </div>
</body>

<script>
  var vm = new Vue({
    el: '#app',
    data: {
      list: [1, 2, 3]
    }

  });
</script>
```
在使用v-for遍历数组，在数组中插入元素时，会将插入元素之后的元素重新赋值一遍，比较消耗性能，所以建议添加:key="item"属性进行绑定,但添加key属性，必须保证key是唯一的。



### v-if和v-else

```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <title>Document</title>
  <script src="vue.js"></script>
</head>

<body>
  <div id="app">
    <button v-on:click="toggle">显示/隐藏</button>
    <div v-if="isShow">我是盒子1</div>
    <div v-else>我是盒子2，当盒子1不显示时，显示我</div>
  </div>
</body>

<script>
  new Vue({
    el: '#app',
    data: {
      isShow: true
    },
    methods: {
      toggle: function() {
        this.isShow = !this.isShow;
      }
    }
  });
</script>

</html>
```
### v-if和v-show

区别：

1.当条件为false时，v-if本质上不存在DOM中。

2.v-if每次都会重新添加/删除元素，而v-show是加了一个display：none的属性

3.v-if有较高的切换性能消耗(切换频率低选if)而v-show有较高的初始渲染消耗（切换的频率高选show）

4.v-if是惰性的，如果初始条件为假，则什么也不做；只有在条件第一次变为真时才开始局部编译（编译被缓存后，然后再切换的时候进行局部卸载); v-show是在任何条件下（无论首次条件是否为真）都被编译，然后被缓存，而且DOM元素保留；

5.v-if适合运营条件不大可能改变；v-show适合频繁切换。
