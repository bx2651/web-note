JavaScript是一种专门未网页交互而设计的脚本语言，由下面三个部分组成：

* ECMAScript，由ECMA-262定义，提供核心语言功能；
* 文档对象模型（DOM），提供访问和操作网页内容的方法和接口
* 浏览器对象模型（BOM），提供与浏览器交互的方法与接口。


## JavaScript的使用

在网页中插入JavaScript，我们需要用到script标签。在body中放入：


```
<script type="text/javascript"></script>

```

script标签有6个属性：

1. async:可选，表示异步下载脚本。即不会阻塞后面代码的执行，关于异步，请查看异步文档。
2. charset:可选，表示通过src属性指定的代码的字符集，由于大多数浏览器都会忽略它的值，所以很少使用。
3. defer:可选，表示脚本可以延迟到文档完全被鸡西和显示之后再执行，只对外部脚本有效。
4. language:已废弃。
5. src:可选，表示包含要执行代码的外部文件。带有src属性的标签内部不能包含其他代码。
6. type:可选，是4的替代属性，表示编写代码使用的脚本语言的内容类型。如果未指定，则其默认值未text/javascript。


使用script元素嵌入js代码时，有两种方法：

1. 直接在页面中嵌入，比如：

```
<script type="text/javascript">
	alert("hello world");
</script>
```

2. 使用外部的脚本，比如：

```
<script src="tool.js"></script>
``` 

包含在script标签内部的代码，将会从上至下依次解释，如果解析卡在了中间的位置，则下面的代码都不会被执行。

**注意：在script标签中，如果出现</script>字符串，则会认为这是结束script的标签**，比如：

```
<script>
   function test(){
     alert("</script>")//Uncaught SyntaxError: Invalid or unexpected token
        }
</script>

```

浏览器报了一个Uncaught SyntaxError的错误。

如果需要输出这段字符串，则需要对/进行转义：

```
    <script>
        function test(){
            alert("<\/script>")
        }
        test();
    </script>
```