```
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>Document</title>

</head>

<body>
  <style>
    button{
      background-color: burlywood;
      font-size: 30px;
    }
  </style>
  <div class="container">
    <button>我是返回按钮</button>
    
  </div>

  <script>
    window.onload = function(){
      let button = document.getElementsByTagName("button")[0]
      button.addEventListener('click',()=>{
        console.log(" 我是test")
        let ua = navigator.userAgent.toLowerCase();
        //android终端
        let isAndroid = ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1; //ios终端
        let isiOS = !!ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
        if (isWeixinBrowser()) {
          // this.ShowDark = !this.ShowDark;
          // this.$toast('我是微信');
        } else {
          if (/(iPhone|iPad|iPod|iOS|Mac)/i.test(navigator.userAgent)) {
            //ios
            console.log(" 我是ios")
            try { 
              window.webkit.messageHandlers.finishActivity.postMessage(""); 
            }catch(error) { 
                console.log('WKWebView post message');
              }
          } else if (/(Android)/i.test(navigator.userAgent)) {
            //android
            console.log("我是android")
            android.finishActivity();
            
          }
        }
        function isWeixinBrowser() {
          return (/micromessenger/.test(ua)) ? true : false;
        }
    }
  </script>
</body>

```