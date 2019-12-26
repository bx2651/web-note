Json是一种轻量级的数据格式，可以简化表示复杂数据结构的工作量。

Json之所以流行，不仅是因为它的语法和Js非常相似，更重要的原因是它可以解析为有用的JS对象。

## Json的语法

Json的语法可以表示以下三种类型的值：

* 简单值：字符串，数值，布尔值，null（Json不支持undefined）
* 对象：对象作为一种复杂的数据类型，表示的是一组无序的键值对，而每个键值对中可以存放简单值，也可以存放复杂数据类型的值
* 数组：数组表示的是有序的值的列表，可以通过数组索引来访问其中的值，数组的值也可以是任意类型。

Json不支持变量、函数、对象实例，它就是一种表示结构化数据的格式，它不属于JavaScript


#### Json和JavaScript对象字面量的区别：

1.Json中的对象要求给属性加引号而JS对象字面量则不需要。

2.Json没有变量的声明，因为Json中没有变量的概念。

3.Json不需要末尾的分号。

```
const person = {//Js对象：需要声明变量，属性名可以不加引号，花括号结束需要写分号
	name:"bx2651",
	age:18
};

{
	"name":"baixue",
	"age":18
}
```

#### Json中的数组

```
var arr = [18,"hi",true]//Js数组
[18,"hi",true]//Json数组
```

Json数组和Json对象同样没有变量和分号，可以把数组和对象结合起来，构成更复杂的数据集合，例如：

```
[
  {
    "name":"告白气球",
    "singer": "周杰伦",
    "album": "周杰伦的床边故事",
    "time": "03:35",
    "link_url":"./source/告白气球.mp3",
    "cover":"./source/告白气球.jpg",
    "link_lrc":"./source/告白气球.txt"
  },
  {
    "name":"As long AS Love Me",
    "singer": "Justin Bieber",
    "album": "NOW That's What I Call Music! 44",
    "time": "03:49",
    "link_url":"./source/AslongASLoveMe.mp3",
    "cover": "./source/AslongASLoveMe.jpg",
    "link_lrc": "./source/AslongASLoveMe.txt"
  },
  {
    "name":"Something Just Like This",
    "singer": "Chainsmokers",
    "album": "Something Just Like This",
    "time": "04:07",
    "link_url":"./source/SomethingJustLikeThis.mp3",
    "cover":"./source/SomethingJustLikeThis.jpg",
    "link_lrc":"./source/SomethingJustLikeThis.txt"
  },
  {
    "name":"Your Song",
    "singer": "Lady Gaga",
    "album": "Your Song",
    "time": "04:16",
    "link_url":"./source/YourSong.mp3",
    "cover":"./source/YourSong.jpg",
    "link_lrc":"./source/YourSong.txt"
  },
  {
    "name":"凉凉",
    "singer": ["杨宗纬","张碧晨"],
    "album": "凉凉",
    "time": "05:00",
    "link_url":"./source/凉凉.mp3",
    "cover":"./source/凉凉.jpg",
    "link_lrc":"./source/凉凉.txt"
  }
]

```

这个数组包含了一些表示音乐信息的对象，每个对象都有几个属性，属性的值还可以是一个数组或对象。


## 解析和序列化

前面我们说过，Json之所以流行，不仅是因为它的语法和Js非常相似，更重要的原因是它可以解析为有用的JS对象。

Json对象有两个方法：stringify()和parse(),这两个方法分别用于把JS对象序列化为JSON字符串和把JSON字符串解析为原生JS值。

```
const person = {
	name:"bx2651",
	age:18,
    phone:undefined
};

const jsonText = JSON.stringify(person)
console.log(person)
console.log(jsonText)

```

![](../img/JSON1.jpeg)

默认情况下，JSON.stringify()输出的字符串不包含任何空格字符串或缩进。

在序列化JS对象时，所有函数及原型成员都会被有意忽略，不体现在结果当中。此外，值为undefined的属性也会被跳过，结果中最终都是值为有效JSON数据类型的实例属性。

将JSON字符串传给JSON.parse()就可以得到一个JS的对象。但是如果传的不是一个有效的JSON,则会抛出错误。

```
const jsonParse = JSON.parse(jsonText)

```

JSON.stringify()除了要序列化的对象外，还接收两个参数：过滤器和选项,选项表示是否在字符串中保留缩进。

### 过滤器
过滤器可以是数组或者是函数

1.数组：结果中将只包含数组中列出的属性

```
const repo = [
  {
    "name":"告白气球",
    "singer": "周杰伦",
    "album": "周杰伦的床边故事",
    "time": "03:35",
    "link_url":"./source/告白气球.mp3",
    "cover":"./source/告白气球.jpg",
    "link_lrc":"./source/告白气球.txt"
  },
  {
    "name":"As long AS Love Me",
    "singer": "Justin Bieber",
    "album": "NOW That's What I Call Music! 44",
    "time": "03:49",
    "link_url":"./source/AslongASLoveMe.mp3",
    "cover": "./source/AslongASLoveMe.jpg",
    "link_lrc": "./source/AslongASLoveMe.txt"
  },
  {
    "name":"Something Just Like This",
    "singer": "Chainsmokers",
    "album": "Something Just Like This",
    "time": "04:07",
    "link_url":"./source/SomethingJustLikeThis.mp3",
    "cover":"./source/SomethingJustLikeThis.jpg",
    "link_lrc":"./source/SomethingJustLikeThis.txt"
  },
  {
    "name":"Your Song",
    "singer": "Lady Gaga",
    "album": "Your Song",
    "time": "04:16",
    "link_url":"./source/YourSong.mp3",
    "cover":"./source/YourSong.jpg",
    "link_lrc":"./source/YourSong.txt"
  },
  {
    "name":"凉凉",
    "singer": ["杨宗纬","张碧晨"],
    "album": "凉凉",
    "time": "05:00",
    "link_url":"./source/凉凉.mp3",
    "cover":"./source/凉凉.jpg",
    "link_lrc":"./source/凉凉.txt"
  }
]

const repoFilter = JSON.stringify(repo,["name","singer"])
console.log(repoFilter)
```

![](../img/JSON2.jpeg)

2.函数：

如果第二个参数是函数的话，行为会有所不同：传入的函数接收两个参数，属性名和属性值，根据属性名可以知道如何处理要序列化的对象中的属性值。

```
const repoFilter = JSON.stringify(repo,function(key,value){
    switch(key){
        case "time":return 2019
        default:return value
    }
})
console.log(repoFilter)
```
![](../img/JSON3.jpeg)

### 选项

#### 字符串缩进

第三个参数用于控制结果中的缩进和空白符，如果这个参数是一个数字，则代表着每个级别要缩进的空格数。

```
const repoFilter = JSON.stringify(repo,function(key,value){
    switch(key){
        case "time":return 2019
        default:return value
    }
},4)
console.log(repoFilter)

```
![](../img/JSON4.jpeg)

可以看到，传入数字之后，结果返回的字符串中同时包含了换行符，极大的提高了JSON数据的可读性。当然，这个数字最大只能是10，超过10的数字都会被自动转化为10。

我们也可以传入一个长度小于等于10的字符串，将出现如下效果:

```
const repoFilter = JSON.stringify(repo,function(key,value){
    switch(key){
        case "time":return 2019
        default:return value
    }
},"----")
console.log(repoFilter)
```

![](../img/JSON5.jpeg)

#### toJSON()方法

#### JSON.stringify的顺序：
1.如果存在toJSON的方法，而且能通过它取得有效的值，则调用这个方法。否则返回对象本身。

2.如果提供了第二个参数，应用这个函数过滤器，传入函数过滤器的值是第一步返回的值。

3.对第二步返回的值执行序列化的过程。

4.如果提供了第三个参数，执行相应的格式化操作。


### 解析选项

JSON.parse()也接受另一个参数，这个参数是一个函数，将在每一个键值对上调用。为了区别于过滤函数（替换函数）replacer，这个函数被称为还原函数reviver。

如果还原函数返还了一个undefined，则表示要从结果中删除相应的键，如果返回其他值，则将该值插入到结果中去。

在将日期字符串转换为Date对象时，经常用到还原函数。

```
var book = {
    "title":"JS",
    "edition":3,
    "year":2019,
    "releaseDate":new Date(2019,12,3)
}

var jsonText = JSON.stringify(book)
var bookCopy = JSON.parse(jsonText,function(key,value){
    if(key == "releaseDate"){
        return new Date(value)
    }else{
        return value
    }
})

console.log(bookCopy.releaseDate.getFullYear())
```

以上代码先是为book对象增加了一个releaseDate的属性，该属性保存着一个Date对象，这个对象经过序列化之后变成了一个有效的字符串，然后经过解析又还原为了一个Date对象。

还原函数在遇到releaseDate时，会创建一个新的Date对象，并将相应的值传进去，也正是因为如此，才能基于这个对象调用getFullYear方法。

```
var book = {
    "title":"JS",
    "edition":3,
    "year":2019,
    "releaseDate":new Date(2019,12,3)
}
console.log(book)
var jsonText = JSON.stringify(book)
console.log(jsonText)
var bookCopy2 = JSON.parse(jsonText)
console.log(bookCopy2)

var bookCopy = JSON.parse(jsonText,function(key,value){
    if(key == "releaseDate"){
        return new Date(value)
    }else{
        return value
    }
})
console.log(bookCopy)
console.log(bookCopy.releaseDate.getFullYear())
console.log(bookCopy2.releaseDate.getFullYear())
```
![](../img/JSON6.jpeg)

**最近遇到这样一个需求：我需要从后台请求一个数组回来，但是后端返回给我的是一个和数组长的一样的字符串，我需要先把字符串转换成数组，才能使用。这个时候就可以用到parse来解析：var arr = JSON.parse(str)**