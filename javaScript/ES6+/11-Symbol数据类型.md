# Symbol数据类型

symbol是用来创建一个唯一的标识符，用来解决对象属性命名冲突的问题。我们来看一下以下示例：

```
const peter = Symbol();
const lily = Symbol();
console.log(peter==lily);//false

```

可以看到，虽然peter和lily都是Symbol,但是他们并不一样。

```
const classroom = {
    [Symbol('nina')]: { grade: 77, gender: female },
    [Symbol('nina')]: { grade: 80, gender: female }
}

```

Symbol的值不能与其他数据进行运算，包括同字符串进行拼接。并且，for in和for of等遍历时，也不会遍历Symbol属性。