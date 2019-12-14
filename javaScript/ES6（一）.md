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


## 箭头函数

箭头函数的好处

* 更加简洁的语法
* 可以隐式返回
* 可以不绑定this

```
const numbers = [1, 2, 3]
const double = numbers.map(function (numbers) {
    return numbers * 2
})
//箭头函数的写法：
const double2 = numbers.map(numbers => numbers * 2)
//1.更加简洁的语法：删掉function关键字，加上一个箭头，没有参数加括号，一个参数可选择是否加 括号，多个参数括号+逗号分隔，一条返回值花括号可以省略
//2.隐式返回：可以省略return
console.log(double)//[2,4,6]
console.log(double2)//[2,4,6]
```

箭头函数的this是词法作用域，他的this的值是在定义时就确定了的，不会随着调用者的改变而改变。

#### 不适合使用箭头函数的场景：

* 箭头函数不能作为构造函数使用:因为箭头函数并不能绑定this，而当我们new一个实例的时候，我们是先新生成了一个实例，然后将这个实例的this指向构造函数，把对象绑定他的原型对象，然后返回这个对象。
* 箭头函数不适合作为对象的方法，因为箭头函数的this的值不会绑定到调用它的函数身上。

## 参数默认值

在es5中，如果我们需要让函数的参数有一个默认值的话，我们是需要这么做的：

```
function multiply(a,b){
	a = 3;
	b = 5;
	return a*b;
}
```

但在ES6中，我们有了更加方便的写法：

```
function multiply(a=3,b=5){
	return a*b;
}
```

当你只传递一个参数的时候，函数会自动将这个参数作为第一个参数的值进去，如果你想传递最后一个参数，而第一个使用默认值，则需要将第一个参数的值输入为undefined,如下所示：

```

function mul(a=3,b=2){
    return a*b;
}

console.log(mul(1))//2
console.log(mul(undefined,3))//9

```

## 模板字符串

新旧写法对比：

```
const person = 'ba2651';
const age = 18;
console.log(person+'is'+age+'years old')//需要写一堆引号和加号，如果很长的话非常容易出错
console.log(`${person} is ${age} years old`)//中间的单引号和加号全部都删掉，最外层加tab键上面的反引号，变量用${}括起来，简单明了。

```

在模板字符串的花括号中，可以是任意的js表达式或变量等，甚至可以在里边嵌入更多的模板字符串。

```

const bx = {
    name:'bx',
    age:18,
    todo:[
        {name:'go to store',completed:false},
        {name:'watch movie',completed:true},
        {name:'running',completed:true}
    ]
}
const template = `
    <div>
        ${bx.todo.map(todo=>`
        <li>
            ${todo.name} ${todo.completed ? '完成啦' : '还没完成'}
        </li>
        `)}
    </div>
`
document.body.innerHTML = template

```

## ES6中新增的字符串函数

* startsWith()：输出值是布尔值,大小写敏感

startsWith('15')：查看字符串是否是以51开头的

startsWith('1980',6):字符串的第六位开始是否是以1980开头的

* endsWith():用法与startsWith相同

* includes():

我们之前在查看某个字符串中是否含有某个字符串，我们都是使用indexOf!==-1来查看，现在就可以开始用includes来判断了，比如：

```
const fan = 'I love coding'
console.log(fan.indexOf('coding)!==-1)//true
console.log(fan.includes('coding))//true

```

当然，这个方法也可以传入第二个参数：

```
console.log(fan.includes('coding),10)//false,查看字符串的第十位开始后面是否有coding这个字符串。

```

* repeat()：参数为想重复的次数

```
const a = '哈';
a.repeat(5);//"哈哈哈哈哈"

```

## 对象及数组的解构

#### 对象的解构

在ES6之前，我们定义了一个对象，又需要使用对象中的一些值得时候，我们需要这样做：

```
const bx = {
    name:'bx',
    age:'18',
    friends:[zs,ls,ww]
}

const name = bx.name;
const age = bx.age;


```

当这个对象的属性特别多的时候，这件事情就会变得相当繁琐。现在，ES6推出了一种简洁的写法：

```
//先声明name和age,然后将bx这个对象中同名的属性赋值给name和age
const {name,age} = bx;

```

需要注意的是，我们不能提前声明name和age,否则会报错。name和age的顺序可以随意写，编译器会自动帮我们寻找同名的属性。有时候，name变量已经被别人使用过了，我们没办法使用name属性，那我们可以给name重新命名一下：

```
const {name:n,age} = bx;
```

这时候，我们就正确得到了name的值。

我们也可以给某一个值一个默认值，就是当对象中并没有这个属性的时候，会用到默认值。

```
const {name:n,age,sister = 'have no sister'} = bx;
```

#### 数组的解构

数组的解构与对象的解构的方式大致是相同的，我们来对比一下es5和es6的写法：

```
const arr = [1,2,3,4]
//ES5
const one = arr[0];
const two = arr[1];
//ES6
const [one,two] = arr;

```

我们也可以直接获取index为0和2位置的值,这就需要我们把index为1的位置空出来，如下所示：

```
const [one, ,three] = arr

```

当然，我们也可以获取第一个元素和剩下的元素：

```
const [one,...others] = arr
console.log(one,others);//1,[2,3,4]

```

数组解构的常见场景有：交换两个变量的值：

```
let a = 1;
let b = 2;

//es5
let temp;
temp = a;
a = b;
b = temp;

//es6
[a,b] = [b,a]
```

## ES6中的for of循环

在ES5中，我们有3种遍历的方法：

1.for循环：他的写法比较繁琐

2.forEach循环：这种方法不能跳出循环或继续循环

3.for in循环：他会返回出对象身上的可枚举属性

为了解决以上循环的缺陷，ES6退出了for of循环：

```

for(let fruit of fruits){
	console.log(fruit)
}

```
for of相对于for循环，写起来更加简单，而相对于forEach,他支持终止和跳过，相对于for of循环，他每一次循环的是属性值，不会遍历出非index的属性。

## ES6中的数组的方法

* Array.from()这个方法可以将类数组对象或字符串等转换为数组

```
const str = 'hello'
Array.from(str)//['h','e','l','l','o']
```

* Array.of()可以解决Array的不一致性，如下所示：

```
new Array(1)//返回的是一个长度为1的空数组
new Array(1,2,3)//返回的是[1,2,3]这个数组
Array.of(1)//返回的是数组[1]
Array.of(1,2,3)//返回的是数组[1,2,3]

```

可见，Array返回的值随着参数的变化会有不一样的结果，而Array.to则不会有这样的状况。

* .find():寻找数组中符合要求的元素(找到第一个符合要求的元素立即返回，不会执行后面的搜索)

```
//寻找数组中数量大于等于5的水果并输出其名字和数量
const fruits = [
    { name: 'apple', quantity: 2 },
    { name: 'bananas', quantity: 5 },
    { name: 'cherries', quantity: 10 }
]

const price = fruits.find(fruits => {
    if (fruits.quantity >= 5) {
        console.log(fruits)
    }
})
//以上函数可以简写为：
const price = fruits.find(fruits => fruits.quantity >= 5)

```

*.findIndex()函数

```
const bananasIndex = fruits.findIndex(fruits => fruits.name==='bananas')

```

* .some()函数:数组中至少有一个数据满足测试函数，则返回true,而不会继续执行
* .every():数组中的所有数据都满足测试函数，则返回true，如果有一个不满足，则立刻返回false并停止执行

```
const isEnough = fruits.some(fruits => fruits.quantity >=0)//至少有一个水果库存是大于0的

const isAllEnough = fruits.every(fruits => fruits.quantity >=0)//所有的有一个水果库存是大于0的

```

## 剩余参数

有时候，我们不确定会函数里会传进来几个参数，在ES5中，我们的通常做法是先判断一下arguments的长度，然后通过他的Index来操作参数。但是在ES6中，我们有了更简单的方法，就是通过...来传递，...表示的就是剩余参数，不论传进来几个参数，他都能完美的接纳。

```

function sum(...numbers){
	console.log(numbers)//[1,2,3]
    return numbers.reduce((prev,curr)=>prev+curr,0)
}
sum(1,2,3)//6

```

## 扩展运算符

扩展运算符则是将多个可遍历数组或字符串扩展到一个数组中

在ES5，如果我们想将两个数组合并，我们可能会用到concat方法，如果我们还想要推入一个新的元素，我们可能还会用到push方法，但是在ES6中，我们可以直接使用扩展运算符，如下所示：

```
const fruits = ['apple','bananas'];
const fruits2 = ['pear','cherries'];

//ES5的写法
let allFruits = []
allFruits = allFruits.concat(fruits);
allFruits.push('grape')
allFruits = allFruits.concat(fruits2)
console.log(allFruits)//["apple", "bananas", "grape", "pear", "cherries"

// ES6的写法
let allFruits2 = [...fruits,'grape',...fruits2]
console.log(allFruits2)//[ 'apple', 'bananas', 'grape', 'pear', 'cherries' ]

```

并且，通过扩展运算符复制的可遍历对象是深拷贝。如下所示：

```
const allFruits3 = allFruits2;
allFruits3[0] = 'orange'
console.log(allFruits2)//[ 'orange', 'bananas', 'grape', 'pear', 'cherries' ]
console.log(allFruits3)//[ 'orange', 'bananas', 'grape', 'pear', 'cherries' ]
//直接复制的数组，实际是将数组的地址赋值过去，改变其中的值会导致原数组也改变

let allFruits = []
allFruits = allFruits.concat(fruits);
allFruits.push('grape')
allFruits = allFruits.concat(fruits2)//[ 'orange', 'bananas', 'grape', 'pear', 'cherries' ]
console.log(allFruits)//[ 'apple', 'bananas', 'grape', 'pear', 'cherries' ]
//而通过扩展运算符拷贝的数组，是在内存中开辟出一块新的地址，改变新的数组的值并不会使原数组的值跟着改变。

```

## 对象字面量的扩展

如下所示：

```
const name = 'bx';
const age = 18;
const birthday = '2019-01-01'

//ES5的写法
const profile = {
    name:name,
    age:age,
    birthday:birthday,
    getName:function(){
        console.log(name)
    }
}
console.log(profile)//{ name: 'bx', age: 18, birthday: '2019-01-01' }
// ES6的写法
const profile2 = {
    name,
    age,
    birthday,
    getName(){
        console.log(name)
    }
}
console.log(profile2)//{ name: 'bx', age: 18, birthday: '2019-01-01' }

```