ES6中新增的基本类型：通过Symbol函数生成，相同的Symbol函数产生的值是唯一的。

## 作用

属性私有化-数据保护

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

