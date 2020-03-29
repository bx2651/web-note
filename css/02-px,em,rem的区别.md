
px是相对于显示器的分辨率而言的，IE无法调整那些使用px作为单位的字体大小，国外大多数网站能够调整的原因在于其使用了em或者rem作为字体单位。

em是相对长度单位，相对于当前帝乡内文本的字体尺寸。如果当前行内文本的字体尺寸未被人为设置，则相对于浏览器的默认字体尺寸。

* em的值并不是固定的
* em会继承父级元素的字体大小

> 任意浏览器的默认字体高都是16px,所有未经调整的浏览器都符合：1em=16px。为了简化font-size的换算，需要在css中的body选择器中声明font-size = 62.5%,这就使em值变为16px*62.5%=10px,10px=1em

rem（root em）是css3新增的一个相对单位，rem与em的区别在于，使用rem为元素设定字体大小时，仍然是相对大小，但相对的是HTML根元素，这个单位可以做到只修改根元素就成比例的调整所有字体大小，又可以避免字体大小逐层复合的连锁反应。除了IE8及更早的浏览器,所有浏览器都已经支持rem,对于不支持rem的浏览器则需要多写一个绝对单位的声明：

> p {font-size:14px; font-size:.875rem;}

```
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>test</title>
  <style>
    html{
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      font-size: 62.5%;
    }
    p{
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <div>
    <p>我是文字</p>
  </div>
</body>
</html>
```

所以，当我们在适配移动端时，我们可以利用rem单位，来计算相应元素的宽高：

```
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no">
  <title>test</title>
  <style>

    @media screen and (min-width: 320px) {
      html{
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      font-size: 62.5%;
    }
    @media screen and (min-width: 640px) {
      html{
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      font-size: 125%;
    }
    @media screen and (min-width: 750px) {
      html{
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      font-size: 150%;
    }
    @media screen and (min-width: 1242px) {
      html{
      padding: 0;
      margin: 0;
      height: 100%;
      width: 100%;
      font-size: 187.5%;
    }
    }
    p{
      font-size: 1rem;
    }
  </style>
</head>
<body>
  <div>
    <p>我是文字</p>
  </div>
</body>
</html>
```