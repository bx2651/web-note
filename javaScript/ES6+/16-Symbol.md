Symbol表示唯一的标识符。根据规范，对象的属性键只能是字符串类型或者Symbol类型。

```
let id = Symbol('id')
```
Symbol可以保证是唯一的，即使我们创建10个Symbol('id'),他们也是不相等得。

```
console.log(Symbol('id') == Symbol('id'))//false
```

并且Symbol不会被自动转换成字符串。所以也就无法alert

```
let id = Symbol("id");
alert(id); // 类型错误：无法将 Symbol 值转换为字符串。
```

如果我们需要显示一个Symbol，我们需要通过.toString()方法来实现转换或通过symbol.fescription方法显示描述。

## 作用

**属性私有化-数据保护**，Symbol允许我们创建对象的隐藏属性，代码的任何其他部分都无法意外访问或重写这些属性。

```
function Person(name,gender) {
  this.name = name
  this.gender = gender
}
var p1 = new Person("Jack","男")
```

上面代码中，我们希望创建的person的性别是不可修改的，出生就确定的，那么我们可以怎么做呢？

```
var Person = (function() {
  var _gender = ''

  function P(name,gender) {
    this.name = name
    _gender = gender
  }

  P.prototype.getGender = function() {
    return _gender
  }
  return P
})()
var p1 = new Person("Jack","男")

p1.gender = "女"
console.log(p1.getGender())//男

```
我们可以通过这种方式来使属性私有化，上面的代码中，我们就没有在Person这个构造函数构造出来的对象上添加gender这个属性，而是通过了一个方法来返回了gerder的值，但是这样处理起来不优雅，且写起来非常繁琐。

那么我们就可以使用Symbol来解决这个问题：

```
var Person = (function() {
  let _gender = Symbol('gender')
  function P(name,gender) {
    this.name = name
    this[_gender] = gender
  }

  return P
})()
var p1 = new Person("Jack","男")

p1.gender = "女"
console.log(p1)//{ name: 'Jack', [Symbol(gender)]: '男' }
```

当然，这样也会产生一个问题：Symbol数据时无法被访问的。

在ES5中，我们有一个Object.defineProperty的方法，也可以解决这个问题：


```
function Person(name,gender) {
  this.name = name
  this.gender = gender
}
var p1 = new Person("Jack","男")


Object.defineProperty(p1,'gender',{
  writable:false
})

p1.gender = "女"
console.log(p1)//{ name: 'Jack', gender: '男' }
```

回归正题，如果我们需要在对象中使用Symbol,必须通过方括号来使用：

```
let id = Symbol('id')

let user = {
  name:'Jack',
  [id]:'asdfg12345'
}
```

如果直接使用id作为键的话，那么就是使用的一个变量作为键了，而不是Symbol。

由于无法被访问到，所以Symbol在for...in循环中会被跳过，Object.keys()也会忽略它。

但是，Object.assign在复制时是会成功复制到的。


## 全局Symbol

有时候我们可能会想要名字相同的Symbol具有相同的实体，比如，不同的页面访问的Symbol的id是完全相同的属性，那么我们就可以使用**Symbol全局注册表**。

Symbol.for(key)会检查全局注册表，如果有一个描述为 key 的 Symbol，则返回该 Symbol，否则将创建一个新 Symbol（Symbol(key)），并通过给定的 key 将其存储在注册表中。

```
// 从全局注册表中读取
let id = Symbol.for("id"); // 如果该 Symbol 不存在，则创建它

// 再次读取（可能是在代码中的另一个位置）
let idAgain = Symbol.for("id");

// 相同的 Symbol
alert( id === idAgain ); // true

```

对于全局 Symbol，不仅有 Symbol.for(key) 按名字返回一个 Symbol，还有一个反向调用：Symbol.keyFor(sym)，它的作用完全反过来：通过全局 Symbol 返回一个名字。

```
// 通过 name 获取 Symbol
let sym = Symbol.for("name");
let sym2 = Symbol.for("id");

// 通过 Symbol 获取 name
alert( Symbol.keyFor(sym) ); // name
alert( Symbol.keyFor(sym2) ); // id
```
Symbol.keyFor 内部使用全局 Symbol 注册表来查找 Symbol 的键。所以它不适用于非全局 Symbol。如果 Symbol 不是全局的，它将无法找到它并返回 undefined。

也就是说，任何 Symbol 都具有 description 属性。

```
let globalSymbol = Symbol.for("name");
let localSymbol = Symbol("name");

alert( Symbol.keyFor(globalSymbol) ); // name，全局 Symbol
alert( Symbol.keyFor(localSymbol) ); // undefined，非全局

alert( localSymbol.description ); // name
```