# webpack

webpack其中一个核心是让我们可以进行模块化开发，并且会帮助我们处理模块之间的相互依赖关系。

不仅仅是js文件，css,图片，json文件等等在webpack中都可以被当做模块来使用。

webpack依赖node环境，node环境为了正常执行很多代码，必须依赖各种包，所以我们需要npm包管理工具npm:（node packages manager）。nodejs自动安装npm包管理工具

#### webpack和grunt/gulp的区别

* grunt/gulp的核心是task，可以通过配置一系列的task，并定义task要处理的事物，比如ES6,ts的转化，图片压缩，scss转化成css;

```
const gulp = require ('gulp');
const babel = require('gulp-babel')

gulp.task('js',()=>
	gulp.src('src/*.js')
		 .pipe(babel({
		 	presets:['es2015']
		 }))
		 pipe(gulp.dest('dist'))
```

* 如果工程模块依赖简单，甚至没有用到模块化的概念，只需要简单的合并，压缩，用gulp和grunt即可。
* grunt/gulp强调的是前端流程自动化，模块化不是他的核心。
* webpack强调的是模块化开发管理，而文件压缩合并，预处理等功能是他附带的功能。

###webpack.config.js文件的配置
```
//获取绝对路径需要使用node核心模块path
const path = require('path')

module.exports={
    entry:'./src/main.js',//入口文件
    output:{
    //出口文件，需要是一个对象，其中包含存储的路径和文件名
        path : path.resolve(__dirname,'dist'),
        //path模块的resolve方法，拼接 通过__dirname来获取当前文件所在的绝对路径和要存储的文件夹名。
        filename:'bundle.js',
        //通常命名为bundle.js
        publicPath:'dist/'
        //
    }
}
```

#### 全局安装和局部安装的区别：

##loader
在开发过程中，不仅有js文件，还有css，图片等文件，而webpack不支持将这些文件转化，这时候就需要给webpack扩展对应的loader。

####loader的使用过程：
1.通过npm安装需要使用的Loader

2.在webpack.config.js文件中的modules关键字下进行配置（直接从官网粘贴即可）


```
npm install --save-dev css-loader//Css的loader
npm install style-loader --save-dev//Css需要的Loader
npm i --save-dev url-loader //背景图片需要的loader
npm i file-loader --save-dev //大的背景图片需要的loader
npm i --save-dev babel-loader@7 babel-core babel-preset-es2015//将es6转化成es5的loader
npm i vue --save //解析vue的loader
npm i vue-loader vue-template-compiler --save-dev //解析.vue文件模板的loader(vue-loader的版本问题会导致配置不同，此处安装package文件vue-loader改为13.0.0并npm i后成功解析)

module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    { loader: "style-loader" },
                    { loader: "css-loader" }
                ]
            }, 
            {
                test: /\.less$/,
                use: [{
                    loader: "style-loader" // creates style nodes from JS strings
                }, {
                    loader: "css-loader" // translates CSS into CommonJS
                }, {
                    loader: "less-loader" // compiles Less to CSS
                }]
            }, 
                {
                    test: /\.(png|jpg|gif)$/,//图片loader
                    use: [
                        {
                            loader: 'url-loader',
                            options: {
                                limit: 300,//当图片小于8kb时，使用base64进行编码，大于8kb时，会由fileLoader进行编译
                                name:'img/[name].[hash:8].[ext]'//获取原来的名字，放在该位置
                                // hash:8,//为了防止图片名称冲突，依然使用hash,但是只保留8位
                                // ext:''//使用原来的扩展名
                            }
                        }
                    ]
                },
                {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['es2015']
                    }
                }
            },
            {
                test:/\.vue$/,
                use:['vue-loader']
            }
        ]}
```

### loader和plugin的区别：
loader主要用于转换某种类型的模块，它是一个转化器。

plugin是插件，是对webpack现有功能的扩展，是一个扩展器。

##### 插件的使用
由于目前我们的html文件是存放在根目录下的，而发布时发布的是dist文件夹，所以在打包时应该将html文件也打包进去，这个时候就需要用到html-webpack-plugin插件，它可以根据制定模板生成html文件，并通过script标签将bundle.js文件插入到body中。

```
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')//生成html文件的插件

plugins:[//在module.exports = {}中添加
        new webpack.BannerPlugin('最终版权归bx2651所有')
        new HtmlWebpackPlugin({
      template:'index.html'
    })
    ]
```

### runtimeonly和runtimecompiler

runtimecompiler:template解析成ast,然后编译成render,然后形成虚拟dom树，渲染到页面上

runtimeonly:render -> vdom -> UI性能更高，代码量更少

