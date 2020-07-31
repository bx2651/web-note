
## Proxy

proxy这个词的原意使代理，用在Javascript中表示由它来代理某些操作。可以理解为，在目标对象之前设置一层拦截，外界对该对象的访问，都必须先通过这层拦截，因此也提供了一种机制，可以对外界的访问进行过滤和改写。

因此，当我们不想完全对外暴露某个对象的信息，想做一层在原对象操作前的拦截、检查、代理，这时候就可以考虑使用Proxy。

Proxy构造函数有两个参数：

```
var proxy = new Proxy(target,handler)
```

其中，前者表示被代理的对象：可以使任何类型的对象，包括原生数组、函数、甚至另一个代理

后者声明了代理target的一些操作，其属性使当执行一个操作时定义代理的行为的函数。

```
const myObj = {
  _id: '我是myObj的ID',
  name: 'mvvm',
  age: 25
}

const myProxy = new Proxy(myObj, {
  get(target, propKey) {
    if (propKey === 'age') {
      console.log('年龄很私密，禁止访问');
      return '*';
    }
    return target[propKey];
  },
  set(target, propKey, value, receiver) {
    if (propKey === '_id') {
      console.log('id无权修改');
      return;
    }
    target[propKey] = value + (receiver.time || '');
  },
  // setPrototypeOf(target, proto) {},
  // apply(target, object, args) {},
  // construct(target, args) {},
  // defineProperty(target, propKey, propDesc) {},
  // deleteProperty(target, propKey) {},
  // has(target, propKey) {},
  // ownKeys(target) {},
  // isExtensible(target) {},
  // preventExtensions(target) {},
  // getOwnPropertyDescriptor(target, propKey) {},
  // getPrototypeOf(target) {},
});

myProxy._id = 34;
console.log(`age is: ${myProxy.age}`);

myProxy.name = 'my name is Proxy';
console.log(myProxy);

const newObj = {
  time: ` [${new Date()}]`,
};
// 原对象原型链赋值
Object.setPrototypeOf(myProxy, newObj);
myProxy.name = 'my name is newObj';

console.log(myProxy.name);

/**
* id无权修改
* 年龄很私密，禁止访问
* age is: *
* { _id: '我是myObj的ID', name: 'my name is Proxy', age: 25 }
* my name is newObj [Thu Mar 19 2020 18:33:22 GMT+0800 (GMT+08:00)]
*/

```

### Proxy中的处理方法

Proxy有13个数据劫持的操作：

* get:获取某个key值，接受两个参数：target和key

```
const person = {
  name:"Lily",
  age:21
}

const personProxy = new Proxy(person,{
  get:function(target,key){
    if(target['age']>18){
      return "女孩子永远18岁";
    }else{
      return "还是个小朋友呢"
    }
  }
})

console.log(personProxy.age)
//女孩子永远18岁

```

上面可以看到，我们想知道Lily的年龄，然后询问了proxy,但是女孩子的年龄怎么能随便问呢，所以proxy回复女孩子永远18岁。

* set方法：用来拦截某个属性的赋值操作，接受四个参数：target目标，key,value,receiver(改变前的原始值)

```
const person = {
  name:"Lily",
  age:21
}

const personProxy = new Proxy(person,{
  set:function(target,key,value,receiver){
    if(key === 'age'){
      throw new Error("年龄要随着时间增长而增长，不能随便更改哟")
    }else{
      target[key] = value
    }
  }
})

personProxy.name = "Lucy"
console.log(personProxy.name)
//Lucy

personProxy.age = 18
//Error: 年龄要随着时间增长而增长，不能随便更改哟

```

## 和Object.defineProperty相比

* Proxy支持数组：不需要对数组的方法进行重载，省去了众多hack,减少代码量等于减少了维护成本

```
const arr = [1,2,3]
let proxy = new Proxy(arr,{
  get(target,key,receiver){
    console.log('get',key)
    return Reflect.get(target,key,receiver)
  },
  set(target,key,value,receiver){
    console.log('set',key,value)
    return Reflect.set(target,key,value,receiver)
  }
})
proxy.push(4)
console.log("this is arr",arr)

```

Proxy不需要对数组方法进行重载，省去了众多hack,减少代码量等于减少维护成本。

* 针对对象:在数据劫持这个问题上，Proxy可以被认为是Object.defineProperty()的升级版，外界对某个对象的访问，都必须经过这层拦截。因此，它是针对整个对象，而不是对象的某个属性。

```
const obj = {
  name:"Lily",
  age:18
}
let proxy = new Proxy(obj,{
  get(target,key,receiver){
    console.log('get',key)
    return Reflect.get(target,key,receiver)
  },
  set(target,key,value,receiver){
    console.log('set',key,value)
    return Reflect.set(target,key,value,receiver)
  }
})
obj.age = 20
console.log("this is obj",obj)
```

* 嵌套支持:本质上，proxy不支持嵌套，因此需要逐层遍历来解决。

```
let obj = {
  info: {
    name: 'eason',
    blogs: ['webpack', 'babel', 'cache']
  }
}
let handler = {
  get (target, key, receiver) {
    console.log('get', key)
    // 递归创建并返回
    if (typeof target[key] === 'object' && target[key] !== null) {
      return new Proxy(target[key], handler)
    }
    return Reflect.get(target, key, receiver)
  },
  set (target, key, value, receiver) {
    console.log('set', key, value)
    return Reflect.set(target, key, value, receiver)
  }
}
let proxy = new Proxy(obj, handler)
// 以下两句都能够进入 set
proxy.info.name = 'Zoe'
proxy.info.blogs.push('proxy')

```


Proxy本质上属于元编程非破坏性数据劫持，在原对象的基础上进行了功能的衍生而又不影响原对象，符合松耦合高内聚的设计理念。

通俗的讲，Proxy就是在数据外层套了个壳，然后通过壳来访问内部的数据。


### Proxy实现MVVM

```
<html>
  <div>
    name: <input id="name" />
    age: <input id="age" />
  </div>
</html>
<script>
// 与页面绑定
const data = {
  name: '',
  age: 0
}

// 暴露到外部，便于查看效果
window.data = data;
window.myProxy = new Proxy(data, {
  set(target, propKey, value) {
    // 改变数据Model时修改页面
    if (propKey === 'name') {
      document.getElementById('name').value = value;
    } else if (propKey === 'age') {
      document.getElementById('age').value = value;
    }
    Reflect.set(...arguments);
  },
});

// 页面变化改变Model内数据
document.getElementById('name').onchange = function(e) {
  Reflect.set(data, 'name', e.target.value);
}
document.getElementById('age').onchange = function(e) {
  Reflect.set(data, 'age', e.target.value);
}
</script>

```


### 应用实例

帮助我们重写对象上的默认方法，定义自己的逻辑。可以通过重写这些方法来使这些对象符合自己的需求,然后再写在相对应的对象上。

```
const phoneHandler = {
  set(target,key,value){
    target[key]=value.match(/[0-9]/g).join('');
  },
  get(target,key){
    return target[key].replace(/(\d{3})(\d{4})(\d{4})/,'$1-$2-$3')
  }
}

//第一个参数为target，要代理的目标对象
//第二个参数包含了要重写的操作
const phoneNumber = new Proxy({},phoneHandler)

```

![](../img/Proxy.png)

```

const safeHandler = {
  set(target,key,value){
    const likeKey = Object.keys(target).find(k => k.toLowerCase() ===key.toLowerCase());
    if(!(key in target) && likeKey){
      throw new Error(`looks like we already have a property ${key} but with case of ${likeKey}`)
    }
    target[key] = value
  }
}
const safetyProxy = new Proxy({} , safeHandler)

safetyProxy.ID=5;

```

![](../img/Proxy2.png)