<template>
  <div class="container">
    <!-- <Loading_layers :v-show="flag"/> -->
    <div id="map-container"/>
    <template>
      <Tree @regionUpdate="regionUpdate"  @location="onLocation" :ids="left.id" :titles="left.title" :listObject = "listObject"
            @fromTree =fromTree  @showDetail =showDetail  @fromQuery="fromQuery" />
    </template>


    <Map-glallery @switchMap="changeBaseMap"></Map-glallery>

    <dialog-drag v-if="isShow"  id="dialog-1" @close="closeDlg"  left="400"  v-on:click="showDetail" ref="inputA" style="margin-top: 5%;margin-left:20%;" :title="popUpTitle">
      <!-- 一张图多选按钮弹窗，waterQualityMonitoringPopUp标签为水质监测站弹窗，p标签为其他弹窗 -->
      <p v-html="mesg"></p >
      <waterQualityMonitoringPopUp  :ground='ground' v-if="seen" />
    </dialog-drag>

    <div class="mask">
      <div class="title"><span>图层</span>&nbsp;&nbsp;&nbsp;&nbsp;|</div>
      <div class="tip" v-for="item in btns" :key="item.id"  @click="drawerOff(item)">
        <div>
          <el-button :type="item.type" :icon="item.icon" circle></el-button>
        </div>
        <div>
          <input type="checkbox" :name="item.name" :checked="checkList.indexOf(item.id)>=0"
                 @click="checkedOne(item.id,item.title)" >{{item.title}}
        </div>

      </div>
    </div>
    <el-drawer
      :modal-append-to-body='false'
      :title="title"
      :visible.sync="drawer"
      :modal=false>
      <Census :listData='listData' :num='num'></Census>
    </el-drawer>
    <!--  -->

  </div>
</template>

<script>
  import Census from '@/views/map/delux/census'

  import {loadModules, loadCss} from 'esri-loader'
  import DialogDrag from 'vue-dialog-drag'
  import {getObj as getObjLake} from '@/api/infoManageRiverInfoLakes'
  import {getObj as getObjRiver} from '@/api/attRvBase'
  import {getObj as getObjReservoir} from '@/api/attResBase'
  import {getObj as getObjAdministrative} from '@/api/attAdBase'
  import Base from '../base'
  import Tree from '../Tree'
  import LayerButtons from './LayerButtons'
  import MapGlallery from '../base/widget/MapGlallery'
  import MapLayer from '@/components/Map/Layer'
  import Avatar from '@/assets/map/widget/location.png'
  import WaterIntake from '@/assets/map/widget/waterIntake.svg'
  import even from '@/assets/map/widget/sjfsd.png'
  import vodie from '@/assets/map/widget/VideoDetectionStation.svg'
  import water from '@/assets/map/widget/WaterQualityMonitoringStation.svg'
  import Hydrological_Station from '@/assets/map/widget/sw.png'
  import Barrage from '@/assets/map/widget/Barrage.png'
  import Pumpingstation from '@/assets/map/widget/Pumpingstation.png'
  import sluice from '@/assets/map/widget/sluice.png'
  import Rainfall_Station from '@/assets/map/widget/rainfall_station.svg'
  import Sewage_outlet from '@/assets/map/widget/Sewage_outlet.png'
  import RiverPatrol from '@/assets/map/widget/riverPatrol.svg'
  import Sprcial_action from '@/assets/map/widget/Sprcial_action.png'
  import Reservoir from '@/assets/map/widget/Reservoir.svg'
  import Sand_stone from '@/assets/map/widget/Sand_stone.png'

  // import Loading_layers from './MapLayer'
  import GeoUtil from '../base/util/GeoUtil'
  import Cookies from 'js-cookie'
  import MsgUtil from './MsgUtil'
  import waterQualityMonitoringPopUp from "./WaterQualityMonitoringStation";
  import {lonlatData} from "@/api/waterPinCommon";
  import {initDataByPost} from '@/api/data'
  const THRESHHODE = 3000
  // import initData from '@/mixins/initDataArbitrary';
  import createPointLayer from '../base/index'

  let code = null;


  let TREE_RIVER = 1;
  let TREE_LAKE = 2;
  let TREE_RESERVOIR = 3;

  function createFillSymbol(value, color) {//这个是什么？
    return {
      value: value,
      symbol: {
        color: color,
        type: "simple-fill",
        style: "solid",
        outline: {
          style: "none"
        }
      },
      label: value,


    };
  }

  var openSpacesRenderer = {//这个是什么？
    type: "unique-value",
    field: "CODE",
    uniqueValueInfos: [
      createFillSymbol(code, "#9E559C"),
    ]
  };


  export default {
    name: 'Map',
    extends: Base,
    mixins: [],
    components: {
      Tree,
      MapGlallery,//这是什么？
      DialogDrag,
      waterQualityMonitoringPopUp,
      Census//这是什么？
    },
    data() {
      return {
        Field:"",
        FieldValue:"",
        engScal:"1",
        adGrad: "1",
        evState:"2",
        waterType:"Ⅰ",
        tourState:"1",
        waterType: "Ⅲ",
        // quesRect: "×",
        quesRect: 0,

        frgrd: "1",
        flag:true,
        pageSize:200,
        graphicLayer2:{},
        checkId:'',
        popUpTitle:'弹窗详情',
        GraphicLayer:{},
        Poly:"",
        style:'',
        ground:[],
        LayerList:{},
        seen:false,
        mesg: '',
        ID: '',
        LandData: [],
        message: '',
        linst: [],
        mass: '',
        ischecked: false,
        checkList: [],
        btns: LayerButtons,
        city: '南宁市',
        Point: undefined,
        checkedList: [],
        isShow: false,
        ListLine:[],
        PointType:"Point",
        LineType:"PolyLine",
        PolyType:"Polyfill",
        graphicLayer:{},

        datumReservoir: [], pointsReservoir: [],      //水库
        datumRiver: [], pointsRiver: [],              // 河流
        datumLake: [], pointsLake: [],                //湖泊
        datumDrainOutlet: [], pointsDrainOutlet: [],  // 排污口

        datumSandMiningPoint: [], pointsSandMiningPoint: [], //采砂点
        datumWaterQualityMonitoringStation: [],
        pointsWaterQualityMonitoringStation: [], //水质监测站
        datumRainfallStation: [], pointsRainfallStation: [], //雨量站
        datumVideoDetectionStation: [], pointsVideoDetectionStation: [], //视频检测站
        datumWaterIntake: [], pointsWaterIntake: [], //取水口

        datumOccurrence: [], pointsOccurrence: [],    //事件发生点
        datumRiverPatrol: [], pointsRiverPatrol: [], // 巡河
        datumSpecialAction: [], pointsSpecialAction: [], //专项行动
        datumHydrometricStation: [], pointsHydrometricStation: [], // 水文站


        PumpingStation:[],pointsPumpingStation:[],//泵站
        sluice:[],        pointssluice:[],//水闸
        Barrage:[],       pointsBarrage:[],//拦河坝

        drawer:false,
        title:'',
        listData:[],
        num:0,
        url:'',
        left:{id:'',title:''}, // 左侧相关列表
        listObject:[]
      }
    },
    created() {
    },
    mounted() {
      this.loadFeatureLayer()//加载地图
      this.DrawFeater();//???
    },
    methods: {
      drawerOff(item){ //点击按钮获取各个行政区域点的数量,右侧抽屉的数据
        this.title=item.title
        this.drawer=true
        let id=item.id
        // console.log('id',id)
        if(id=='2'){
          this.url='/api/main/map/getRerCountByAd'
        }
        if(id=='3'){
          this.url='/api/main/map/getReaCountByAd'
        }
        if(id=='4'){
          this.url='/api/main/map/getLksCountByAd'
        }
        if(id=='5'){
          this.url='/api/service/pdo/getCount'
        }
        if(id=='6'){
          this.url='/api/sand/base/getCount'
        }
        if(id=='7'){
          this.url='/api/info/getCount'
        }
        if(id=='8'){
          this.url='/api/info/st/getCount'
        }
        if(id=='9'){
          this.url='/api/info/monit/getCount'
        }
        if(id=='10'){
          this.url='/api/service/wain/getCount'
        }
        if(id=='11'){
          this.url='/api/main/map/getEvCountByAd'
        }
        if(id=='12'){
          this.url='/api/main/map/getGmTourCountByAd'
        }
        if(id=='13'){
          this.url='/api/statis/spe/getCount'
        }
        if(id=='14'){
          this.url='/api/info/st/getCountHy'
        }
        if(id=='16'){
          this.url='/api/info/gate/getCount'
        }
        if(id=='15'){
          this.url='/api/service/resbud/getCount'
          this.listData=[]
          this.$axios.post(this.url,{
            'type':'泵站'
          }).then(res=>{
            // console.log('1236',res.data.data)
            this.listData=res.data.data
            this.num=0
            this.listData.forEach(item => {
              this.num+= Number(item.value)
            });
          })
          return
        }
        if(id=='17'){
          this.url='/api/service/resbud/getCount'
          this.listData=[]
          this.$axios.post(this.url,{
            'type':'拦河闸'
          }).then(res=>{
            this.listData=res.data.data
            this.num=0
            this.listData.forEach(item => {
              this.num+= Number(item.value)
            });
          })
          return
        }
        this.$axios.get(this.url).then(res=>{
          this.listData=res.data.data
          this.num=0
          this.listData.forEach(item => {
            this.num+= Number(item.value)
          });
        })
      },
      getOp(url,params){
        let id = 450000000000
        this.$axios({
          url:url,
          params:params,
          method:"get"
        }).then(res=>{
          this.Event = res.data.data.list
        })
      },
      getBaseLayer() {
        return [this.vecLayer];
      },
      getNum() {//获取被点击的图层？
        this.checkedList.splice(0);
        for (var k in this.checkList) {
          for (let i = 0; i < this.btns.length; i++) {
//            console.log("00",this.btns)
            if (this.checkList[k] == this.btns[i].id) {
              this.checkedList.push(this.btns[i])
            }
          }
        }
      },
      checkedOne(id,title) {//被选中的多选框
        this.GraphicLayer.removeAll();//移除所有的图层
        let pageNum = 1
        this.checkId= id;
        this.ID = id;
        let idIndex = this.checkList.indexOf(id)
        if (idIndex >= 0) {
          // 如果已经包含了该id, 则去除(单选按钮由选中变为非选中状态)
          this.checkList.splice(idIndex, 1)
          this.removeEntities(id);
        } else {
          // 选中该checkbox
          this.checkList.push(id)
          this.left.id = id;
          this.left.title = title;
          loadModules(
            [
              "esri/layers/GraphicsLayer",
            ])
            .then(([GraphicsLayer]) => {
              this.graphicLayer2 = new GraphicsLayer();
              this.graphicLayer2.id = "layer_point"+id
              this.drawOneCategory(id,pageNum,this.graphicLayer2);
            })
        }
        this.getNum();
      },

      checkAll() {
        this.ischecked = !this.ischecked

        if (this.ischecked) {
          // 全选时
          this.checkList.splice(0);
          for (var k in this.btns) {
            this.checkList.push(this.btns[k].id)
          }
        } else {
          this.checkList = []
        }
        this.getNum()
      },

      redrawMap(index) {
        const self = this;
        loadModules(
          [
            'esri/config',
            'esri/layers/FeatureLayer',
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/Polyline",
            'esri/geometry/Point',
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol",
            "esri/Color"
          ])
          .then(([esriConfig, FeatureLayer, GraphicsLayer, Graphic, Polygon, Polyline, Point, SimpleLineSymbol, SimpleFillSymbol, Color]) => {
            for (let i = 0; i < this.btns.length; i++) {
              if (index== this.btns[i].id) {
                var layers = this.btns[i].layers
                for (var j = 0; j < layers.length; j++) {
                  const url = "http://39.108.191.51:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/" + layers[j];
                  const featureLayer = new FeatureLayer({url: url,
                    id:"Rivers"
                  })
                  //将客户端图层添加到地图中
                  self.map.add(featureLayer);
                }
              }
            }
          })
          .catch(err => {
            // handle any errors
            console.error(err);
          });

      },
      //Guijiang
      addGuijiangLayer() {
        const self = this;
        loadModules(
          [
            'esri/config',
            'esri/layers/FeatureLayer',
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/Polyline",
            'esri/geometry/Point',
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol",
            "esri/Color"
          ])
          .then(([esriConfig, FeatureLayer, GraphicsLayer, Graphic, Polygon, Polyline, Point, SimpleLineSymbol, SimpleFillSymbol, Color]) => {
            for (var i = 51; i < 57; i++) {
              const url = "http://7colorsworld.com:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/" + i;
              const featureLayer = new FeatureLayer({url: url})
              //将客户端图层添加到地图中
              self.map.add(featureLayer);
            }
          })
          .catch(err => {
            // handle any errors
            console.error(err);
          });
      },
      Drawlayer(index){

      },
      DrawFeater(){
        loadModules(
          [
            "esri/layers/GraphicsLayer",
          ])
          .then(([GraphicsLayer]) => {
            this.GraphicLayer = new GraphicsLayer();
            // console.log("this.GraphicLayer;",this.GraphicLayer)
          })
      },

      drawFocus(type,array,res) {//焦点位置
        let self = this;
        loadModules(
          [
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/Polyline",
            'esri/geometry/Point',
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/SimpleMarkerSymbol",
            "esri/symbols/TextSymbol",
            "esri/symbols/Font",
            "esri/Color"
          ])
          .then(([GraphicsLayer, Graphic, Polygon, Polyline, Point, SimpleLineSymbol, SimpleFillSymbol,SimpleMarkerSymbol,TextSymbol,Font, Color]) => {
            self.GraphicLayer.removeAll();
            if (type == 1){
              let polyLine = new Polyline(array);
              let  lastPoint =null;
              let firstPoint =null;
              if(res.data.data.list[0].id == '1680bb6b2368498ab86ce4c21b9443c6'){
                lastPoint = new Point(polyLine.paths[0].pop())
                firstPoint = new Point([polyLine.paths[polyLine.paths.length-1][0][0]+0.1])
              }else{
                lastPoint = new Point(polyLine.paths[polyLine.paths.length-1].pop())
                firstPoint = new Point(polyLine.paths[0][0])
              }
              var firsttextsymbol = new TextSymbol("起点");
              firsttextsymbol.color=[255,0,0]
              firsttextsymbol.font.size=11
              firsttextsymbol.xoffset=10
              firsttextsymbol.yoffset=10
              var lasttextsymbol = new TextSymbol("终点");
              lasttextsymbol.color=[255,0,0]
              lasttextsymbol.xoffset=10
              lasttextsymbol.yoffset=10
              lasttextsymbol.font.size=11
             let markerSymbol = {
                type: "simple-marker",
                color: [205,38,38],
                outline: {
                  color: [255, 255, 255],
                  width: 2
                },

              };
              //定义线符号 STYLE_SOLID STYLE_DASH
              var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([205,38,38]), 3);
              var graphic = new Graphic(polyLine, lineSymbol);
              var graphicFristpoint = new Graphic(firstPoint, markerSymbol);
              var graphicLastpoint = new Graphic(lastPoint, markerSymbol);
              var graphicFristpointText = new Graphic(firstPoint,firsttextsymbol);
              var graphicLastpointText = new Graphic(lastPoint,lasttextsymbol);
              graphic.id = 'layer_river';
              self.GraphicLayer.add(graphicFristpoint);
              self.GraphicLayer.add(graphicLastpoint);
              self.GraphicLayer.add(graphic);
              self.GraphicLayer.add(graphicFristpointText);
              self.GraphicLayer.add(graphicLastpointText);
              let longitude= polyLine.extent.center.longitude
              let latitude= polyLine.extent.center.latitude
              self.MapTo(longitude,latitude,null,null,9)
            }
            else{
              var geometry = new Polygon({
                "rings": array,
                "spatialReference": self.map.spatialReference
              });
              //定义线符号
              //   var lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_DASH, new Color([137, 207, 240]), 3);              //定义面符号
              //   var fill = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol, new Color([137, 207, 240]),3);
              var fill = {
                type: "simple-fill",  // autocasts as new SimpleFillSymbol()
                color: [205,38,38,0.3],
                outline: {  // autocasts as new SimpleLineSymbol()
                  color: [205,38,38],
                  width: "3px"
                }
              };
              var graphic = new Graphic(geometry, fill);
              graphic.id = 'layer_river';
              self.GraphicLayer.add(graphic);
              let longitude= geometry.extent.center.longitude
              let latitude= geometry.extent.center.latitude
              self.MapTo(longitude,latitude,null,null,9)
            }
            //将客户端图层添加到地图中
            self.map.add(self.GraphicLayer);
          })
          .catch(err => {
            // handle any errors
            console.error(err);
          });
      },
      regionUpdate(type, array,res) {
        this.drawFocus(type, array,res);
      },
      showDetailByPos(pos) {
        const content = `Longitude: ${pos.longitude} Latitude: ${pos.latitude}`;
        const h = this.$createElement;
        this.$notify({
          title: '当前选择',
          message: h('i', {style: 'color: teal'}, content)
        });
      },
      locateRegion(id) {
        code = id.slice(0, 6);
        loadModules(
          [
            'esri/Map',
            'esri/layers/FeatureLayer'
          ],
          {version: '4.7'}
        )
          .then(([Map, FeatureLayer]) => {
            const url = "http://7colorsworld.com:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/" + MapLayer.COUNTY_LEVEL_POLITICAL_DISTRICT;
            const featureLayer = new FeatureLayer({
              url: url,
              renderer: openSpacesRenderer,
              opacity: 0.20
            });

          })
          .catch(err => {
            // handle any errors
            console.error(err);
          });
      },
      queryFeature(id) {
        id = id.slice(0, 6);
        loadModules(
          [
            "esri/tasks/QueryTask", "esri/tasks/support/Query"
          ])
          .then(([QueryTask, Query]) => {
            const citiesLayerUrl = "http://7colorsworld.com:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/" + MapLayer.COUNTY_LEVEL_POLITICAL_DISTRICT;

            var queryTask = new QueryTask({
              url: citiesLayerUrl
            });
            var query = new Query();
            query.returnGeometry = true;
            query.outFields = ["*"];
            query.where = "CODE LIKE '%" + id + "%'";  // Return all cities with a population greater than 1 million

            // When resolved, returns features and graphics that satisfy the query.
            queryTask.execute(query).then(function (results) {
              // console.log(results.features);
            });
            // When resolved, returns a count of the features that satisfy the query.
            queryTask.executeForCount(query).then(function (results) {
              // console.log(results);
            });
          }).catch(err => {
          // handle any errors
          console.error(err);
        });
      },
      // regionDetail(id, type) {
      //   const self = this;
      //   if (type == TREE_RIVER) {
      //     getObjRiver(id).then(res => {
      //       self.notifyRegionDetail(id, type, res.data.reaName)
      //     })
      //   } else if (type == TREE_LAKE) {
      //     getObjLake(id).then(res => {
      //       self.notifyRegionDetail(id, type, res.data.lksName)
      //     })
      //   } else if (type == TREE_RESERVOIR) {
      //     getObjReservoir(id).then(res => {
      //       self.notifyRegionDetail(id, type, res.data.rerName)
      //     })
      //   }

      // },
      // notifyRegionDetail(id, type, content) {
      //   const h = this.$createElement;
      //   this.$notify({
      //     title: 'type =' + type + '; ID =' + id,
      //     message: h('i', {style: 'color: teal'}, content)
      //   });
      // },
      // regionDetail(id, type) {
      //   const self = this
      //   if (type == TREE_RIVER) {
      //     getObjRiver(id).then(res => {
      //       if (res.data.reaLevel === null) {
      //         res.data.reaLevel = "暂无"
      //       }
      //       if (res.data.startLoc === null) {
      //         res.data.startLoc = "暂无"
      //       }
      //       self.notifyRegionDetail(id, "河段", res.data.reaName, res.data.reaLevel, res.data.startLoc)
      //       if (id == "450000000005") // 桂江

      //         this.addGuijiangLayer();
      //     })
      //   } else if (type == TREE_LAKE) {
      //     getObjLake(id).then(res => {

      //       if (res.data.lksLevel === null) {
      //         res.data.lksLevel = "暂无"
      //       }
      //       if (res.data.startLoc === null) {
      //         res.data.startLoc = "暂无"
      //       }
      //       self.notifyRegionDetail(id, "湖泊", res.data.lksName, res.data.lksLevel, res.data.startLoc)
      //     })
      //   } else if (type == TREE_RESERVOIR) {
      //     getObjReservoir(id).then(res => {

      //       if (res.data.rerLevel === null) {
      //         res.data.rerLevel = "暂无"
      //       }
      //       if (res.data.startLoc === null) {
      //         res.data.startLoc = "暂无"
      //       }
      //       self.notifyRegionDetail(id, "水库", res.data.rerName, res.data.rerLevel, res.data.startLoc)
      //     })
      //   } else {
      //     getObjAdministrative(id).then(res => {
      //       console.log("this is map",res.data)

      //       elf.notifyRegionDetail(id, "行政区", res.data.adName, "暂无", "暂无")
      //       self.locateRegion(id)
      //     })
      //   }
      // },
      //togo
      // notifyRegionDetail(id, type, content, reaLevel, reaDesc) {
      //   content = type + "名称为：" + content;
      //   const h = this.$createElement;
      //   this.$notify({
      //     title: 'ID:' + id,  // 'type =' + type + '
      //     message: h('i', {style: {top: '180px'}}, content + "，" + type + "等级为:" + reaLevel + "，" + type + "位置为：" + reaDesc)
      //   });
      // },
      onLocation({loc}) {
        if (loc) {
          this.map.goTo(loc)
        }
      },
      changeBaseMap: function (mapType) {
        if (mapType == "image")
          this.map.basemap.baseLayers.items = [this.imgLayer, this.ciaLayer]
        else
          this.map.basemap.baseLayers.items = [this.vecLayer]
        // this.map.basemap.baseLayers.items.removeAll()
        // this.map.basemap.baseLayers.items.add(this.imgLayer)
        // this.map.getBasemap
      },
      closeDlg() {
        this.isShow = false;
        this.seen = false;
        this.mesg = "";
        this.ground = ""
      },
      drawOneCategory(index,pageNum,graphicLayer) {
        let self =this;
        switch (index) {
          //水库
          case MsgUtil.RESERVOIR: {
            const url = 'api/info/rer/getRerMap'
            const params = {pageNum:0 ,pageSize:0,engScal:self.engScal}
            this.drawEntities(index, url, this.datumReservoir, this.pointsReservoir,this.PointType,Reservoir,pageNum,graphicLayer,params)
            break;
          }
          //河流
          case MsgUtil.RIVER : {
            this.redrawMap(MsgUtil.RIVER)
            const url = '/api/info/rea/getReaMap'
            const params = {pageNum:0 ,pageSize:0,engScal:self.engScal}
            this.drawEntities(index, url, this.datumReservoir, this.pointsReservoir,this.LineType,null,pageNum,graphicLayer,params)
            break;
          }
          //湖泊
          case MsgUtil.LAKES : {
            const url = 'api/info/lks/getLksMap'
            const params = {pageNum:0 ,pageSize:0,engScal:self.engScal}
            this.drawEntities(index, url, this.datumLake, this.pointsLake,this.PolyType,null,pageNum,graphicLayer)
            break;
          }
          //排污口
          case MsgUtil.DRAIN_OUTLET : {
            const url = 'api/service/pdo/get'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index,url,this.datumDrainOutlet, this.pointsDrainOutlet,this.PointType,Sewage_outlet,pageNum,graphicLayer,params)
            break;
          }
          //采砂点
          case MsgUtil.SAND_MINING_POINT : {
            const url = 'api/sand/base/get'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.datumSandMiningPoint,this.pointsSandMiningPoint,this.PointType,params)
            break;
          }
          //水质监测
          case MsgUtil.WATER_QUALITY_MONITORING_STATION : {
            const  url = '/api/info/get'
            const params = {pageNum:0 ,pageSize:0,waterType: this.waterType}
            this.drawEntities(index, url, this.datumWaterQualityMonitoringStation,this.pointsWaterQualityMonitoringStation,this.PointType,water,pageNum,graphicLayer,params)
            break;
          }
          //雨量站
          case MsgUtil.RAINFALL_STATION : {
            const url = 'api/info/st/rainFall'
            const params = {pageNum:0 ,pageSize:0,frgrd:this.frgrd}
            this.drawEntities(index, url, this.datumRainfallStation,this.pointsRainfallStation,this.PointType,Rainfall_Station,pageNum,graphicLayer,params)
            break;
          }
          //视频监测站
          case MsgUtil.VIDEO_DETECTION_STATION : {
            const url = 'api/info/monit/getPage'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.datumVideoDetectionStation,this.pointsVideoDetectionStation,this.PointType,vodie,pageNum,graphicLayer,params)
            break;
          }
          //取水口
          case MsgUtil.WATER_INTAKE : {
            const url = 'api/service/wain/get'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.datumWaterIntake,this.pointsWaterIntake,this.PointType,WaterIntake,pageNum,graphicLayer,params)
            break;
          }
          //事件发生点
          case MsgUtil.OCCURRENCE : {
            this.$axios({
              url: "/api/ev/base/getPageAllInfo",
              method: "post",
              data: {
                // adCode: this.$adCode(),
                pageNum:pageNum,
                evState:this.evState,
                pageSize: this.pageSize
              }
            }).then(res => {
              let Rencelist =res.data.data.list;
              this.listObject = res.data.data.list;
              this.DrawEven(index,Rencelist,this.datumOccurrence,this.pointsOccurrence,even,graphicLayer);
            });
            break;
          }
          //巡河
          case MsgUtil.RIVER_PATROL : {
            let self = this
            this.$axios({
              url: this.$apiUrl.map.riverTouring,
              params: {
                adCode: this.$adCode(),
                pageNum:pageNum,
                tourState:this.tourState,
                pageSize: this.pageSize
              }
            }).then(res => {
              let Rivelist = res.data.data.list;
              this.listObject = res.data.data.list;
              this.DrawEven(index,Rivelist,this.datumRiverPatrol,this.pointsRiverPatrol,RiverPatrol,graphicLayer)
            });
            break;
          }
          //专项行动
          case MsgUtil.SPECIAL_ACTION : {
            const url = 'api/statis/action/get'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.datumSpecialAction,this.pointsSpecialAction,this.PointType,Sprcial_action,pageNum,graphicLayer,params)
            break;
          }
          //水文站
          case MsgUtil.HYDROMETRIC_STATION : {
            console.log("00")
            const url = 'api/info/st/hydrology'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.datumHydrometricStation,this.pointsHydrometricStation,this.PointType,Hydrological_Station,pageNum,graphicLayer,params)
            break;
          }
          //泵站
          case MsgUtil.PUMPINGSTATION : {
            const url = 'api/service/resbud/get'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.PumpingStation,this.pointsPumpingStation,this.PointType,Barrage,pageNum,graphicLayer,params)
            break;
          }
          //水闸
          case MsgUtil.SLUICE : {
            const url = 'api/info/gate/get'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.sluice,this.pointssluice,this.PointType,Pumpingstation,pageNum,graphicLayer,params)
            break;
          }
          //拦河坝
          case MsgUtil.BARRAGE : {
            const url = 'api/service/resbud/get'
            const params = {pageNum:0 ,pageSize:0,adGrad:this.adGrad}
            this.drawEntities(index, url, this.Barrage,this.pointsBarrage,this.PointType,sluice,pageNum,graphicLayer,params)
            break;
          }
          default: {
            break;
          }
        }
      },
      removeEntities(index) {
        var fLayer=this.map.findLayerById("layer_point"+index);
        let layers = this.map.layers;
        var Id = "layer_point"+index
        for (let i = 0; i < layers.length; i++) {
          let layer3 = layers.getItemAt(i);
          if(layer3.id == "Rivers" && layer3 != null || layer3.id == Id){
            layer3.visible = false;
          }
        }
        // if (fLayer!=null)
        // {
        //   alert("layer_point"+index)
        //   this.map.remove(fLayer)
        //   var fLayer2=this.map.findLayerById("layer_point"+index);
        //   console.log(fLayer2)
        //   // this.map.layers.removeItem()
        //   // fLayer.removeAll()
        //   fLayer = null;
        //   console.log(fLayer)
        // }
        // let ID = "layer_point"+index
        // let layers = this.map.layers;
        // console.log("layers",layers)
        // for (let i = 0; i < layers.length; i++) {
        //   let layer3 = layers.getItemAt(i);
        //   if(layer3.id == "Rivers" && layer3 != null ||  layer3 == ID){
        //     layer3.visible = false;
        //   }
        // }
        //
      },

      drawEntities(index, url, listObjects, listPoints,type,style,pageNum,graphicLayer,params) {
        let self = this
        loadModules(
          [
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/Polyline",
            'esri/geometry/Point',
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/PictureMarkerSymbol",
            "esri/Color",
            'esri/widgets/Popup',
          ])
          .then(([GraphicsLayer, Graphic, Polygon, Polyline, Point, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Color, Popup]) => {
            initDataByPost(url,params).then((res) => {
              try{
              listObjects = res.data.list;

              this.listObject = res.data.list
              this.style = style;
              //self.graphicLayer = new GraphicsLayer();
              switch (type){
                case this.PointType: {
                  // if(res.data.list.length >= 50)
                  //   res.data.list.length =50;
                  // console.log(res.data.list.length)
                  for (let i = 0; i < res.data.list.length; i++) {
                    let item = res.data.list[i];
                    let lon = null;
                    let lat = null;
                    switch (index) {
                      case MsgUtil.RESERVOIR: {
                        lon = item.startLong;
                        lat = item.startLat;
                        this.datumReservoir.push(item)
                        break;
                      }
                      case MsgUtil.RIVER : {
                        lon = item.rvSourLong;
                        lat = item.rvSourLat;
                        break;
                      }
                      case MsgUtil.LAKES : {
                        lon = item.startLong;
                        lat = item.startLat;
                        this.datumDrainOutlet.push(item)
                        break;
                      }
                      case MsgUtil.DRAIN_OUTLET : {
                        if(item.pdoLong < item.pdoLat){
                          lon = item.pdoLat;
                          lat = item.pdoLong;
                        }else{
                          lon = item.pdoLong;
                          lat = item.pdoLat;
                        }
                        this.datumDrainOutlet.push(item)
                        break;
                      }
                      case MsgUtil.SAND_MINING_POINT : {
                        lon = item.sangLong;
                        lat = item.sandLat;
                        this.style = Sand_stone;
                        this.datumSandMiningPoint.push(item)
                        break;
                      }
                      case MsgUtil.WATER_QUALITY_MONITORING_STATION : {
                        lon = item.lang;
                        lat = item.lat;
                        this.datumWaterQualityMonitoringStation.push(item)
                        break;
                      }
                      case MsgUtil.RAINFALL_STATION : {
                        lon = item.lgtd;
                        lat = item.lttd;

                        this.datumRainfallStation.push(item)
                        break;
                      }
                      case MsgUtil.VIDEO_DETECTION_STATION : {
                        lon = item.lon;
                        lat = item.lat;

                        this.datumVideoDetectionStation.push(item)
                        break;
                      }
                      case MsgUtil.WATER_INTAKE : {
                        lon = item.wainLong;
                        lat = item.wainLat;
                        this.datumWaterIntake.push(item)
                        break;
                      }
                      case MsgUtil.OCCURRENCE : {
                        lon = item.sandLoc;
                        lat = item.sandLat;
                        this.datumDrainOutlet.push(item)
                        break;
                      }
                      case MsgUtil.RIVER_PATROL : {
                        lon = item.tourLong;
                        lat = item.tourLat;
                        this.datumDrainOutlet.push(item)
                        break;
                      }
                      case MsgUtil.SPECIAL_ACTION : {
                        lon = item.longTude;
                        lat = item.latTude;
                        this.datumSpecialAction.push(item)
                        break;
                      }
                      case MsgUtil.HYDROMETRIC_STATION : {
                        lon = item.lgtd;
                        lat = item.lttd;
                        // this.style = Hydrological_Station
                        this.datumHydrometricStation.push(item)
                        break;
                      }
                      case MsgUtil.PUMPINGSTATION : {
                        lon = item.resLong;
                        lat = item.resLat;
                        this.PumpingStation.push(item)
                        break;
                      }
                      case MsgUtil.SLUICE : {
                        lon = item.lgtd;
                        lat = item.lttd;
                        // this.style =sluice
                        this.sluice.push(item)
                        break;
                      }
                      case MsgUtil.BARRAGE : {
                        lon = item.resLong;
                        lat = item.resLat;
                        // this.style =Barrage
                        this.Barrage.push(item)
                        break;
                      }
                      default: {
                        break;
                      }
                    }
                    if(lon != null && lat != null){
                      let sybls = new PictureMarkerSymbol(this.style, 20, 20);
                      let point = new Point({
                        longitude: lon,
                        latitude: lat
                      })
                      let graphic = new Graphic(point, sybls);
                      graphic.id = "point_"+index
                      graphicLayer.add(graphic);
                      // console.log("graphicLayer",graphicLayer)
                      var pt = {x: lon, y: lat}
                      // listObjects.push(item)
                      listPoints.push(pt)
                    }else{
                      console.log("请更新坐标")
                    }
                  }
                  break
                }
                // case this.LineType: {
                //   let self = this
                //   var array = new Array();
                //   //this.map.removeAll()
                //   for (let i = 0; i < res.data.list.length; i++) {
                //     let item = res.data.list[i];
                //      // array.push([item.rvSourLong,item.rvSourLat],[item.rvMouLong,item.rvMouLat])
                //     array.push([104.44981,24.647364],[104.45029,24.647316])
                //   }
                //   if(array != null && array != undefined){
                //     self.ListLine.push(array)
                //     let polyLine = new Polyline(self.ListLine);
                //     let lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([30, 144, 255]), 3);
                //     self.graphicLayer.id = 'layer_Poly';
                //     let graphic = new Graphic(polyLine, lineSymbol);
                //     graphic.id = "point_"+index
                //     self.graphicLayer.add(graphic);
                //     listPoints.push(polyLine)
                //   }else{
                //     console.log("更新坐标")
                //   }
                //   break
                // }
                case this.PolyType: {
                  var array = new Array();
                  for (let i = 0; i < res.data.list.length; i++) {
                    let item = res.data.list[i];
                    array.push([item.startLong,item.startLat],[item.endLong,item.endLat])
                  }
                  if(array != null && array != undefined){
                    self.ListLine.push(array)
                    var PolyFill = new Polygon(self.ListLine);
                    let lineSymbol = new SimpleLineSymbol(SimpleLineSymbol.STYLE_SOLID, new Color([30, 144, 255]), 3);
                    var fillPolygon = SimpleFillSymbol(SimpleFillSymbol.STYLE_SOLID, lineSymbol, new Color([30,144,255]));
                    let graphic = new Graphic(PolyFill, fillPolygon)
                    graphic.id = "point_"+index
                    graphicLayer.add(graphic);
                    listPoints.push(self.ListLine)
                  }else{
                    console.log("更新坐标")
                  }
                }
                  break
              }
                self.map.add(graphicLayer);
              }catch (e) {
                return
              }

            })
          })
      },

      DrawEven(index,item,listObjects, listPoints,style,graphicLayer){
        let self = this
        loadModules(
          [
            "esri/layers/GraphicsLayer",
            "esri/Graphic",
            "esri/geometry/Polygon",
            "esri/geometry/Polyline",
            'esri/geometry/Point',
            "esri/symbols/SimpleLineSymbol",
            "esri/symbols/SimpleFillSymbol",
            "esri/symbols/PictureMarkerSymbol",
            "esri/Color",
            'esri/widgets/Popup',
          ])
          .then(([GraphicsLayer, Graphic, Polygon, Polyline, Point, SimpleLineSymbol, SimpleFillSymbol, PictureMarkerSymbol, Color, Popup]) => {
            graphicLayer.id = 'layer_point'+index
            let lon = null;
            let lat = null;
            this.style = style;
            for (let i = 0; i < item.length; i++) {
              switch (index) {
                case MsgUtil.RIVER_PATROL : {
                  lon = item[i].tourLong;
                  lat = item[i].tourLat;
                  this.datumRiverPatrol.push(item[i])
                  break;
                }
                case MsgUtil.OCCURRENCE : {
                  lon = item[i].evLong;
                  lat = item[i].evLat;
                  this.datumOccurrence.push(item[i])
                  break;
                }
              }
              let sybls = new PictureMarkerSymbol(this.style, 20, 20);
              let point = new Point({
                longitude: lon,
                latitude: lat
              })
              let graphic = new Graphic(point, sybls);
              graphicLayer.add(graphic);
              var pt = {x: lon, y: lat}
              listPoints.push(pt)
            }
            self.map.add(graphicLayer);
          })
      },
      pouple(pos, view) {
        loadModules(
          [
            'esri/widgets/Popup',
          ])
          .then(([Popup]) => {
            const groundObjectInfo = this.getNearestStationObject(pos);
            let lon = pos.longitude
            let lat = pos.latitude

            let title = groundObjectInfo.stnm
            view.popup.open({
              title: title,
              content: '',
              location: [lon, lat]
            })
          });
      },

      //弹框自定义
      showDetail(pos, view, popup) {
        if(pos instanceof Array){
          pos ={
            x :pos[0]+0.01,
            y:pos[1]+0.01
          }
        }
        this.closeDlg()
        let self = this;
        for(let i=0;i<self.checkedList.length;i++){
          let index = self.checkedList[i].id
          switch (index) {
            //水库
            case MsgUtil.RESERVOIR: {
              const groundObjectInfo =this.getNearestStationObject(pos,self.datumReservoir, self.pointsReservoir)
              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.rerName
                this.mesg=MsgUtil.show(2,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //河流
            case MsgUtil.RIVER : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumRiver, this.pointsRiver)
              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.reaName
                this.mesg=MsgUtil.show(3,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //湖泊
            case MsgUtil.LAKES : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumLake, this.pointsLake)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.lksName
                this.mesg=MsgUtil.show(4,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //排污口
            case MsgUtil.DRAIN_OUTLET : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumDrainOutlet, this.pointsDrainOutlet)
              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.pdoName
                this.mesg=MsgUtil.show(5,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //采砂点
            case MsgUtil.SAND_MINING_POINT : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumSandMiningPoint,this.pointsSandMiningPoint)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.sandName
                this.mesg=MsgUtil.show(6,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //水质监测
            case MsgUtil.WATER_QUALITY_MONITORING_STATION : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumWaterQualityMonitoringStation,this.pointsWaterQualityMonitoringStation)
              if (groundObjectInfo!=null) {
                this.popUpTitle=groundObjectInfo.stationName
                this.ground=groundObjectInfo
                this.seen=true
                this.isShow=true;
              }
              break;
            }
            //雨量站
            case MsgUtil.RAINFALL_STATION : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumRainfallStation,this.pointsRainfallStation)
              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.stlc
                this.mesg=MsgUtil.show(8,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //视频监测站
            case MsgUtil.VIDEO_DETECTION_STATION : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumVideoDetectionStation,this.pointsVideoDetectionStation)
              if(groundObjectInfo!=null){
                window.open(groundObjectInfo.remark)
                // this.mesg=MsgUtil.show(9,groundObjectInfo.remark)
                // this.isShow=true;
              }
              break;
            }
            //取水口
            case MsgUtil.WATER_INTAKE : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumWaterIntake,this.pointsWaterIntake)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.wainName
                this.mesg=MsgUtil.show(10,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //事件发生点
            case MsgUtil.OCCURRENCE : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumOccurrence,this.pointsOccurrence)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.evLoc
                this.mesg=MsgUtil.show(11,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //巡河
            case MsgUtil.RIVER_PATROL : {
              let self = this
              const groundObjectInfo=self.getNearestStationObject(pos,self.datumRiverPatrol,self.pointsRiverPatrol)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.rvName
                this.mesg=MsgUtil.show(12,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //专项行动
            case MsgUtil.SPECIAL_ACTION : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumSpecialAction,this.pointsSpecialAction)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.village
                this.mesg=MsgUtil.show(13,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //水文站
            case MsgUtil.HYDROMETRIC_STATION : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.datumHydrometricStation,this.pointsHydrometricStation)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.stlc
                this.mesg=MsgUtil.show(14,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //泵站
            case MsgUtil.PUMPINGSTATION : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.PumpingStation,this.pointsPumpingStation)

              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.resName
                this.mesg=MsgUtil.show(15,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //水闸
            case MsgUtil.SLUICE : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.sluice,this.pointssluice)
              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.name
                this.mesg=MsgUtil.show(16,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            //拦河坝
            case MsgUtil.BARRAGE : {
              const groundObjectInfo=this.getNearestStationObject(pos,this.Barrage,this.pointsBarrage)
              if(groundObjectInfo!=null){
                this.popUpTitle=groundObjectInfo.resName
                this.mesg=MsgUtil.show(17,groundObjectInfo)
                this.isShow=true;
              }
              break;
            }
            default: {
              break;
            }
          }
          const groundObjectInfo =this.getNearestStationObject(pos,this.datumReservoir, this.pointsReservoir)
        }
      },
      getNearestStationObject(pos,datumStation, pointsStation) {
        for (var i = 0; i < pointsStation.length; i++) {
          var distance = GeoUtil.getFlatternDistance(pointsStation[i].x, pointsStation[i].y, pos.x, pos.y);
          if (distance < THRESHHODE) {
            return datumStation[i];
          }
        }
      },
//加载地图
      loadFeatureLayer() {
        const self = this;
        loadModules(
          [
            'esri/layers/FeatureLayer',
          ],  {version: '4.11'})
          .then(([FeatureLayer]) => {
            //边线
            const tiurl = "http://39.108.191.51:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/" + 48;
            //  const url = "http://7colorsworld:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/" + 27;
            const tifeatureLayer = new FeatureLayer({url: tiurl})
            // //将客户端图层添加到地图中
            self.map.add(tifeatureLayer);
            //行政区
            const TrunkUrl ="http://39.108.191.51:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/"+67;
            const statesRenderer = {
              type: "simple",
              symbol: {
                type: "simple-line",
                color: [70,130,180],
                width: 1
              }
            };
            const TrunkfeatureLayer = new FeatureLayer({
              url:TrunkUrl,
              renderer: statesRenderer
            });
            self.map.add(TrunkfeatureLayer);
            //四大干流
            const Url ="http://39.108.191.51:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/"+68;
            const stateRenderer = {
              type: "simple",
              symbol: {
                type: "simple-line",
                color: [137, 207, 240],
                width: 2
              }
            };
            const featureLayer = new FeatureLayer({
              url:Url,
              renderer: stateRenderer
            });
            self.map.add(featureLayer);
            const LocationUrl ="http://39.108.191.51:6080/arcgis/rest/services/AllMapService/allMapDelux/MapServer/"+69;
            const LocationLayer = new FeatureLayer({
              url:LocationUrl,
            });
            self.map.add(LocationLayer);
            //将客户端图层添加到地图中
          })
          .catch(err => {
            // handle any errors
            console.error(err);
          });
      },
      //图层
      fromTree(startLong,startLat,endLong,endLat){
        this.MapTo(startLong,startLat,endLong,endLat,12)
      },
      fromQuery(data){
        this.engScal = data.engScal;
        this.adGrad  = data.adGrad;
        this.evState= data.evState;
        this.waterType= data.waterType;
       
        this.tourState= data.tourState;
        this.quesRect= data.quesRect;
        this.frgrd= data.frgrd;
        this.drawOneCategory(data.id,data.pageNum,this.graphicLayer2);
      },
      //地图定位
      MapTo(StartLong,StartLat,EndLong,EndLat,zoom){
        var lonG = null;
        var laT = null;
        if (StartLong!= undefined && StartLat != undefined && EndLong != undefined && EndLat != undefined &&StartLong!= null  && StartLat != null && EndLong != null && EndLat != null) {
          lonG = (StartLong + EndLong)/2
          laT = (StartLat +EndLat)/2
        }else if(StartLong!= undefined  && StartLat != undefined && StartLong!= null  && StartLat != null){
          lonG = StartLong
          laT = StartLat
        }else if(EndLong != undefined && EndLat != undefined && EndLong != null && EndLat != null){
          lonG = EndLong
          laT = EndLat
        }else{
          return "请更新坐标"
        }
        this.flag=false
        let lonlat = [parseFloat(lonG),parseFloat(laT)]
        this.mapView.goTo({
          center:lonlat,
          zoom: zoom
        });
      },
    }
  }
</script>

<style src="./vue-dialog-drag.css"></style>
<style src="./vue-drop-area.css"></style>

<!-- optional dialog styles, see example -->
<style src="./dialog-styles.css"></style>
<style lang="scss" scoped>
  .container {
    position: absolute;
    top: 74px;
    bottom: 24px;
    left: 24px;
    right: 24px;
    user-select: none;
    width: 100%;
    height: 100%;

    #map-container {
      width: 100%;
      height: 80%;
    }
  }

  .mask {
    font-size: 0.4rem;
    position: absolute;
    right: 10%;
    bottom: 30%;
    width: 65%;
    height: 10%;
    background: rgba(0, 0, 0, 0.3);
    display: flex;
    z-index: 3001;
  }

  .mask .tip {
    margin-top: 2%;
    margin-left: 1%;
    float: left;
    width: 5%;
    text-align: center;
    font-size: 0.5rem;
    color: white;
    flex: 1;
  }

  .mask .title {
    width: 6%;
    font-size: 1.1rem;
    color: white;
    margin-top: 4%;
    margin-left: 1%;
  }

  input {
    margin-top: 5%;
  }

  .el-drawer__wrapper{
    margin-top:100px;
    margin-left: 850px
    // margin-bottom: 100px;
    // margin-right: 50px;
  }
  .el-drawer__header{
    color: #000;

  }
</style>
