# 组件化开发

将所有的逻辑全部都放在一起，处理起来会很麻烦，而且不利于后续的管理和开发。但如果将页面拆分成很多小的功能块，每个功能都完成自己这部分独立的功能，那么这个页面管理和维护就变得容易了。


#### Vue的组件化思想：
1.他提供了一种抽象，让我们可以开发出一个个独立可复用的小组件来构造我们的应用。

2.任何应用都会被抽象成一颗组件树。


#### 组件使用的基本步骤：
1.创建组件构造器：调用Vue.extend()方法

2.注册组件：调用Vue.component()方法

3.使用组件

```
<body>
    <div id="app">
            <!-- 3.使用组件 -->
            <my-cpn></my-cpn>
            <my-cpn></my-cpn>
    </div>
    
    <script>
        // 1.创建组件构造器对象
        const cpnC = Vue.extend({
            template:`
            <div>
                <h2>我是标题</h2>
                <p>我是内容</p>
            </div>`
        })
        // 2.注册组件
        // Vue.component("组件的标签名","组件构造器对象")//全局组件，没有s，一般只创建一个全局组件，全局都可以使用
        Vue.component('my-cpn',cpnC)

        var vm = new Vue({
            el: '#app',
            data: {             
            },
            methods: {             
            }，
            components:{//局部组件，需要加s，表示可创建多个，只能在当前接管的区域内使用
            }             
        })
    </script>
</body>

</html>
```

##### 组件的语法糖写法：
```
<body>
    <div id="app">
            <!-- 3.使用组件 -->
            <my-cpn></my-cpn>
            <my-cpn></my-cpn>
    </div>
    <script>
        // 注册全局组件的语法糖：
        Vue.component('my-cpn',{
            template:`
            <div>
                <h2>我是标题</h2>
                <p>我是内容</p>
            </div>`
        })
        var vm = new Vue({
            el: '#app',
            data: {               
            },
            methods: {             
            },
            components:{//局部组件语法糖
            'my-cpn',{
            template:`
            <div>
                <h2>我是标题</h2>
                <p>我是内容</p>
            </div>`
            } 
        })
    </script>
</body>
```

##### 语法糖抽离模板
1.使用script标签抽离模板

```
<body>
    <div id="app">
        <!-- 3.使用组件 -->
        <my-cpn></my-cpn>
        <my-cpn></my-cpn>
    </div>
    <script type="text/x-template" id="my-cpn">
        <div id="">
                <h2>我是标题</h2>
                <p>我是内容</p>
         </div> 
    </script>

    <script>
        // 注册全局组件的语法糖：
        Vue.component('my-cpn', {
            template: '#my-cpn'
        })
        var vm = new Vue({
            el: '#app',
            data: {
            },
            methods: {
            },
            components: {}
        })
    </script>
</body>
```
2.使用template标签抽离模板（推荐）

```
<body>
    <div id="app">
        <!-- 3.使用组件 -->
        <my-cpn></my-cpn>
        <my-cpn></my-cpn>
    </div>
    <template id="my-cpn">
        <div id="">
                <h2>我是标题1</h2>
                <p>我是内容2</p>
         </div> 
    </template>

    <script>
        // 注册全局组件的语法糖：
        Vue.component('my-cpn', {
            template: '#my-cpn'
        })
        var vm = new Vue({
            el: '#app',
            data: {
            },
            methods: {
            },
            components: {}
        })
    </script>
</body>
```
## 组件中的data数据

1.组件无法访问实例中的data数据，组件拥有自己的data数据。

2.实例中的data数据是对象，而组件中的data数据是函数。

3.组件中的data函数需要return一个对象，对象内部保存着数据。

### 组件中的data为什么是函数：
函数可以保证多次调用子组件的时候，子组件中的data返回的是调用者各自的数据。如果data不是函数，会导致多个调用者操作同一个data数据。


## 父组件向子组件传值

由于子组件无法直接访问父组件中的data数据和methods方法，但有些数据是放在页面顶层的，所以需要通过props（properties）来传递数据，具体步骤如下：

1.把父组件中需要传递给子组件的数据，通过v-bind，以属性绑定的方法，传递到子组件内部。

2.子组件通过props属性来接收父组件传进来的数据。

3.在子组件中使用数据。


```
<body>
    <div id="app">
            <!-- 1.把父组件中需要传递给子组件的数据，通过v-bind，以属性绑定的方法，传递到子组件内部。 -->
        <cpn v-bind:cmovies="movies" :cmessage="massage"></cpn>
    </div>

    <template id="cpn">
        <div id="">
            <!-- 3.在子组件中使用父组件中的数据 -->
                <h2>{{cmessage}}</h2>
                <ul>
                    <li v-for="item in cmovies">{{item}}</li>
                </ul>
         </div> 
    </template>

    <script>
        const cpn = {
            template:'#cpn',
            // 2.子组件通过props属性来接收父组件传进来的数据。
            // props:['cmovies','cmessage'],//props可以是数组也可以是对象
            props:{
                cmovies:Array,//方式1.可以用来限制类型
                cmessage:{//方式2.可以增加参数
                    type:String,
                    default:'aaaaa'//当没有传入数据时，cmassage的默认值，但当上面的类型是对象或数组时，默认值必须是函数
                    required:true//required是必传项，为真时不传会报错
                }
            },
            data(){
                return{}
            },
            methods:{}
        }
        var vm = new Vue({
            el: '#app',
            data: {
                massage:'hello',
                movies:['海王','海贼王']
            },
            components:{
                cpn
            }
        })
    </script>
</body>
```


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="vue2.5.16.js"></script>
</head>

<body>
    <div id="app">
        <!-- 1.：父组件在引用子组件的时候， 通过 属性绑定（v-bind:）的形式,  -->
        <!--   把 需要传递给 子组件的数据，以属性绑定的形式，传递到子组件内部，供子组件使用 -->
        <component1 v-bind:parent-msg="msg"></component1>
    </div>

    <!-- 定义子组件的模板 -->
    <template id="myTemplate">
        <!-- 3.在子组件的模板中，使用props中的属性 -->
        <h2 @click="change">我是子组件。我想使用父组件中的数据parentMsg： {{ parentMsg }}</h2>
    </template>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: {
                msg: '父组件中的数据123'
            },
            methods: {},
            components: {
                // 子组件默认无法访问到 父组件中的 data 中的数据 和 methods 中的方法
                component1: { //将子组件的名称定义为 component1
                    template: '#myTemplate',
                    data() { // 注意： 子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的，比如： 子组件通过 Ajax ，请求回来的数据，都可以放到 data 身上；
                        // data 上的数据，都是可读可写的
                        return {
                            title: '子组件私有的数据 title',
                            content: '子组件私有的数据 content'
                        }
                    },
                    // 注意： 组件中的 所有 props 中的数据，都是通过 父组件 传递给子组件的
                    // props 中的数据，都是只读的，无法重新赋值
                    props: ['parentMsg'], // 2.把父组件传递过来的 parentMsg 属性，先在 props 数组中，定义一下，这样，才能使用这个数据
                    directives: {},
                    filters: {},
                    components: {},
                    methods: {
                        change() {
                            // 下面这行会报错，因为子组件不要直接修改父组件中的data数据
                            // this.parentMsg = '被修改了'
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>
```


##### 注意点：父子组件传值时不支持驼峰命名，如果使用的驼峰命名法，v-bind:绑定的值是需要通过-来连接的，比如parentMsg在用的时候应该写成:parent-msg

##### 子组件中，data中的数据和props中的数据的区别：

1.子组件中的 data 数据，并不是通过 父组件传递过来的，而是子组件自身私有的，比如： 子组件通过 Ajax ，请求回来的数据，都可以放到 data 身上。props 中的数据，都是通过 父组件 传递给子组件的。

2.data中的数据是可读可写的；props中的属性只是可读的，无法重新赋值，重新赋值会报错（也就是说，子组件不要直接去修改父组件中的数据）。

**3.子组件在拿到父组件传回来的值，保存在props属性中后，如果还需要先对值进行处理，然后再渲染到页面上的话，可以通过watch来接受该值，然后进行处理**

```
props: ['chartData'],
    data(){
      return {
        cData: []
      }
    },
    watch: {
      chartData: function(newVal,oldVal){
        this.cData = newVal; //newVal即是chartData
        this.drawChart();
      }
    }

```

## 父组件向子组件传递方法

具体步骤：

1.把父组件要传递给子组件的方法，通过v-on绑定：@parent-show='show'，其中，show为父组件中的方法名，用parent-show来接收。

2.子组件的通过methods来定义一个方法，方法内部通过this.$emit.('parent-show')来接收父组件传入的方法。

3.子组件通过第二步中的方法名来调用方法

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="vue2.5.16.js"></script>
</head>

<body>
    <div id="app">
        <!-- 父组件向子组件 传递 方法，是通过 事件绑定机制； v-on。当我们自定义了 一个 事件属性 parent-show（这个地方不能用驼峰命名）之后，-->
        <!-- 那么，子组件就能够，通过 emit 来调用 传递进去的 这个 方法了 -->
        <!-- 【第一步】。意思是说，`show`是父组件的方法名，`parent-show`是自定义的时间属性，稍后要在子组件中用到 -->
        <component1 @parent-show='show'></component1>
    </div>

    <!-- 定义子组件的模板 -->
    <template id="myTemplate">
        <!-- 【第二步】按照正常的写法来：点击按钮，调用子组件的方法 -->
        <div @click="childClick">我是子组件，点击调用父组件的方法</div>
    </template>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: { //父组件的data
                // msg: '父组件中的数据'
            },
            methods: {
                show: function () { // 定义父组件的show方法
                    console.log('父组件提供的方法');
                }
            },
            components: {
                component1: { //将子组件的名称定义为 component1
                    template: '#myTemplate',
                    data() { // 子组件的data
                        return {
                            // content: '子组件私有的数据 content'
                        }
                    },
                    props: [''],
                    directives: {},
                    filters: {},
                    components: {},
                    methods: {
                        childClick() {
                            // 当点击子组件的按钮时，如何 拿到 父组件传递过来的 func 方法，并调用这个方法？？？
                            //  emit 英文原意： 是触发，调用、发射。意思是，触发父组件的方法
                            // 【第三步】 在子组件的方法中，通过 emit 触发父组件的方法
                            this.$emit('parent-show');
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>

```

## 子组件向父组件传值

代码举例：

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="vue2.5.16.js"></script>
</head>

<body>
    <div id="app">
        <component1 @parent-show='show'></component1>
    </div>

    <!-- 定义子组件的模板 -->
    <template id="myTemplate">
        <h2 @click="childClick">我是子组件，点击调用父组件的方法</h2>
    </template>

    <script>
        // 创建 Vue 实例，得到 ViewModel
        var vm = new Vue({
            el: '#app',
            data: { //父组件的data
                // msg: '父组件中的数据'
            },
            methods: { // 定义父组件的方法
                show: function (arg1, arg2) { //【第二步】父组件里放两个参数，这个两个参数就代表着子组件中的`child 123`、`child 789`
                    console.log('父组件提供的方法');
                    console.log('打印子组件传递过来的参数。参数一：' + arg1 + '，参数二：'+ arg2);
                }
            },
            components: {
                component1: { //将子组件的名称定义为 component1
                    template: '#myTemplate',
                    data() { // 子组件的data
                        return {
                            // content: '子组件私有的数据 content'
                        }
                    },
                    props: [''],
                    directives: {},
                    filters: {},
                    components: {},
                    methods: {
                        childClick() {
                            // 子组件如果要给父组件传递参数，在触发 emit 的时候，通过参数的形式带出去就可以了
                            // 【第一步】在子组件里，我们带两个参数出去，传给父组件
                            this.$emit('parent-show', 'child 123', 'child 789');
                        }
                    }
                }
            }
        });
    </script>
</body>

</html>
```

## 子组件向父组件传递事件

子组件中可能发生了一些事件，而这个事件需要让他的父组件知道并请求相关数据。

```
<body>
    <div id="app">
        <!-- 父组件通过事件绑定获取事件并传入自己的事件 -->
        <cpn v-on:itemclick="cpnClick"></cpn>
    </div>

    <!-- 子组件模板 -->
    <template id="cpn">
        <div id="">

            <button v-for="item in categories" @click="btnClick(item)">{{item.name}}</button>
        </div>
    </template>

    <script>
        //子组件
        const cpn = {
            template: '#cpn',
            data() {
                return {
                    categories: [
                        { id: 'aaa', name: '热门推荐' },
                        { id: 'aaa', name: '手机数码' },
                        { id: 'aaa', name: '家用家电' },
                        { id: 'aaa', name: '电脑办公' }]
                }
            },
            methods: {
                btnClick(item){
                    //1.子组件通过$emit将自定义事件发射出去
                    this.$emit('itemclick',item)
                }
            }
        }
        // 父组件
        var vm = new Vue({
            el: '#app',
            data: {
                massage: 'hello',
                movies: ['海王', '海贼王']
            },
            components: {
                cpn
            },
            methods:{
                // 3.父组件收到子组件的自定义事件
                cpnClick(item){
                    console.log(item.name)
                }
            }
        })
    </script>
</body>
```


#### 父子组件通信案例
```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="../vue.js"></script>
</head>

<body>
    <div id="app">
        <!-- 1.通过绑定的方式将父组件中的data数据：num1和num2绑定到number1和number2上 -->
        <!-- 9.将子组件中传递出来的数据获取到，并通过事件绑定传递给父组件 -->
        <cpn :number1="num1" 
            :number2='num2'
            @num1change='num1change'
            @num2change='num2change' ></cpn>
    </div>

    <template id="cpn">
        <div>
            <!--4. 通过子组件return出来的props数据 -->
            <h2>{{dnumber1}}</h2>
            <!-- 4.或直接获取props中的数据 -->
            <h2>{{number1}}</h2>
            <!-- 5.监听input标签所获取到的新的数字，并传递给子组件中的num1input方法 -->
            <input type ="text" v-bind:value="dnumber1" @input="num1input" >
            <h2>{{dnumber2}}</h2>
            <h2>{{number2}}</h2>
            <input type ="text" v-bind:value="dnumber2" @input="num2input">
        </div>
    </template>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
                num1: 0,
                num2: 1
            },
            methods:{
                num1change(value){//10.父组件中的methods接受到页面传递进来的数据，并将数据返回给父组件data数据
                    this.num1=value
                },
                num2change(value){
                    this.num2=value
                }
            },
            components: {
                cpn: {
                    template: '#cpn',
                    props: ['number1','number2'],//2.用props属性来接收父组件传递进来的数字的num1和num2
                    data(){
                        return{//3.用data中的数据接受父组件中传递进来的两个数字，并return出去
                            dnumber1:this.number1,
                            dnumber2:this.number2
                        }
                    },
                    methods:{
                        num1input(event){//6.接收到子组件中传递进来的新的input事件
                            this.dnumber1=event.target.value//7.将input事件的value值传递给子组件中的data数据
                            this.$emit('num1change',this.dnumber1)//8.将修改后的数字传递给页面元素
                        },
                        num2input(event){
                            this.dnumber2=event.target.value
                            this.$emit('num2change',this.dnumber2)
                        }
                    }
                }
            }
        })
    </script>
</body>

</html>
```

## 父子组件的访问方式

父组件访问子组件：使用$children或$refs来访问,一般不通过$children拿数据，因为这种方式拿到的是index对应的数据，而index不是一成不变的,一般通过refs访问子组件，默认是空的对象，需要在组件中加上ref属性，然后通过ref的属性值拿数据。

```
<body>
    <div id="app">
        <cpn ></cpn>
        <cpn ref="aaa"></cpn>
        <cpn ></cpn>
        <button @click="btnClick">按钮</button>
    </div>

    <template id="cpn">
        <div>
            我是子组件
        </div>
    </template>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
                massage:"你好啊"
            },
            methods:{
                btnClick(){
                    // for(let i of this.$children){ //一般不通过$children拿数据，因为这种方式拿到的是index对应的数据，而index不是一成不变的
                    //     console.log(i.name)
                    //     i.showMessage()
                    // }
                    console.log(this.$refs.aaa.name)//一般通过refs访问子组件，默认是空的对象，需要在组件中加上ref属性，然后通过ref的属性值拿数据
                    
                }
            },
            components: {
                cpn: {
                    template: '#cpn', 
                    data(){
                        return{
                            name:"我是子组件的名字"
                        }
                    },                  
                    methods:{
                        showMessage(){
                            console.log("show")
                        }
                    }
                }
            }
        })
    </script>
</body>
```

### 子组件访问父组件：使用$parent
在实际开发中用的非常少，因为实际开发中组件之间相互都是独立的，这种写法不够独立。

```

<body>
    <div id="app">
        <cpn></cpn>

    </div>

    <template id="cpn">
        <div>
            <ccpn></ccpn>
        </div>
    </template>
    <template id="ccpn">
        <div>
            我是子组件
            <button @click="btnClick">按钮</button>
        </div>
    </template>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
                massage: "你好啊"
            },
            components: {
                cpn: {
                    template: '#cpn',
                    data(){
                        return{name:'我是cpn组件的name'}
                    },
                    components: {
                        ccpn: {
                            template: '#ccpn',
                            methods: {
                                btnClick() {
                                    //1.访问父组件
                                    console.log(this.$parent.name);
                                }
                            }
                        }
                    }
                }
            }
        })
    </script>
</body>
```

### 访问根组件

用的也很少，一般根组件中不放东西
```

<body>
    <div id="app">
        <cpn></cpn>

    </div>

    <template id="cpn">
        <div>
            <ccpn></ccpn>
        </div>
    </template>
    <template id="ccpn">
        <div>
            我是子组件
            <button @click="btnClick">按钮</button>
        </div>
    </template>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
                massage: "你好啊"
            },
            components: {
                cpn: {
                    template: '#cpn',
                    data(){
                        return{name:'我是cpn组件的name'}
                    },
                    components: {
                        ccpn: {
                            template: '#ccpn',
                            methods: {
                                btnClick() {
                                    //1.访问根组件中的massage
                                    console.log(this.$root.massage);
                                }
                            }
                        }
                    }
                }
            }
        })
    </script>
</body>
```

