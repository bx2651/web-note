## canvas元素

用canvas元素绘制图形，需要经过几道步骤：
1. 取得canvas元素
2. 取得图形上下文：图形上下文是一个封装了很多绘图功能的对象，需要使用canvas对象的getContext方法来获得图形上下文。在draw函数中，将参数设置为2d（不能设置为3d或4d）。
3. 填充与绘制边框
4. 设定绘图样式：strokeStyle:图形边框的样式，在该属性中填入边框的颜色值；fillStyle:填充的样式，填入填充的颜色值。
5. 指定线宽：lineWidth属性设置图形边框的宽度。
6. 指定颜色值。
7. 绘制矩形：fillRect方法与strokeReck方法（context.fillRect(x,y,width,height)）,x和y分别指矩形起点的横坐标和纵坐标；fillStyle属性和strokeStyle属性指定颜色

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script>
        function draw(id){
            var canvas = document.getElementById(id)
            if(canvas == null)return false;
            var context = canvas.getContext('2d');//取得元素上下文
            context.fillStyle = "yellow";//第一个画笔颜色
            context.fillRect(0,0,400,900);//第一个画笔要填充的区域横纵坐标起点与宽高
            context.fillStyle = "green";//第二个画笔颜色
            context.strokeStyle = "pink";//边框颜色
            context.lineWidth = 10;//边框宽度
            context.fillRect(50,50,100,200);//第二个画笔要填充的横纵坐标起点以及宽高
            context.strokeRect(50,50,100,300);//边框横纵坐标起点以及宽高
            context.fillStyle = "blue";//第三个画笔颜色
            context.fillRect(200,200,50,60);//第三个画笔要填充的区域

        }  
    </script>
</head>

<body onload="draw('canvas')">
    <div>
        <canvas id="canvas" width="400" height="400">可以在标签内写一些信息，如果浏览器不支持canvas标签，则会显示此内容</canvas>
    </div>


    
</body>

</html>
```


