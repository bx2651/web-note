## video 元素与 audio 元素

使用方法：

```
<audio src="http://wwww.audioURL.com/test.mp3">您的浏览器不支持 audio 标签</audio>
```

我们还可以通过 source 元素来为同一媒体数据指定多个播放格式与编码方式，以确保浏览器可以从中选择一种自己支持的播放格式进行播放，浏览器会从上往下判断自己对该播放格式是否支持，直到选择到自己支持的播放格式为止。

```

    <video>
        <source src = "source1" type = "video/ogg"> 
        <source src = "source2" type = "video/quicktime"> 
        <source src = "source3"> 
    </video>
    
```

source 元素的 src 属性表示播放媒体的url地址，type 表示媒体类型，其属性值时播放文件的 MIME 类型，是可选参数，但是最好不要省略，因为浏览器在从上往下选择时无法判断自己能不能播放而先行下载一小段音视频数据，这样可能会造成带宽和时间的浪费。

### video 和 audio 的属性

* src:指定媒体数据的url地址
* autoplat:指定媒体是否在页面加载后自动播放
* preload:是否预加载，该属性有三个默认值
	* none:不进行预加载
	* metadata:只预加载元数据（媒体字节数、第一帧、播放列表、持续时间）
	* auto:预加载全部视频或音频
* poster(video独有):当视频不可用时，可以使用该元素向用户展示一副替代用的图片，避免出现一片空白。
* loop:是否循环播放。
* controls:是否为视频或音频添加浏览器自带的播放用的控制条
* width 和 height:指定视频的宽高。
* error:出现错误时，error 属性将返回一个 MediaError 对象，该对象的 code 返回对应的错误状态。
* networkState:读取当前网络状态，相当于钩子函数。
* currentSrc:读取播放中的媒体数据的URL地址，为只读属性。
* buffered:
* readyState:返回当前播放位置的就绪状态。为只读属性。
* seeking 与 seekable:前者可返回浏览器是否正在请求某一特定播放位置的数据，后者返回一个 TimeRanges 对象，该对象表示请求到的数据的时间范围，只读属性。
* currentTime/startTime/duration:读取当前播放位置、播放开始时间、总得播放时间， currentTime为可读写属性，其余为只读属性。
* played/paused/ended:读取媒体文件的已播放部分的时间段、是否处于播放暂停状态、是否播放完毕，均为只读属性。
* defaulPlaybackRate/palybackRate:读取或修改默认的播放速率、读取或修改当前的播放速率
* volume和muted:读取或修改播放音量、读取或修改静音状态。


### 方法：
* play:播放媒体，自动将元素的paused属性值变为false。
* pause:暂停播放，自动将元素的paused属性变为true。
* load:重新载入媒体进行播放，自动将元素的playbackRate属性变为defaulPlaybackRate属性的值，自动将元素的 error 的值变为 null。
* canPlayType:测试浏览器是否支持指定的媒体类型，使用方法如下：

```
var support = videoElement.canPlayType(type)
```

videoElement表示页面上的 video 元素或 audio 元素，该方法使用一个参数 type ,可能返回三个值：

1. 空字符串：浏览器不支持此种媒体类型。
2. maybe:浏览器可能支持
3. probably:浏览器确定支持