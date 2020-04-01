## css盒模型

### 1.基本概念

当对一个文档进行布局（lay out）的时候，浏览器的渲染引擎会根据标准之一的 CSS 基础框盒模型（CSS basic box model），将所有元素表示为一个个矩形的盒子（box）。

每个盒子由四个部分（或称区域）组成，其效用由它们各自的边界（Edge）所定义（原文：defined by their respective edges，可能意指容纳、包含、限制等）。如图，与盒子的四个组成区域相对应，每个盒子有四个边界：内容边界 Content edge、内边距边界 Padding Edge、边框边界 Border Edge、外边框边界 Margin Edge。


### 2.标准盒模型盒IE盒模型

标准盒子模型中，width和height指的是内容区域的宽度和高度，增加内边距、外边距和边框不会影响内容区域的尺寸，但是会增加元素框的总尺寸。

IE盒模型中，width和height指的是内容区域+border+padding的宽度和高度。

### 3.CSS如何设置这两种模型
代码如下：

```
    /* 设置当前盒子为 标准盒模型（默认） */
    box-sizing: content-box;

    /* 设置当前盒子为 IE盒模型 */
    box-sizing: border-box;
```

放在实例中看一下


```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
      div{
        margin: 10px;
        padding: 20px;
      }
      .content{
        background-color: blue;
        box-sizing: content-box;
        width: 200px;
        height: 200px;
      }
      .border{
        background-color: red;
        box-sizing: border-box;
        width: 200px;
        height: 200px;
      }
    </style>
</head>
<body>
  <div >
    <div class="content">content-box</div>
    <div class="border">border-box</div>
  </div>
<div class="footer"></div>
</body>

```

效果如下：

![](../img/border_content.jpeg)

**盒子默认为标准盒模型**


### 4.JS设置和获取盒模型对应的宽和高


##### 方式一：通过DOM节点的style样式获取

```
element.style.width/height
```
这种方式只能获取行内样式，不能获取**内嵌**的样式和**外链**的样式

##### 方式二：通用型(chrome,火狐)

```
window.getComputedStyle(element).width/height
```

##### 方式三：IE独有

```
element.currentStyle.width/height;
```

##### 方式四：

```
element.getBoundingClientRect().width/height
```

这个API的作用是，获取一个元素的绝对位置。

绝对位置是视窗viewport左上角的绝对位置