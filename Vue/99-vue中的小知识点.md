# vue中的小知识点：

## vue监听图片加载完毕：

@load="方法"

img.onload = function(){}//原生js监听图片加载完毕


## 事件总线

包含三部分代码：

Vue.prototype.bus = new Vue()
this.bus.emit('事件名称',参数)
this.bus.on('事件名称'，回调函数（参数）)

## 防抖函数

如果我们直接刷新数据，可能会一次性刷新30次。那么我们就可以把这个属性的函数传入到deboundce函数中，生成一个新的函数，之后在调用非常频繁的时候，就使用新生成的函数，而新生成的函数，并不会被频繁的调用，如果下一次刷新来的特别快，那么将会将下一次刷新取消掉。

```
    // this.$refs.scroll.refresh();
      
    const refresh = this.deboundce(this.$refs.scroll.refresh, 500);//将刷新的函数传入到防抖函数中，设置延时时间为500毫秒。
    this.$bus.$on("itemImgLoad", () => {
      refresh();//调用防抖函数
    });
    
    deboundce(func, delay) {//防抖函数
      let timer = null;
      return function(...args) {
        if (timer) clearTimeout(timer);//多次调用时，当上一次防抖还未执行完，则清空上一次的刷新
        timer = setTimeout(() => {
          func.apply(this, args);
        }, delay);
      };

```