
SCSS 是 Sass 3 引入新的语法，其语法完全兼容 CSS3，并且继承了 Sass 的强大功能。也就是说，任何标准的 CSS3 样式表都是具有相同语义的有效的 SCSS 文件。
Sass 和 SCSS 其实是同一种东西，我们平时都称之为 Sass，两者之间不同之处有以下两点：

* 文件扩展名不同，Sass 是以“.sass”后缀为扩展名，而 SCSS 是以“.scss”后缀为扩展名

* 语法书写方式不同，Sass 是以严格的缩进式语法规则来书写，不带大括号({})和分号(;)，而 SCSS 的语法书写和我们的 CSS 语法书写方式非常类似。

sass语法：

```
$font-stack: Helvetica, sans-serif  //定义变量
$primary-color: #333 //定义变量

body
  font: 100% $font-stack
  color: $primary-color

```

scss语法：

```
$font-stack: Helvetica, sans-serif;
$primary-color: #333;

body {
  font: 100% $font-stack;
  color: $primary-color;
}

```

sass缩进语法有很多有趣的点。首先，它更短并且更易于书写。没有花括号，没有分号，你完全不需要这些东西。更好的是，你甚至不需要@mixin 或者 @include, 一个字符就足够了：= 和 +。

同时 Sass 通过严格的缩进来强制 clean coding standards。因为一个错误的缩进就会破坏整个.sass文件，这使得整个代码总是clean 和格式良好的。只有一种写 Sass 代码的方式：正确的方式。

但是请注意！缩进在 Sass 中是有意义的。当你缩进了一个元素，这意味这你将它变为了之前元素的子元素。比如:

```
.element-a
    color: hotpink

    .element-b
        float: left
```

以上会输出下面的 CSS 代码：

```
.element-a {
    color: hotpink;
}

.element-a .element-b {
    float: left;
}
```

将 .element-b 向右一格以为着它变成了 .element-a 的子元素，改变了输出 CSS 代码的结果。所以一定要小心你的代码缩进。


对于初学者来讲，SCSS 是完全和 CSS 兼容的，这意味着几乎为零的学习曲线。SCSS语法即是：它只是加了一些功能的 CSS。当你和没经验的开发者一起工作时这很重要：他们可以很快开始编码而不需要首先去学习Sass。

此外，SCSS 还是 易于阅读 的，因为它是有语义的，而不是用符号表示。当你读到 @mixin，你就会知道这是一个 mixin 声明；当你看到 @include ，你就是在引用一个 mixin。他并没有用任何缩写，当你大声读出来时所有的都很明了。

还有，现在几乎所有 Sass 的工具，插件和 demo 都是基于 SCSS语法来开发的。随着时间过去，SCSS 会变成大家首选的选择。比如，你现在很难找到一个 Sass 缩进语法的高亮插件，通常都只有 SCSS 的可以用。