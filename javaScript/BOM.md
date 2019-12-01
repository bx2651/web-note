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
### 导航和打开窗口
### 间歇调用和超时调用
### 系统对话框


## location对象
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