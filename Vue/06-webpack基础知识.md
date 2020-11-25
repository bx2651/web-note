webpack是前端资源构建工具，一个静态模块打包器。



在webpack看来，前端所有的资源文件(js/css/img/less...)都会作为模块处理，它根据模块的依赖关系进行静态分析，打包生成对应的静态资源bundle。



## webpack的五个核心概念



### Entry



entry入口指示webpack以哪个文件为入口起点开始打包，分析构建内部依赖图。

单入口：

```
entry:'./src/index.js'
```

多入口：

```
entry:['./src/index.js','./src/add.js']
```
以上两种方式都是将文件打包形成一个chunk文件，最终输出为一个bundle文件。

对象形式：有几个文件就形成几个chunk,输出几个bundle.

```
entry:{
	index:'./src/index.js',
	add:'./src/add.js'
}
```


### Output


output输出指示打包后的资源bundle输出到哪里去，以及如何命名。

```
output:{
	filename:'js/[name].js',
	path:resolve(__dirname,'build')
	publicPath:'/',
	chunkFilename:'js/[name]_chunk.js'//非入口文件chunk名称,
	library:'[name]',//整个库向外暴露的变量名
	libraryTarget:'window',//变量名添加到哪个上
}
```

### Loader

loader让webpack能够去处理那些非JavaScript的文件。


通常，一个Loader只能被一个Loader处理，当一个文件要被多个Loader处理，那么一定要指定loader执行的先后顺序。enforce:pre


```
module:{
	rules:[
		{
			test:/\.css$/,
			use:['style-loader','css-loader']
		},{
			test:/\.js$/,
			loader:'eslint-loader',
			exclude:/node-modules/,
			include:resolve(__dirname,'src'),//只检查该目录下的文件
			enforce:'pre',//延后为post
			
		}
	]
}
```

### Plugins



Plugins插件可以用于执行范围更广的任务，插件的范围包括，从打包优化和压缩，一致到重新定义环境中的变量等。



### Mode



模式指示webpack使用相应模式的配置。



* development:会将process.env.NODE_ENV的值设置为development,能让代码本地调试运行的环境。
* production:会将process.env.NODE_ENV的值设置为production,能让代码优化上线运行的环境。




运行指令：

* 开发环境：webpack ./test.js -o ./build/bundle.js --mode=development

webpack会以./test.js为入口文件开始打包，打包后输出到/build/bundle.js,整体打包环境是开发环境。

* 生产环境：webpack ./test.js -o ./build/bundle.js --mode=production

**修改代码后需要重新打包**


* webpack能处理js/json资源，不能处理css/img等其他资源。
* 生产环境和开发环境将es6模块化编译成浏览器能识别的模块化。
* 生产环境比开发环境多一个压缩js代码。


webpack.config.js是webpack的配置文件，作用：当运行webpack指令时，会加载里面的配置。



所有构建工具都是基于node.js平台运行的，模块化默认采用commonjs。

```

const {resolve} = require('path')



module.exports = {

	//webpack配置

	//入口起点

	entry:'./src/index.js,

	//输出

	output:{

		//输出文件名

		filename:'built.js',

		//输出路径 __dirname是nodejs的变量，代表当前文件的目录的绝对路径

		path:resolve(__dirname,'build')

	},

	module:{

		rules:[

			//详细loader配置

			{

				//匹配哪些文件

				test:/\.css$/,

				//前者是创建style标签，将js中的样式资源插入到js中，添加到head中生效，后者是将css文件编程commonjs模块加载js中，里面内容是样式字符串。执行顺序是从右到左。

				use:['style-loader','css-loader']

			},{

				test:/\.less$/,

				use:['style-loader','css-loader','less-loader']

			}

		]

	},

	plugins:[

	],

	mode:'development'

	//mode:'production'

}
```
以上的做法可以将css样式一起输出到js文件中，但是如果需要将css单独输出为一个文件，就可以用另一个插件：mini-css-extract-plugin，这个插件可以从css中提取css代码到单独的文件中，对css代码进行压缩。

**css兼容性处理**

**js兼容性处理**
bable-loader @bable/core 按需加载


### resolve

解析模块的规则

```
resolve:{
	alias:{//配置路径别名:@符号就相当于src的绝对路径
		@:resolve(__dirname,'./src')
	},
	extensions:['.js','.json'],//配置路径的后缀名
	modules:[resolve(__dirname,'../../node_modules'),'node_modules'],//告诉webpack解析模块是去哪个目录,前者是告诉具体的路径，加快速度
}

```

### devServer

```
devServer:{
	//运行代码的目录
	contentBase:resolve(__dirname,''build),
	watchContentBase:true,//监视该目录下的所有文件，一旦文件变化就会reload
	watchOptions:{
		//忽略文件
		ignore:true
	}
	//启动gzip压缩，加快速度
	compress:true,
	port:8080,
	host:'localhost',
	open:true,//自动打开浏览器
	hot:true,//开启HRM功能
	clientLogLevel:'none',//不要显示启动服务器日志信息
	//除了一些启动基本信息以外，其他内容都不要显示
	quiet:true,
	overlay:false,//如果出错了，不要全屏提示
	proxy:{
		//解决开发环境跨域问题,一旦服务器接受到/api/xxx的请求，就会把请求转发到另外一个服务器3000。原理是服务器与服务器之间不存在跨域问题，进行网络请求的时候，proxy会帮助我们将我们请求远端服务器改为我们请求本地服务器，本地服务器帮助我们请求远端服务器，这样，开发环境跨域问题就解决了。
		'api':{
			target:'http://localhost:3000',
			pathRewhite:{
				'^/api':''
			}
		}
	}
}
```

### optimazation

以下全部都是默认值，可以不写。

```
optimazation:{
	splitChunks:'all',
	minSize:30*1024,//分割的chunk最小为30kb
	maxSize:0,//最大没有限制
	minChunks:1,//要提取的chunk最少被引用1次
	maxAsyncRequests:5,//按需加载时并行加载的文件的最大数量
	maxInitialRequest:3,//入口js文件最大并行请求数量
	automaticNameDelimiter:'~',//名称连接符
	name:true,//可以使用命名规则
	cacheGroup:{
		//node_modules文件会被打包到vendors组的chunk中，并且满足上面的公共规则。
		vendors:{
			test:/[\\]node_modules[\\/]/,
			priority:-10,//打包优先级为-10
		},
		default:{
			minChunks:2,//要提取的chunk最少被引用2次,
			priority:-20,
			reuseExistingChunk:true,//如果当前要打包的模块，和之前以前被提取的模块是同一个，就会复用，而不是重新打包模块。
		}
	},
	
	//将当前模块的记录其他模块的hash单独打包为一个文件runtime
	//解决：修改a文件导致b文件的contenthash变化
	runtimeChunk: {
      name: entrypoint => `runtime~${entrypoint.name}`
    },
    
    minimizer:[
    	//配置生产环境的压缩方案:js和css
    	new TerserWebpackPlugin({
    		cache:true,//开启缓存
    		parallel:true,//开启多进程打包
    		sourceMap:true,//启动source-map
    	})	
    ]
    
}

```



### 打包HTML资源

```
const resolve = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      //loader的配置
    ]
  },
  plugins:[
    //plugins的配置
    //功能：默认会创建一个空的html，自动引入打包输出的所有资源（js/css）
    //需求：需要有结构的HTML文件
    new HtmlWebpackPlugin({
      //复制下面的文件，并自动引入打包输出的所有资源
      template:'./src/index.html'
    })
  ],
  mode:'development'
}
```

### 打包图片资源

```
const resolve = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      //loader的配置
      {
        test:/\.less$/,
        //使用多个loader使用use关键字
        use:['style-loader','css-loader','less-loader']
      },{
        //处理图片资源
        test:/\.(jpg|png|gif)/,
        //使用一个loader只用loader关键字就可以
        //使用url-loader需要下载url-loader和file-loader
        loader:'url-loader',
        option:{
          //图片小于8kb，就会被base64处理
          //优点：减少请求数量，减轻服务器压力；
          //缺点：图片体积可能会更大，使文件请求速度更慢
          limit: 8*1024,
          //取Hash值的前10位和文件的原扩展名。
          name:'[hash:10].[ext]
        }
      },{
        test:/\.html$/,
        //处理html文件的img图片（负责引入img,从而能被url-loader进行处理）
        loader:'html-loader'
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development'
}
```

以上配置中，由于url-loader不能处理html文件中引入的文件，所以我们又使用了一个html-loader.

### 打包其他资源

```
const resolve = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      //loader的配置
      {
        test:/\.less$/,
        use:['style-loader','css-loader']
      },{
      	 //打包除了html/js/css资源以外的资源
        exclude:/\.(css|js|html)$/,
        //排除以上资源
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development'
}

```

## devServer

作用：用来自动化（自动编译、自动打开浏览器、自动刷新浏览器）

```
const resolve = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry: './src/index.js',
  output:{
    filename:'built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      //loader的配置
      {
        test:/\.less$/,
        use:['style-loader','css-loader']
      },{
        exclude:/\.(css|js|html)$/,
        //排除以上资源
        loader:'file-loader',
        options:{
          name:'[hash:10].[ext]'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  mode:'development',

  devServer:{
    //特点：只会在内存中编译打包，不会有任何输出
    //启动devServer指令为：npx webpack serve

    //项目构建后的路径
    contentBase:resolve(__dirname,'built'),
    //启动gzip压缩
    compress:true,
    //端口号
    port:8080,
    //自动打开默认浏览器
    open:true
  }
}
```

### 完整配置

```
const {resolve} = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  entry:'./src/index.js',
  output:{
    filename:'js/built.js',
    path:resolve(__dirname,'build')
  },
  module:{
    rules:[
      {
        test:/\.less$/,
        use:['style-loader','css-loader','less-loader']
      },{
        test:/\.css$/,
        use:['style-loader','css-loader']
      },{
        //处理图片资源
        test:/\.(jpg|png|gif)$/,
        loader:'url-loader',
        option:{
          limit:8*1024,
          name:'[hash:10].[ext]',
          //关闭es6模块化
          esModule:false,
          outputPath:'imgs'
        }
      },{
        //处理html中的img资源
        test:/\.html$/,
        loader:'html-loader'
      },{
        //处理其他资源
        exclude:/\.(html|js|css|jpg|png|gif)$/,
        loader:'file-loader',
        option:{
          name:'[hash:10].[ext]',
          outputPath:'assets'
        }
      }
    ]
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html'
    })
  ],
  devServer:{
    contentBase:resolve(__dirname,'build'),
    compress:true,
    port:3000,
    open:true
  }
}
```

## webpack优化配置

### 性能优化

**开发环境性能优化：**

* 优化打包构建速度
	* HMR热模块替换
* 优化代码调试
	* source-map:提供源代码到构建后代码映射技术

**生产环境性能优化：**

* 优化打包构建速度
	* oneOf:文件只被处理一次，不进行多次匹配
	* babel缓存：优化打包速度
	* 多进程打包
	* externals让某些库不打包，通过cdn引入
	* dll让某些库只单独打包一次
* 优化代码运行的性能
	* 缓存(hash-chunkhash-contenthash)
	* tree shaking
	* code split
	* 懒加载/预加载
	* pwa离线可访问技术



#### HMR:hot module replacement热模块替换

作用：一个模块发生变化，只会重新打包这一个模块，而不是打包所有模块，极大提升构建速度。


```
  devServer:{
    contentBase:resolve(__dirname,'build'),
    compress:true,
    port:3000,
    open:true,
    //开启HMR功能
    hot:true
  }
```

* 样式文件：可以使用HMR功能，因为style-loader内部实现了。
* js文件：默认不能使用HMR功能
	* 解决方法：非入口js文件

```
if(module.hot){
  module.hot.accept('./print.js',function(){
    //do something
  })
}
```

* html文件：默认不能使用HMR功能，同时会导致问题：html文件不能使用热更新了。(由于html文件只有一个，所以不需要做hmr功能)
	* 解决方法：修改entry入口，将html文件引入

```
entry:['./src/index.js','./src/index.html'],

```

#### source-map:提供源代码到构建后代码映射技术（如果构建后代码出错了，通过映射可以追踪源代码错误）

```
module.exports = {
  devtool:'source-map' 
  //提示错误代码的准确信息；源代码错误位置
  //source-map:外部
  //inline-source-map:内联：只生成一个内联的source-map
  //eval-source-map:每一个文件都生成对应的source-map文件，都在eval函数中
  //cheap-module-source-map：外部,会将loader的source-map加入

  //错误代码错误原因，构建后代码的错误位置
  //hidden-source-map:外部

  //错误代码准确信息，无任何源代码
  //nosource-source-map:外部
  
  //错误代码位置精确到行
  //cheap-source-map:外部

  //内部和外部的区别：外部会单独生成文件，内联没有；内联构建速度更快
}
```

* 生产环境：源代码要不要隐藏(nosource>hidden)，调试要不要更友好(source>cheap-module)，由于内联的代码体积会变得很大，所以生产环境一般不会用内联的方案)
* 开发环境：速度快（eval>inline>cheap），调试更友好(source>cheap-module>cheap)

最优选择：eval-source-map


#### oneOf:优化生产环境配置

由于rules里的规则对每一个文件都会挨个匹配一遍，但是很多文件可能只需要用一个Loader匹配，这时候就可以使用oneOf,意思是只匹配一次。

#### 缓存

* babel缓存：让第二次打包构建速度更快

```
module.exports = {
  rules:[{
    test:/\.js$/,
    exclude:/node-modules/,
    loader:'babel-loader',
    options:{
      presets:[],

      //开启babel缓存。第二次构建时，会读取之前的缓存。
      cacheDirectory:true
    }
  }]
}
```

* 文件资源缓存：让代码上线运行缓存更好使用

	* hash:文件名+hash值，每次构建打包都会生成唯一的hash值。
	* chunkhash:根据chunk生成hash值，如果打包来源于同一个chunk,那么hash值就一样。
	* contenthashs:根据文件的内容生成hash值，不同的文件Hash值一定不一样。

	
* tree shaking:让代码体积更小，去掉无用代码
	* 前提：使用es6模块化；开启production
	* 副作用：可能会把css等文件干掉。解决方法：package.json中添加

```
'sideEffects':["*.css"]//值为false时意味着所有代码都没有副作用

```

#### 文件拆分code split

按需加载、并行加载提高速度

```
module.exports = {
  entry:{
    //多入口：有一个入口，最终输出就有一个Bundle
    main:'./src/js/index.js',
    test:'./src/js/test.js'
  },
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname,'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  mode:'production'
}

```

```
module.exports = {
  entry:{
    //多入口：有一个入口，最终输出就有一个Bundle
    main:'./src/js/index.js',
    test:'./src/js/test.js'
  },
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname,'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  //1.可以将node_modules中的代码单独打包一个chunk最终输出
  //2.自动分析多入口文件中，是否有公共文件，如果有，会单独打包一个chunk
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production'
}
```

通过js代码让某个文件被单独打包成一个chunk

import动态导入语法：能将某个文件单独打包

```
//注释用来给打包出来的文件命名
import(/*webpackChunkName:'test'*/'./index')
.then(res=>{
  console.log(res)
}).catch((err)=>{
  console.log(err)
})
```

```
module.exports = {
  entry:'./src/js/index.js',
  output:{
    filename:'js/[name].[contenthash:10].js',
    path:resolve(__dirname,'build')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template:'./src/index.html',
      minify:{
        collapseWhitespace:true,
        removeComments:true
      }
    })
  ],
  //1.可以将node_modules中的代码单独打包一个chunk最终输出
  //2.自动分析多入口文件中，是否有公共文件，如果有，会单独打包一个chunk
  optimization:{
    splitChunks:{
      chunks:'all'
    }
  },
  mode:'production'
}

```

#### 懒加载

比如按钮点击时，才开始加载对应的文件里的方法

```
import(/*webpackChunkName:'test' */'./index')
.then((add)=>{
  add(1,2)
}).catch((err)=>{
  console.log(err)
})

```

#### 预加载

会在使用前就加载完成文件。

正常加载可以认为是并行加载，同一时间加载多个文件，且没有先后顺序。

预加载是等其他资源加载完毕，浏览器空闲了，再偷偷加载资源。（兼容性较差）

```
import(/*webpackChunkName:'test',webpackPrefetch:true */'./index')
.then((add)=>{
  add(1,2)
}).catch((err)=>{
  console.log(err)
})

```

#### PWA渐进式网络开发应用程序（离线可访问）

使用workbox-webpack-plugin

```
  plugins:[
    new WorkboxWebpackPlugin.GenerationSW({
      /*
        1.帮助serviceworker快速启动
        2.删除旧的serviceworker
      */
     clientsClaim:true,
     skipWaiting:true
    })
  ],
  
```


js文件中，处理兼容性问题，注册service-worker

```
if('serviceWorker' in navigator){
  window.addEventListener('load',()=>{
    navigator.serviceWorker.register('/service-worker.js')
      .then(()=>{
        console.log('sw注册成功了')
      })
      .catch(()=>{
        console.log('注册失败')
      })
  })
}
```

#### 多进程打包

tread-loader开启多进程打包。

由于进程启动的时间开销和进程通信的开销，只有工作消耗时间长，才需要多进程打包。

#### externals

防止将某些包打包进去，比如有些包我们希望它使用cdn链接，就可以把这些包排除出去。

```
module.exports = {
  mode:'production',
  externals:{
    //拒绝Jquery被打包进来
    jquery:'Jquery'
  }
}
```

#### 动态打包库DLL

对一些三方库进行单独打包,以下文件命名为webpack.dll.js,用于将jquery进行单独打包，这样之后jquery就不需要重复打包，从而提升打包速度。

```
module.exports = {
  entry:{
    jquery:['Jquery']
  },
  output:{
    filename:'[name].js',
    path:resolve(__dirname,'dll'),
    library:'[name]_[hash]',//打包的库里向外暴露出去的内容叫什么名字
  },
  plugins:[
    new webpack.Dllplugin({
      name:'[name]_[hash]',//映射库的暴露的内容名称
      path:resolve(__dirname,'dll/mainfest.json'),//输出文件路径
    })
  ],
  mode:'production'
}
```

$webpack --config webpack.dll.js

运行上面的指令，单独打包jquery,然后在webpack.config.js文件中加入以下插件：

```
  plugins: [
    //高速webpack哪些库不需要参与打包，同时使用时名称也得变
    new webpack.DllReferencePlugin({
      mainfest: resolve(__dirname, 'dll/mainfest.json')
    }),
    //将某个文件打包输出去，并在html中自动引入该资源
    new AddAssetHtmlWebpackPlugin({
      filepath: resolve(__dirname, 'dll/jquery.js')
    })
  ]
```