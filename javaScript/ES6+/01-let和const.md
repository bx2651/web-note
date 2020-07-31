## let和const

为什么会有let和const?

1.var是可以重复声明的：在非严格模式下，可以多次给同一个变量定义赋值。

2.无法限制修改：比如我定义了一个PI,我可以给PI多次赋值，解析器也不会有任何怨言。

3.没有块级作用域。

let和const就是用来解决上面的三个问题的。

```
var a = 100;
let a = 100;//Uncaught SyntaxError: Identifier 'a' has already been declared
```

```
const a = 100;
const a = 100;//Uncaught SyntaxError: Identifier 'a' has already been declared
```

```
if(true){
	var a = 1;
	let b = 2;
	const c = 2;
}
console.log(a)
console.log(b)//Uncaught ReferenceError: b is not defined
console.log(c)//Uncaught ReferenceError: c is not defined
```

那么let和const有什么区别呢？

let是可以被重新赋值的，而const不可以。

```
let a = 1;
a = 2;
console.log(a)//2

const b = 1;
b = 2;
console.log(a)//Uncaught TypeError: Assignment to constant variable.
```

当然，let可以重新赋值并不意味着它可以被重新声明，当我们在同一个作用域下重新声明时，会抛出语法错误。但是在内嵌的代码块重新声明，是可以被接受的。

```
var count = 30;
let count = 20;//语法错误
if(condition){
	let count = 20;//遮盖了全局作用域的count值，所以不会报错。
}

```

const并不一定是不可更改的，我们来看一下以下代码：

```
const person = {
	name:'bx2651',
	age:18
}

person.age = 19;
console.log(person.age)//19

```

这是因为，当你直接去改变const的值时，就是让const的指针指向另一个地方，它就不是同一个对象了，这当然是不可以的。其实我们可以这么理解，当你改变我这个人的时候，我当然不同意，但是随着时间的流逝，我不是一成不变的，我的年龄会随之增长，虽然我的年龄变了，但是我依然是我这个对象。如果我的年龄也不想随着时间的流逝而增长，那么我可以使用freeze方法。

```
const bx2651 = Object.freeze(person)

```
我们知道，var的声明会被提升到它的作用域顶部，但是let和const不会，因此，我们通常会把他们的声明语句放在代码块的顶部，以便整个作用域都可以访问的到。


那么要如何使用这三者呢？

在ES6中，建议：

* 默认使用const
* 当变量需要重新绑定或更新时使用let
* 尽量不适用var