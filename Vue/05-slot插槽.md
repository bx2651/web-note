# slot插槽
组件本身不具有扩展性，插槽的使用是为了让组件具有扩展性，让使用者决定插槽里放什么内容。

在封装组件的时候，应该抽取共性封装，将不同预留成插槽。
## 插槽的基本使用

```

<body>
    <div id="app">
        <cpn>
            <button>定制按钮</button>
        </cpn>
        <cpn><a href="#">链接</a></cpn>
        <cpn></cpn>
    </div>
    <template id="cpn">
        <div>
            <h2> 我是子组件</h2>
            <slot><button>按钮</button></slot>
        </div>
    </template>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
                massage: "你好啊"
            },
            components: {
                cpn: {
                    template: '#cpn',
                    
                }
            }
        })
    </script>
</body>
```

##具名插槽（Vue2.6已废弃）

```
<body>
    <div id="app">
        <cpn>
            <!-- 具名插槽的使用 -->
            <button slot="left">定制按钮1</button>
            <!-- 不写slot属性时，将只对没有name属性的插槽进行替换 -->
            <button>定制按钮2</button>
        </cpn>
        <cpn><a href="#">链接</a></cpn>
        <cpn></cpn>
    </div>
    <template id="cpn">
        <div>
            <h2> 我是子组件</h2>
            <!-- 具名插槽 -->
            <slot name="left"><button>按钮</button></slot>
            <slot name="right"><button>按钮</button></slot>
            <slot><button>按钮</button></slot>
        </div>
    </template>

    <script>
        var app = new Vue({
            el: '#app',
            data: {
                massage: "你好啊"
            },
            components: {
                cpn: {
                    template: '#cpn',  
                }
            }
        })
    </script>
</body>
```