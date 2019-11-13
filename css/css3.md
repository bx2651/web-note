CSS3 被划分为模块。

其中最重要的 CSS3 模块包括：

# 选择器
https://www.w3school.com.cn/cssref/css_selectors.asp

# 背景和边框
## 背景
#### background-size
background-size:50px 100px;
background-size:120%
属性规定背景图片的尺寸。

在 CSS3 之前，背景图片的尺寸是由图片的实际尺寸决定的。在 CSS3 中，可以规定背景图片的尺寸，这就允许我们在不同的环境中重复使用背景图片。

我们可以以像素或百分比规定尺寸。如果以百分比规定尺寸，那么尺寸相对于父元素的宽度和高度。

#### background-origin
background-origin:padding-box/border-box/content-box
属性规定 background-position 属性相对于什么位置来定位:内边距、边框、内容。

注释：如果背景图像的 background-attachment 属性为 "fixed"，则该属性没有效果。

#### background-clip 
background-clip: border-box/padding-box/content-box;
属性规定背景的绘制区域,规定了背景被裁减到边框盒、内边距、内容框

## 边框
```
border-radius:宽高相同时，该属性的值为宽高的一半时可以画出一个正圆。
box-shadow:h-shadow必选 v-shadow必选 blur spread color inset(默认值outset)
(object.style.boxShadow="10px 10px 5px #888888")

border-image：
border-image-source
border-image-slice:向内偏移
border-image-width
border-image-outset：超出的量
border-image-repeat
```
# 文本效果
#### 文本阴影text-shadow
水平阴影、垂直阴影、模糊距离,阴影的颜色
可向文本应用阴影。
#### word-wrap 
允许文本强制文本进行换行,对单词进行拆分：

水平阴影、垂直阴影、模糊距离，以及阴影的颜色：
# 字体
#### @font-face 规则
在 CSS3 之前，web 设计师必须使用已在用户计算机上安装好的字体。

通过 CSS3，web 设计师可以使用他们喜欢的任意字体:将该字体文件存放到 web 服务器上，它会在需要时被自动下载到用户的计算机上。

# 2D/3D 转换
# 动画
# 多列布局
column-count	规定元素应该被分隔的列数。	3
column-fill	规定如何填充列。	3
column-gap	规定列之间的间隔。	3
column-rule	设置所有 column-rule-* 属性的简写属性。	3
column-rule-color	规定列之间规则的颜色。	3
column-rule-style	规定列之间规则的样式。	3
column-rule-width	规定列之间规则的宽度。	3
column-span	规定元素应该横跨的列数。	3
column-width	规定列的宽度。	3
columns	规定设置 column-width 和 column-count 的简写属性。
# 用户界面