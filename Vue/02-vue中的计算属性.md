#计算属性和methods方法
computed属性用来定义函数，在命名时一般不加动词，methods中的函数一般在命名时加动词。

计算属性在插值表达式调用时不需要加小括号，可以直接使用，而methods在使用时需要加括号。

在多次调用两者的时候，如果内容没有发生变化，则computed计算属性只会调用一次，而methods会调用多次，computed性能更优。

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="../vue.js"></script>
</head>

<body>
    <div id="app">
        <h2>
            通过methods计算的总价格{{getTotalPrice()}}
        </h2>
        <h2>
            通过computed计算的总价格{{totalPrice}}
        </h2>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                books: [{
                    id: 110, name: 'js高级程序设计', price: 105
                }, {
                    id: 110, name: 'js权威指南', price: 98
                }, {
                    id: 110, name: 'js基础', price: 120
                }]
            },
            methods: {
                getTotalPrice: function () {
                    let result = 0
                    for (let i = 0; i < this.books.length; i++) {
                        result += this.books[i].price
                    }
                    return result
                }
            },
            computed: {
                totalPrice: function () {
                    let result = 0
                    for (let i = 0; i < this.books.length; i++) {
                        result += this.books[i].price
                    }
                    return result
                }
            }
        })
    </script>
</body>

</html>
```

##计算属性的setter和getter方法

```
<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
    <script src="../vue.js"></script>
</head>

<body>
    <div id="app">
        <h2>
            {{fullName}}
        </h2>
    </div>
    <script>
        var vm = new Vue({
            el: '#app',
            data: {
                firstName:'Bai',
                lastName:'Xue'
            },
            methods: {},
            computed: {
                fullName:function(){//当使用这个方法时，实际是调用下面的fullName2这个属性，由于他是属性，所以调用时不需要加括号
                    return this.firstName + this.lastName
                },                fullName2:{
                    set:function(){},//一般不希望别人改动计算属性的set方法，所以一般set方法会省略掉。如果省略掉了set方法，那么fullName这个属性是只读属性
                    get:function(){
                        return this.firstName + this.lastName
                    }
                }
            }
        })
    </script>
</body>

</html>
```

##计算属性的缓存