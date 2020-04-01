## 隐藏盒子的几种方式
隐藏盒子，有以下几种方式：

方式一：

```
overflow：hidden;   //隐藏盒子超出的部分
```
方式二：

```
display: none;	  隐藏盒子，而且不占位置(用的最多)
```
比如，点击X，关闭京东首页上方的广告栏。

方式三：

```
visibility: hidden;   //隐藏盒子，占位置。
visibility: visible;   //让盒子重新显示
```
方式四：

```
pacity: 0;       //设置盒子的透明度（不建议，因为内容也会半透明），占位置
```
方式五：

```
Position/top/left/...-999px   //把盒子移得远远的，占位置。
```
方式六：

```
margin-left: 1000px;
```

## 清除浮动的方法：

要介绍清除浮动的方法，首先应该了解一下为什么会有浮动，以及元素浮动之后会产生什么样的效果：

最初产生浮动是为了解决图文混排的，左边图片，右边文字比较美观。但是当子元素浮动后，子元素脱离的标准流，不再能撑得起来父容器的高度，导致父容器塌陷，

1.隔墙法:在最后一个浮动标签后，新加一个块级元素，给其设置clear：both（不推荐，不符合结构样式分离的思想，且可读性较差）
内墙法可以让上面的盒子使用margin-bottom并且第二个盒子使用margin-top属性，而外墙法第一个盒子无法使用margin-bottom,因为外墙法无法撑起第一个盒子的高度

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
    .fahter{
        width: 400px;
        border: 1px solid deeppink;
    }
    .big{
        width: 200px;
        height: 200px;
        background: darkorange;
        float: left;
    }
    .small{
        width: 120px;
        height: 120px;
        background: darkmagenta;
        float: left;
    }
    .footer{
        width: 900px;
        height: 100px;
        background: darkslateblue;
    }
    .clear{
        clear:both;
    }
    </style>
</head>
<body>
    <div class="fahter">
        <div class="big">big</div>
        <div class="small">small</div>
        <div class="clear">额外标签法</div>
    </div>
    <div class="footer"></div>
</body>
```

2.父级添加overflow属性（父元素添加overflow:hidden）:代码比较简洁，但缺点是当元素内容较多时，会导致溢出的部分被隐藏掉。
```
.fahter{
        width: 400px;
        border: 1px solid deeppink;
        overflow: hidden;
    }
```

3.使用after伪元素清除浮动（推荐使用）

优点：符合闭合浮动思想，结构语义化正确

缺点：ie6-7不支持伪元素：after，使用zoom:1触发hasLayout.

```

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <style>
        .fahter{
            width: 400px;
            border: 1px solid deeppink;
        }
        .big{
            width: 200px;
            height: 200px;
            background: darkorange;
            float: left;
        }
        .small{
            width: 120px;
            height: 120px;
            background: darkmagenta;
            float: left;
        }
        .clearfix:after{/*伪元素是行内元素 正常浏览器清除浮动方法*/
            content: "";/*必须存在*/
            display: block;/*必须是块级元素才能清除两侧浮动，如果该元素原本就是块级元素，则可以省略*/
            clear:both;/*清除两侧浮动*/
        }
        .clearfix{
            *zoom: 1;/*ie6清除浮动的方式 *号只有IE6-IE7执行，其他浏览器不执行*/
        }
    </style>
</head>
<body>
  <div class="fahter clearfix">
    <div class="big">big</div>
    <div class="small">small</div>
  </div>
<div class="footer"></div>
</body>
```

4.使用before和after双伪元素清除浮动:代码更简洁
缺点：用zoom:1触发hasLayout.

```

     .clearfix:after,.clearfix:before{
        content: "";
        display: table;
    }
    .clearfix:after{
        clear: both;
    }
    .clearfix{
        *zoom: 1;
    }
 
 <div class="fahter clearfix">
        <div class="big">big</div>
        <div class="small">small</div>
    </div>
    <div class="footer"></div>
```

5.给父盒子设置Height属性

## 未知宽高的元素上下左右居中

1.绝对定位+transform属性

```
.box{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
```

2.绝对定位(相当于强制将盒子的大小调整为当前窗口的大小)

```
.box {
position: absolute;
top: 0;
left: 0;
right: 0;
bottom: 0;
margin: auto;
}
```

