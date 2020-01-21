## 为什么会出现HTML5

1. web浏览器的兼容性很低，这是由于规范不统一，没有被标准化造成的。
2. 文档结构不够明确，语义化较差：之前为了表示标题、正文等，一般都是用div元素，难以阅读。
3. web应用程序的功能受到了限制：HTML和web的关系薄弱，wen应用程序的特征是先从网络下载，然后忠实的运行，因此会对威胁到用户安全的功能进行限制。

## HTML5中新增和废除的元素

### 新增的结构元素：

* section:用于表示页面中的一个内容区块，比如章节、页眉、页脚、或其他部分。
* article:表示页面中一块与上下文不相关的独立内容，比如博客中的一篇文章。
* aside:与article元素内容相关的辅助信息。
* header:页面中的一个内容区块或整个页面的标题。
* hgroup:对整个页面或页面的一个内容区块的标题进行组合。
* footer:整个页面或页面一个内容区块的脚注，一般来说，会包含创作者的姓名、创作日期以及创作者的联系信息。
* nav:导航链接部分。
* figure:一段独立的流内容，一般表示文档主体流内容中的一个独立单元，使用figcaption元素为figure元素添加标题，一个figure元素建议只放置一个figcation元素。

### 新增的其他元素：

* video:视频元素
* audio:音频元素
* embed:多媒体元素，格式可以是Midi,Wav,AIFF,AU,MP3,PDF等
* mark:朱勇用来在视觉上向用户呈现那些需要突出或高亮显示的文字，mark元素的一个比较典型的用法是在搜索结果中向用户高亮显示搜索的关键词。
* progress:表示运行中的进程，可以使用该元素来显示JavaScript中耗费时间的函数进程。
* time:表示日期或时间。
* canvas:表示图形，图表或其他图像，做这个元素本身没有行为，仅提供一块画布，但它把一个绘图API展现给客户端的JavaScript，以便脚本能够把想绘制的东西绘制到这块画布上。


### 新增的input元素的类型：

* email
* url
* number
* range
* Date Pickers
* date:选取年月日
* month：选取年月
* week：选取周和年
* time：选取时间（小时和分钟）
* datetime：选取时间、年月日
* datetime-local：选取本地时间、年月日

### 废除的元素：

1. 纯粹为画面展示服务的、能够被CSS替代的元素：basefont,big,center,s,u等元素
2. 不再使用frame框架
3. 只有部分浏览器支持的元素：marquee,applet,bgsound等元素
4. 其他部分元素


## 全局属性

全局属性是指可以对任何元素都使用的属性。

* contentEditable属性：允许用户编辑元素中的内容，属性值为布尔值。
* designMode属性：指定整个页面是否可连击，属性值为on和off,其实际改变的是整个页面所有元素的contentEditable的值。
* hidden属性：功能室通知浏览器不渲染该元素，使元素处于不可见的状态，其值为布尔值。
* spellcheck属性：是针对input和textarea两个文本框提供的拼写和语法检查，必须声明属性值为true或false


## 表单与文件

### 表单元素的新增属性：

* form属性：form属性的值表示该表单的id,有了id，我们就可以声明该元素从属于哪个表单了。

```
<form id="testForm"></form>
<input form="testForm"></input>

```

* formaction属性：
* formmethod属性：
* placeHolder属性：
* autofocas:
* list
* autocomplete

### 改良input元素的种类：

* search
* tel
* url
* email
* number
* range
* color
* file
* 时间类

### 表单验证：

* required属性：在提交时，如果元素内容为空白，则不允许提交，同时显示信息提示文字，提示用户这个元素必须输入内容。
* pattern属性：属性值为某个格式的正则表达式，在提交时会检查提交内容是否符合给定格式。例如：

```
<input pattern = "[0-9][A-Z]{3}" name=part placeholder="请输入一个数字与三个大写字母"></input>
```

* step属性：控制input元素中的值增加或减少时的步幅。
* checkValidity方法：显式的对表单内所有元素内容或单个元素内容进行有效性验证，结果以布尔值的形式返回。
* 自定义错误信息：setCustomValidity


### 文件API

* FileList对象与file对象：前者表示用户选择的文件列表，在HTML4中，file控价一次只能放置一个文件，但是HTML5，通过添加multiple属性，可以一次放置多个文件，空间内每一个用户选择的文件都是一个file对象，而fileList这是这些file对象的列表，代表用户选择的所有文件。 
* Blob对象：表示二进制原始数据，它提供一个slice方法，可以通过这个方法访问到字节内部的原始数据块。它有两个属性，size表示字节长度，type表示MIME类型，如果是未知类型，则返回一个空字符串。

```
<body>
    <input type="file" id="file" />
    <input type="button" value="显示文件信息" onclick="ShowFileType()" />
    文件字节长度：<span id="size"></span><br>
    文件类型：<span id=type></span><br>

    <script>
        function ShowFileType() {
            var file = document.getElementById("file").files[0];
            var size = document.getElementById("size");
            size.innerHTML = file.size;
            var type = document.getElementById("type");
            type.innerHTML = file.type;
        }

    </script>
</body>
```

* FileReader接口：主要用来把文件读入内存，并且读取文件中的数据。它提供一个异步API，使用该API可以在浏览器主线程中异步访问文件系统，读取文件中的数据。

检查浏览器是否支持该接口：

```
if(typeof FileReader == "undefined"){
	alert("您的浏览器不支持该接口")
}else{
	var reader = new FileReader()
}
```

这个接口有4个方法：

1. readAsBinaryString:将文件读取为二进制码
2. readAsText:将文件读取为文本
3. readAsDataURL:将文件读取为DataURL
4. abort:中断读取操作

需要注意的是，无论读取成功或失败，方法并不会返回读取结果，这一结果存储在result属性中。

### 拖放API

#### 实现拖放的步骤：

1. 将想要拖放的对象元素的draggable属性设置为true。
2. 编写与拖放有关的事件处理代码。

```
<body>
    <div id = "dragMe" draggable="true" style="width:200px;height:200px;background-color:red">请拖拽</div>
    
    <div id = "text" style="width:200px;height:200px;background-color:blue">123</div>


    <script>
        function init(){
            var source = document.getElementById("dragMe");
            var dest = document.getElementById("text");
            source.addEventListener("dragstart",function(ev){
                var dt = ev.dataTransfer;
                dt.effectAllowed = "all";

                dt.setData("text/plain","你好");
            },false);

            dest.addEventListener("dragend",function(ev){
                ev.preventDefault()
            },false);

            dest.addEventListener("drop",function(ev){
                var dt = ev.dataTransfer;
                var text = dt.getData("text/plain");
                dest.textContent += text;
                ev.preventDefault();
                ev.stopPropagation();
            },false)

        }
        document.ondragover = function(e){e.preventDefault};
        document.ondrop = function(e){e.preventDefault}
    </script>
</body>
```
