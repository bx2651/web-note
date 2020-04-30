vue画一个应用商店的小卡片

1.简陋版：

```
<template>
  <div class="app-container">
    <!--基本信息-->
    <div class="info" v-for="item in appInfo">
      <div class="left">
        <img :src="item.imgSrc" alt />
      </div>
      <div class="right">
        <span class="title">{{item.appName}}</span>
        <span class="desc">{{item.appDesc}}</span>
        <button @click="download(item.downloadLink)">安装</button>
      </div>
    </div>
  </div>
  
</template>

<script>
import checkPermission from "@/utils/permission";
import initData from "@/mixins/initData"; 

export default {
  components: {},
  mixins: [initData],
  data() {
    return {
      urls: "api/statis/ev/getAdComplain", 
      appInfo: [
        {
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576131561062&di=25907b4dda2a00083001357856b7f979&imgtype=0&src=http%3A%2F%2Fimg.zcool.cn%2Fcommunity%2F0130eb5b286cf7a80121bbec0a909d.jpg",
          appName: "微信",
          appDesc: "我是描述我是描述我是描述我是描述",
          downloadLink: "https://weixin.qq.com/"
        },
        {
          imgSrc:
            "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1576728991&di=4e0b82dbe3aff5e87b6369e0cd408926&imgtype=jpg&er=1&src=http%3A%2F%2Fpic.51yuansu.com%2Fpic3%2Fcover%2F00%2F68%2F08%2F58ab1906bdc89_610.jpg",
          appName: "QQ",
          appDesc: "我是描述我是描述我是描述我是描述",
          downloadLink: "https://im.qq.com/"
        }
      ],
    };
  },
  mounted() {
    this.getData();
  },
  methods: {
    checkPermission,
    beforeInit() {
      this.url = this.urls;
      return true;
    },
    getData() {
      this.init().then(res => {
        for (let i = 0; i < res.data.list, length; i++) {
          this.appInfo.imgSrc[i] = res.data.list[i].imgSrc;
          this.appInfo.appName[i] = res.data.list[i].appName;
          this.appInfo.appDesc[i] = res.data.list[i].imgSrc;
          this.appInfo.downloadLink[i] = res.data.list[i].downloadLink;
        }
      });
      return true;
    },
    download(downloadLink) {
      window.open(downloadLink);
    }
  }
};
</script>

<style scoped>
.info {
  background-color: #fff;
  width: 22%;
  height: 100px;
  float: left;
  margin: 10px 10px;
  border: 1px #ddd solid;
  border-radius: 5px;
}

.left {
  float: left;
  display: inline-block;
  width: 30%;
  margin: 5px;
}
img {
  width: 100%;
  height: 100%;
}
.right {
  float: left;
  display: inline-block;
  width: 60%;
  margin: 8px 0;
  height: 90px;
  padding: 0;
  position: relative;
}
span {
  display: inline-block;
}
.title {
  font-weight: bolder;
}
.desc {
  font-size: 10px;
  line-height: 18px;
  color: #555;
}
button {
  /* float: right; */
  display: inline-block;
  box-sizing: border-box;
  border: transparent;
  border-radius: 3px;
  width: 60px;
  background-color: #2f5fa6;
  color: #fff;
  font-size: 12px;
  line-height: 14px;
  position: absolute;
  bottom: 5px;
  right: 5px;
}
</style>

```

![](../img/JSON1.jpeg)