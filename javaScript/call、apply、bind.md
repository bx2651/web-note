# call/apply/bind

### call()和apply()的作用

** 改变this的指向
实现继承(调用函数)**

## call()和aplly()的相同点：

这两个方法都是函数对象的方法，需要通过函数对象来调用。
当函数调用call和apply时会立刻执行。
当函数调用这两种方法时，会改变其this的指向。两个方法的第一个参数都是this要指向的对象。

```
    function foo() {
        console.log(this);
    }

    var obj = {
        a: 2
    };

    // 将 this 指向 obj
    foo.apply(obj); //打印结果：2 
```
如果直接调用函数、不传递参数、或者参数为null或undefined时，则打印的是window（非严格模式）；
传递一个别的函数名或对象时，函数中的this会指向这个函数或对象；
传递的值为数值、布尔值、字符串时，this会指向这些基本类型的包装对象Number、Boolean、String；



### call()和apply()的区别
call()和apply()方法都可以将实参在对象之后依次传递，但是apply()方法需要将实参封装到一个数组中统一传递（即使只有实参只有一个，也要放到数组中）。

比如针对下面这样的代码：
```
    var persion1 = {
        name: "小王",
        gender: "男",
        age: 24,
        say: function (school, grade) {
            alert(this.name + " , " + this.gender + " ,今年" + this.age + " ,在" + school + "上" + grade);
        }
    }
    var person2 = {
        name: "小红",
        gender: "女",
        age: 18
    }
  ```

如果是通过call的参数进行传参，是这样的：

	persion1.say.call(persion2, "实验小学", "六年级");
如果是通过apply的参数进行传参，是这样的：

	persion1.say.apply(persion2, ["实验小学", "六年级"]);

**call后面的实参与say方法中是一一对应的，而apply传实参时，要封装成一个数组，数组中的元素是和say方法中一一对应的，这就是两者最大的区别。**


apply的应用：
```
var arr = [1,2,3,4,5]
var max = Math.max(Math,arr)//无需改变this的指向，所以第一个参数可以为null或undefined
var min = Math.min.apply(Math,arr)
console.log(max,min)
```

## bind：

1.bind（）不是立即执行函数，是在需要时才调用的。
2.bind（）不会调用函数。
2.bind（）的传参方式与call()一样。
3.bind（）和call(),apply()一样，都能改变this的指向。

```
<button>点击</button>
    <button>点击</button>
    <button>点击</button>

<script>
    var btn=document.querySelectorAll('button');
    for(var i = 0;i<btn.length;i++){
        btn[i].onclick=function(){//每次点击时调用定时器，禁用按钮3秒后恢复。
            this.disabled = true;
            setTimeout(function(){
                this.disabled=false;
                }.bind(this),3000)//此处的this指向btn
        }
    }
</script>
```


## 三者的主要应用场景

1.call常用作继承
2.apply经常与数组有关，比如借助数学对象实现数组最大值和最小值。
3.bind不调用函数，但是想改变this指向。比如定时器

