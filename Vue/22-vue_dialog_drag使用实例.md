# vue dialog-drag使用实例

最近有这样一个需求：点击地图的某一个点，弹出这个点的相关信息的弹框，因为这个点的数据和内容比较多，所以单独写了一个vue文件，原本写的这个弹窗就是用一个div包装的一个页面，但是领导要求弹窗可以拖拽，所以采用了vue的dialog-drag这个功能。


1.引入dialog-drag组件和要显示的信息的页面：

```
import DialogDrag from 'vue-dialog-drag'
import mapList from "@/views/map/starter/index";

```

2.注册组件：

```
    components: {
      DialogDrag,
      mapList
    },

```

3.使用组件：

```

<dialog-drag v-show="isShow"  id="dialog-1" @close="closeDlg" v-on:click="showDetail" ref="inputA">
  <mapList  :ground='ground'/>
</dialog-drag>

```

将要显示的页面用dialog-drag包裹起来，v-show用来控制弹窗什么时候显示或隐藏，@close用来控制弹窗的关闭，我会在每一次点击弹窗关闭的时候，把ground里保存的数据清空一下，因为我的别的弹窗也是用的这个dialog,如果不清空的话，会导致别的弹窗在点的时候，ground的数据未清空，也显示在弹窗里。@click用来调用传递给子组件数据的方法。

因为有一些数据需要通过父子组件传值来传递，所以写了一个:ground='ground'。