Vue和Echarts使用v-show切换饼图显示坐标轴

今天在工作中遇到了这个问题：

一个Tab栏切换三张图表：柱状图，饼图，折线图

从柱状图切换到饼图的时候发现下面坐标轴没有消失，查阅文档发现是因为Echart柱状图和折线图的坐标轴属性：xAliax和yAliax有一个默认的show属性，这个属性的默认值为true,在切换图表的过程中这个show值并不会随之改变。

```
      this.histogram = {
        color: ["#3398DB"],
        tooltip: {},
        xAxis: [
          {
            show:true,
            data: this.adName1
          }
        ],
        yAxis: [
          {
            show:true,
            type: "value"
          }
        ],
        series: [
          {
            name: "数量",
            type: "bar",
            data: this.count
          }
        ]
      };
      this.Line = {
        xAxis: {
          show:true,
          data: this.adName1
        },
        yAxis: {
          show:true,
          type: "value"
        },
        series: [
          {
            type: "line",
            data: this.count
          }
        ]
      };
      this.pie = {
        tooltip: {},
        xAxis: {
          show: false
        },
        yAxis: {
          show: false
        },
        series: [
          {
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.pieInfo
          }
        ]
      };  
    }
```

所以，只需要将饼图的坐标轴show改为false,其他需要显示坐标轴的改为true即可。