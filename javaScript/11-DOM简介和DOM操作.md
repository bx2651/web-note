Javascript分为三部分：

* ECMAScript:包含变量、表达式、运算符、函数、if语句、for语句等
* DOM:文档对象模型：操作网页上元素的API,比如让盒子移动、变色、轮播图等
* BOM：浏览器对象模型，操作浏览器部分功能的API,比如浏览器自动滚动。


## 节点

节点时构成网页的最基本单元，网页中的每一个部分都可以称为是一个节点，比如html标签、属性、文本、注释、整个文档都是一个节点。

常见的节点分为四类：

* 文档节点：每个文档的根节点，文档节点只有一个子节点，就是html标签
* 元素节点：HTML标签，nodeType的值为1
* 属性节点：元素的属性，nodeType的值为2
* 文本节点：HTML标签中的文本内容，包含标签之间的空格、换行，nodeType的值为3

节点的类型不同，属性和方法也都不尽相同。通过nodeType可以获取到节点的类型。

```
if(element.nodeType == 1){
	//元素节点
}

```

### 什么是DOM

> DOM是针对HTML和XML文档的一个API,DOM描绘了一个层次化的节点树，允许开发人员添加、移除和修改页面的某一部分。

DOM就是由节点组成的。

**解析过程：**HTML加载完毕，渲染引擎会在内存中把HTML文档生成一个DOM树，getElementById获取DOM上的元素节点，然后操作的时候修改的是该元素的属性。

#### DOM可以做什么

* 查找对象或元素节点
* 设置元素的属性值
* 设置元素的样式
* 动态创建和删除元素
* 事件的触发响应：事件源、事件、事件的驱动程序


###元素节点的获取

DOM节点的获取方式其实就是**获取事件源**的方式，主要有以下三种：

```
var div1 = document.getElementByID("box1")
//通过ID获取的元素节点只有一个，因为ID是唯一的。

var div2 = document.getElementsByClassName("box2")
//通过className获取的元素节点是一个数组，即便只有一个值也会是包含在数组当中的。

var document.getElementsByTagName("box3")
//同上
```

要了解节点的具体信息，可以通过nodeName和nodeValue这两个属性。对于元素节点，nodeName中保存的是元素的标签名，nodeValue则为null.

### 元素节点的关系

DOM节点并不是孤立的，因此可以通过DOM节点关系之间的相对关系对它们进行访问。

![](../img/Node节点关系)

![](https://camo.githubusercontent.com/b3a050a4c5389873bc65973f4464dec38f133512/687474703a2f2f696d672e736d79687661652e636f6d2f32303138303132365f323134352e706e67)

**所有的节点都只有一个父节点**，调用方式就是：

```
Node.parentNode
```

**每个节点都有childNode属性**，其中保存着NodeList对象，它是一个类数组对象，用于保存一组有序的节点。
获取子节点的方式有很多，我们挑两个最重要的来看，其他的详见上图。

```
let arr = 父节点.childNodes;//获取所有子节点
let arr = 父节点.childNodes[0];//获取第一个子节点
let arr = 父节点.childNodes.item(1);//获取第一个子节点
```

这种方法返回的是指定元素子节点的集合，包括元素节点、所有属性、文本节点。在火狐、谷歌等浏览器中，换行也是子节点。


```
let arr2 = 父节点.children;//获取所有子节点
```

这种方式用的更多一些，虽然不是标准属性，但是获得了所有的浏览器支持，它只返回HTML节点，不返回文本节点。

### 节点的操作

#### 创建节点

```
let node = document.createElement("div")
```

#### 插入节点

插入节点有以下几种不同的方式：

**1.将节点插入到父节点最后的位置**

```
父节点.appendChild(node)
```

**2.将节点插入到特定的位置**

```
父节点.insertBefore(node,父节点.firstChild)
```

如果后面的参数为null，那么将会在父节点的最后一个位置插入一个节点。

**3.用新的节点替换掉某个旧的节点**

```
父节点.replaceChild(node,父节点.firstChild)
```

要被替换的节点将从文档树中移除，该节点的所有关系指针都会从被它替换的节点复制过来，同时新的节点会占据它的位置。尽管如此，这个被替换的节点仍然在文档中，只是没有了位置。

#### 删除节点

```
父节点.removeChild(node)
```

与上面替换节点相同的是，remove方法只是移除了节点在文档中的位置，并不是彻底删除了文档节点。


#### 复制节点

```
要复制的节点.cloneNode();       //括号里不带参数和带参数false，效果是一样的。
要复制的节点.cloneNode(true);
```

* 不带参数/带参数false：浅复制：只复制节点本身，不复制子节点。
* 带参数true：深复制：既复制节点本身，也复制其所有的子节点。

在复制完节点后，由于并没有为节点指定父节点，所以返回的节点副本属于文档所有:

```
  <div>
    <span></span>
  </div>


  <script>

    let span = document.getElementsByTagName("span")[0]
    let newNode = span.cloneNode()
    console.log(newNode.parentNode)
  </script>
</body>
```

上面代码打印输出的结果是null,我们需要将其通过插入节点的操作插入到文档当中，他才会拥有父节点。


## 节点类型

### Document类型

该类型表示文档。在浏览器当中，document对象是HTMLDocument的一个实例，表示整个HTML页面，而且，document对象是window对象的一个属性，因此可以讲其作为全局对象来访问。

Document节点具有以下特征：

* nodeType的值为9
* nodeName的值为"#document"
* nodeValue的值为null
* parentNode的值为null
* ownerDocument的值为null

通过这个文档对象，不仅可以取得与页面有关的信息，还能操作页面的外观及其底层结构。


#### 文档信息

通过document对象，我们可以获取一些文档的信息：

```
//取得文档的标题
var title = document.title
//设置文档标题
document.title = "new title"

//获取url
var url = document.URL
//取得域名
var domain = document.domain
//取得来源页面的url
var referrer = document.referrer

//在以上三者当中，只有域名是可以通过设置修改的，并且是有限制的修改。出于安全方面的限制，如果url当中包含一个子域名，比如：www.baidu.com,那么就只能将domain设置为baidu.com,而不能修改顶级域名，例如：

document.domain = baidu.com//成功
document.domain = baidu.net//失败
```

#### 查找元素

```
//通过id获取元素
var div = document.getElementByID("id")

//通过标签获取元素
var button = document.getElementsByTagsName("button")

//通过名字获取元素,document元素特有的方法，可以用来获取带name属性的标签
var input = document.getElementsByName("color")
```

#### 特殊集合

* document.anchors,包含文档中所有带name特性的a标签
* document.forms,包含文档中所有的form元素
* document.image
* document.link,包含文档中所有带hraf特性的a元素

#### 文档写入

* document.write():原样写入
* document.writeIn()：后面追加换行符
* document.open():打开网页输入流
* document.close():关闭网页输入流


### Element类型

* nodeType的值为1
* nodeName的值为元素的标签名
* nodeValue的值为null
* parentNode可能是Document或Element

要访问元素的标签名，可以使用nodeName或tagName属性：

```
let div = document.getElementById("myDiv")
console.log(div.tagName == div.nodeName)
```

#### 操作特性

每个元素都有一个或多个特性，这些特性的用途是给出相应元素或其内容的附加信息，操作特性的DOM方法主要有以下三个：

**1.获取特性**

```

let div = document.getElementById("myDiv")

//获取特性值
let idName = div.getAttribute("id")

```

通过上面的方法，还可以取得自定义的特性。不过，特性的名称不区分大小写，id和ID是同一个特性。自定义的特性应该加上data-前缀以便验证。

**2.设置特性**

```
div.setAttribute("id","myId")
div.id = "myId2"
```

**3.删除特性**

```
div.removeAttribute("id")
```

**4.attribute属性**

element类型是使用attribute属性的唯一一个DOM节点类型，其中包含一个NameNodeMap，与NodeList类似，也是一个动态的集合。元素的没一个特性都由一个Attr节点表示，每个节点都保存在NamedNodeMap对象中，NamedNodeMap对象拥有以下方法：

* getNamedItem(name):返回nodeName属性等于name的节点
* removeNamedItem(name):从列表中移除nodeName属性等于name的节点
* setNamedItem(node):向列表中天价节点，以节点的nodeName属性为索引
* item(pos):返回位于数字pos位置处的节点


#### 创建元素

```
let div = document.createElement("div")
div.id = "myDiv"

```

以上代码创建新元素的同时，也为新元素设置了ownerDocument属性，并且赋予了相应的信息。但是由于新元素尚未被添加到文档树中，因此设置这些特性不会影响浏览器的显示。