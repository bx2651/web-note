ECMAScript是JavaScript的核心，但如果要在Web中使用JS,那么BOM才是真正的核心。 ————JS高程

## window对象：

BOM的核心对象是window,它表示浏览器的一个实例。在浏览器中，window对象悠着双重角色，它既是通过JS访问浏览器窗口的一个接口，又是ECMAScript规定的Global对象。也正是这样的双重角色，因此所有在全局作用域中声明的变量，都会变成window对象的属性和方法。

不过，定义全局变量和在window上直接定义属性还是有区别的：

```
var age = 18;
window.name = 'bx2651';
delete window.age;
delete window.name;
console.log(window.age)//18
console.log(window.name)//undefined

```

可见，定义在window上的属性是可以通过delete删除的，而直接定义的全局变量则不可以。这是因为通过var定义的变量会有一个默认值为false的configurable属性。

### 窗口位置
### 窗口大小
### 打开窗口和关闭窗口
1.打开窗口

```
window.open(url,target,param)

```
##### 参数解释：

* url：要打开的地址。

* target：新窗口的位置。可以是：_blank 、_self、 _parent 父框架。

* param：新窗口的一些设置。

* 返回值：新窗口的句柄。

##### param这个参数，可以填各种各样的参数（），比如：

* name：新窗口的名称，可以为空

* features：属性控制字符串，在此控制窗口的各种属性，属性之间以逗号隔开。

* fullscreen= { yes/no/1/0 } 是否全屏，默认no

* channelmode= { yes/no/1/0 } 是否显示频道栏，默认no

* toolbar= { yes/no/1/0 } 是否显示工具条，默认no

* location= { yes/no/1/0 } 是否显示地址栏，默认no。（有的浏览器不一定支持）

* directories = { yes/no/1/0 } 是否显示转向按钮，默认no

* status= { yes/no/1/0 } 是否显示窗口状态条，默认no

* menubar= { yes/no/1/0 } 是否显示菜单，默认no

* scrollbars= { yes/no/1/0 } 是否显示滚动条，默认yes

* resizable= { yes/no/1/0 } 是否窗口可调整大小，默认no

* width=number 窗口宽度（像素单位）

* height=number 窗口高度（像素单位）

* top=number 窗口离屏幕顶部距离（像素单位）

* left=number 窗口离屏幕左边距离（像素单位）

各个参数之间用逗号隔开就行，但我们最好是把它们统一放到json里。

2、关闭窗口：window.close()

代码实例：

```
 //新窗口 = window.open(地址,是否开新窗口,新窗口的各种参数);
 var a1 = document.getElementsByTagName("a")[0];
 var a2 = document.getElementsByTagName("a")[1];
 a1.onclick = function () {
//举例1： window.open("http://www.jx.com","_blank");
     var json = {
         "name": "helloworld",
         "fullscreen": "no",
         "location": "no",
         "width": "100px",
         "height": "100px",
         "top": "100px",
         "left": "100px"
     };
     window.open("http://www.baidu.com", "_blank", json); //举例2
 }

 //关闭本页面
 a2.onclick = function () {
     window.close();
 }
```

### 间歇调用和超时调用

JavaScript是单线程语言，但它允许通过设置超时值和间歇时间值来调度代码在特定的时刻执行，前者是在制定的时间过后执行代码（setTimeOut），后者是每隔一段时间就执行一次代码(SetInterval)。

### 系统对话框
浏览器通过以下三种方法可以调用系统对话框向用户显示消息。

alert();	//通过此对话框显示的是一些用户无法控制的消息，例如错误信息。用户只能在看完后关闭对话框。

confirm();  //除了OK的按钮外，还有一个取消的按钮，可以让用户决定是否执行给定的操作，其返回值为布尔值。兼容不好，代码如下：

```
if(confirm("are you ok?")){
    alert("i'm so glad you're ok'")
}else{
    alert("i'm sorry to hear that")
}
```

prompt();	//不推荐使用

系统对话框的外观是由浏览器决定的，而无法通过CSS来设置样式。此外，通过以上三种方法打开的对话框都是同步和模态的，也就是说，显示对话框的时候代码会停止执行。而关掉对话框后代码又会恢复执行。

## location对象
location对象的用处不仅表现在它保存着当前文档的信息，还表现在它将URL解析为独立的片段，开发人员可以通过不同的属性访问这些片段。如下所示：

* hash：返回URL中的hash，如果URL中不含散列，则返回空字符串。例：#content
* host：返回服务器名称和端口号。例：www.baidu.com:80
* hostname：返回不带端口号的服务器名称。例：www.baidu.com
* href：返回当前加载的完整的URL。例：https://www.baidu.com
* pathname:返回URL中的文件名或目录。例：/home/
* port：返回URL中的指定端口号，如不含，则返回空字符串。例：8080
* protocol：返回页面使用的协议。例：https:
* search：返回查询字符串，字符串以问号开头。例：?id=123

location对象可以通过编程的方式来访问浏览器的导航系统，设置相应的属性，可以逐段或整体地修改浏览器的URL。

location既是window对象的属性，也是document对象的属性。换句话讲，window.location和document.location引用的是同一个对象。

举例：五秒后跳转到百度：

```
setTimeout(function () {
    location.href = "http://www.baidu.com";
}, 5000);
```

##### location对象的方法：

location.assign()：改变浏览器地址栏的地址，并记录到历史中

设置location.href 就会调用assign()。一般使用location.href 进行页面之间的跳转。

location.replace()：替换浏览器地址栏的地址，不会记录到历史中

location.reload()：重新加载
### 查询字符串参数
### 位置操作


## navigation对象

## history对象

history对象保存着用户上网的历史记录，从窗口被打开的那一刻算起。但是处于安全考虑，开发人员无法得知用户浏览过的URL,不过，借由用户访问过的页面列表，可以在不知道实际URL的情况下实现前进和后退。

使用go方法可以在用户的历史记录中任意向前或向后跳转。这个方法接收一个整数作为参数，作为要跳转页面数的值。

```
//后退一页
history.go(-1)
history.back()

//前进两页
history.go(1)
history.forward()
```

history也接受字符串作为参数：

```
history.go("baidu.com")
//跳转到最近的包含baidu.com这个字符串的页面，如果历史记录中没有包含这个字符串的页面，则什么都不做

```

除此之外，history对象还有一个length属性，保存着历史记录的数量。

```
if(history.length ==0) {
    //这是用户打开的第一个页面
}
```

运用这个属性，可以检测当前页面是不是用户历史记录中的第一个页面，从而决定是否创建自定义的前进或后退按钮。