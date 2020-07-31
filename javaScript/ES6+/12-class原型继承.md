# class原型继承

ES5中的原型继承，如下所示

```
function User(name,email){
    this.name = name;
    this.email =email;
    this.sayName = function(){
        console.log(`i am ${this.name}`)
    }
}
User.prototype.sayEmail = function(){
    console.log(`i am ${this.email}`)
}
const bx = new User('bx','bx@bx.com')

```

在ES6中，我们可以通过两种方式定义类：

*  类的声明
```
class User{}
```
* 类的表达式

```
const user = class {}
```

可以看出，类的定义方式和函数是一样的，我们输出一下class的类型，可以看到，类其实就是function，但是，即使是用类的声明来定义类，也不可以在定义之前使用，因为类不存在函数提升。

```
class User{
    constructor(name,email){
        this.name = name;
        this.email =email;
    }
    info(){
        console.log(`i am ${this.email}`)
    }
    static description(){//静态方法只能在原型对象上调用，而不能在实例上调用
        console.log(`i am a user of bx2651.com`)
    }
    set github(value){
        this.githubName = value
    }
    get github(){
        return `https://github.com/${this.githubName}`
    }
}

const bx = new User('bx','bx@bx.com')
```

那么，class是如何实现继承的呢？

```
class Animal {
    constructor(name){
        this.name = name;
        this.belly = []
    }
    eat(food){
        this.belly.push(food)
    }
}

class Dog extends Animal{
    constructor(name,age){
        //super方法的调用，就相当于我们在es5中写的三行代码：
        //Animal.call(this,name,age)
        //Dog.prototype = new Animal()
        //Dog.prototype.constructor = Dog
        super(name,age);
    }
    bark(){
        console.log(`Bark bark`)
    }
}

const lucky = new Dog('lucky',2)