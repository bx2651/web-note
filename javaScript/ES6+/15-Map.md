## Map

Map和Set是非常像的，但是Map存储的是键值对，它的key可以是任意类型的元素。

* .get(key) 获取value值
* .size 获取元素数量
* .has 判断是否有某个元素
* .clear
支持ForEach和For of遍历

应用场景：存储元数据

Maps和Object类似的是，它们都允许你按键存取一个值、删除键、检测一个键是否绑定了值。但是它们也有一些重要的区别：

* Map默认情况不包含任何键，只包含显式插入的键，而 Object 有一个原型, 原型链上的键名有可能和你自己在对象上的设置的键名产生冲突。
* 一个Map的键可以是任意值，包括函数、对象或任意基本类型，而Object的键必须是一个String或Symbol。
* Map中的key是有序的，因此，当迭代的时候，一个Map对象以插入的顺序返回键值对。
* Map的键值对个数可以轻易通过size属性获取，Object只能手动计算.
* Map式可以直接被迭代的，Object需要以某种方式获取他得键才能迭代。
* Map在频繁增删键值对的场景下表现更好。

```

let myMap = new Map();

let keyObj = {};
let keyFunc = function () { };
let keyString = 'a string';

// 添加键
myMap.set(keyString, "和键'a string'关联的值");
myMap.set(keyObj, "和键keyObj关联的值");
myMap.set(keyFunc, "和键keyFunc关联的值");

myMap.size; // 3
console.log(myMap)

```