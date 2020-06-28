<template>
  <div id="cesiumContainer" class="home">
    <div class="home-top">
      <div class="user-title">{{title}}</div>
      <div class="top-right">
        <div class="now-data">{{nowTime}}</div>
        <weather-model></weather-model>
        <div :class="['iconfont', 'full-icon', isFullScreen?'icon-tuichuquanping':'icon-quanping']"
             @click="handleFullScreen"></div>
<!--        <div class="iconfont yuan-icon icon-yuan" v-if="otherFeature.plan" @click="initPlanDialog(null, null, null)"></div>-->
      </div>
    </div>
  </div>
</template>

<script>
  // 导出组件
  import { getQuatoSetList,tilesurl} from '@/api/basic'
  import 'cesium/Widgets/widgets.css'
  import moment from 'moment'//
  export default {
    name: "home",
    data() {
      return {
        carPrimitive:'',
        index:0,
        title:'公交监管平台二三维一体化',
        nowTime:'',
        isFullScreen:false
      };
    },
    mounted () {
      this.getNowTime()
      this.$nextTick(()=>{
/*        this.initMap()
        this.add3DTiles()*/
        //this.addModels()
        //this.ttCar()
      })

    },
    methods:{
        initMap(){
          this.viewer={}
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZDgxYjkxMy05OWI2LTRkYTEtYjA4ZC1kN2Q4Yzc2NzM5M2QiLCJpZCI6MTI5MDAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjIxMzc1NzF9.mU7f3eFJZxPtESiMyetyp4-4JlvB6l-euHELB5q0p_I'
        var token = '78767b9311e5c8382a1258a78604f618';
        // 服务域名
        var tdtUrl = 'https://t{s}.tianditu.gov.cn/';
        // 服务负载子域
        var subdomains=['0','1','2','3','4','5','6','7'];

        // cesium 初始化
        this.viewer = new Cesium.Viewer('cesiumContainer', {
          geocoder:false,
          homeButton:false,
          sceneModePicker:false,
          navigationHelpButton:false,
          animation:false,
          timeline:false,
          baseLayerPicker:false,
          fullscreenButton:false,
          vrButton:false,
          terrainProvider: Cesium.createWorldTerrain()
        });
        // 抗锯齿
          this.viewer.scene.postProcessStages.fxaa.enabled=false;
        // 水雾特效
          this.viewer.scene.globe.showGroundAtmosphere = true;
        // 设置最大俯仰角，[-90,0]区间内，默认为-30，单位弧度
          this.viewer.scene.screenSpaceCameraController.constrainedPitch = Cesium.Math.toRadians(-20);
        // 取消默认的双击事件
          this.viewer.cesiumWidget.screenSpaceEventHandler.removeInputAction(Cesium.ScreenSpaceEventType.LEFT_DOUBLE_CLICK);

        // 叠加影像服务
        var imgMap = new Cesium.UrlTemplateImageryProvider({
          url: tdtUrl + 'DataServer?T=img_w&x={x}&y={y}&l={z}&tk=' + token,
          subdomains: subdomains,
          tilingScheme : new Cesium.WebMercatorTilingScheme(),
          maximumLevel : 18
        });
          this.viewer.imageryLayers.addImageryProvider(imgMap);

        // 叠加国界服务
        var iboMap = new Cesium.UrlTemplateImageryProvider({
          url: tdtUrl + 'DataServer?T=ibo_w&x={x}&y={y}&l={z}&tk=' + token,
          subdomains: subdomains,
          tilingScheme : new Cesium.WebMercatorTilingScheme(),
          maximumLevel : 10
        });
          this.viewer.imageryLayers.addImageryProvider(iboMap);

        // 叠加地形服务
        var terrainUrls = [];

        for (var i = 0; i < subdomains.length; i++){
          var url = tdtUrl.replace('{s}', subdomains[i]) + 'DataServer?T=elv_c&tk=' + token;
          terrainUrls.push(url);
        }

        var provider = new Cesium.GeoTerrainProvider({
          urls: terrainUrls
        });

          this.viewer.terrainProvider = provider;

        // 将三维球定位到中国
        this.viewer.camera.flyTo({
          destination: Cesium.Cartesian3.fromDegrees(117.2764, 31.868, 60),
          orientation: {
            heading :  Cesium.Math.toRadians(0),
            pitch : Cesium.Math.toRadians(-90),
            roll : Cesium.Math.toRadians(0)
          },
          duration:15,
          complete:function callback() {
            // 定位完成之后的回调函数
          }
        });

        // 叠加三维地名服务
        var wtfs = new Cesium.GeoWTFS({
          viewer:this.viewer,
          //三维地名服务，使用wtfs服务
          subdomains:subdomains,
          metadata:{
            boundBox: {
              minX: -180,
              minY: -90,
              maxX: 180,
              maxY: 90
            },
            minLevel: 1,
            maxLevel: 20
          },
          aotuCollide: true, //是否开启避让
          collisionPadding: [5, 10, 8, 5], //开启避让时，标注碰撞增加内边距，上、右、下、左
          serverFirstStyle: true, //服务端样式优先
          labelGraphics: {
            font:"28px sans-serif",
            fontSize: 28,
            fillColor:Cesium.Color.WHITE,
            scale: 0.5,
            outlineColor:Cesium.Color.BLACK,
            outlineWidth: 5,
            style:Cesium.LabelStyle.FILL_AND_OUTLINE,
            showBackground:false,
            backgroundColor:Cesium.Color.RED,
            backgroundPadding:new Cesium.Cartesian2(10, 10),
            horizontalOrigin:Cesium.HorizontalOrigin.MIDDLE,
            verticalOrigin:Cesium.VerticalOrigin.TOP,
            eyeOffset:Cesium.Cartesian3.ZERO,
            pixelOffset:new Cesium.Cartesian2(0, 8)
          },
          billboardGraphics: {
            horizontalOrigin:Cesium.HorizontalOrigin.CENTER,
            verticalOrigin:Cesium.VerticalOrigin.CENTER,
            eyeOffset:Cesium.Cartesian3.ZERO,
            pixelOffset:Cesium.Cartesian2.ZERO,
            alignedAxis:Cesium.Cartesian3.ZERO,
            color:Cesium.Color.WHITE,
            rotation:0,
            scale:1,
            width:18,
            height:18
          }
        });

        //三维地名服务，使用wtfs服务
        wtfs.getTileUrl = function(){
          return tdtUrl + 'mapservice/GetTiles?lxys={z},{x},{y}&tk='+ token;
        }

        wtfs.getIcoUrl = function(){
          return tdtUrl + 'mapservice/GetIcon?id={id}&tk='+ token;
        }

        wtfs.initTDT([{"x":6,"y":1,"level":2,"boundBox":{"minX":90,"minY":0,"maxX":135,"maxY":45}},{"x":7,"y":1,"level":2,"boundBox":{"minX":135,"minY":0,"maxX":180,"maxY":45}},{"x":6,"y":0,"level":2,"boundBox":{"minX":90,"minY":45,"maxX":135,"maxY":90}},{"x":7,"y":0,"level":2,"boundBox":{"minX":135,"minY":45,"maxX":180,"maxY":90}},{"x":5,"y":1,"level":2,"boundBox":{"minX":45,"minY":0,"maxX":90,"maxY":45}},{"x":4,"y":1,"level":2,"boundBox":{"minX":0,"minY":0,"maxX":45,"maxY":45}},{"x":5,"y":0,"level":2,"boundBox":{"minX":45,"minY":45,"maxX":90,"maxY":90}},{"x":4,"y":0,"level":2,"boundBox":{"minX":0,"minY":45,"maxX":45,"maxY":90}},{"x":6,"y":2,"level":2,"boundBox":{"minX":90,"minY":-45,"maxX":135,"maxY":0}},{"x":6,"y":3,"level":2,"boundBox":{"minX":90,"minY":-90,"maxX":135,"maxY":-45}},{"x":7,"y":2,"level":2,"boundBox":{"minX":135,"minY":-45,"maxX":180,"maxY":0}},{"x":5,"y":2,"level":2,"boundBox":{"minX":45,"minY":-45,"maxX":90,"maxY":0}},{"x":4,"y":2,"level":2,"boundBox":{"minX":0,"minY":-45,"maxX":45,"maxY":0}},{"x":3,"y":1,"level":2,"boundBox":{"minX":-45,"minY":0,"maxX":0,"maxY":45}},{"x":3,"y":0,"level":2,"boundBox":{"minX":-45,"minY":45,"maxX":0,"maxY":90}},{"x":2,"y":0,"level":2,"boundBox":{"minX":-90,"minY":45,"maxX":-45,"maxY":90}},{"x":0,"y":1,"level":2,"boundBox":{"minX":-180,"minY":0,"maxX":-135,"maxY":45}},{"x":1,"y":0,"level":2,"boundBox":{"minX":-135,"minY":45,"maxX":-90,"maxY":90}},{"x":0,"y":0,"level":2,"boundBox":{"minX":-180,"minY":45,"maxX":-135,"maxY":90}}]);
      },
        add3DTiles(){
          var palaceTileset = new Cesium.Cesium3DTileset({
            //url: 'static/3DData/hn04/tilesnew/tileset.json'
             url: 'static/3DData/bus/tileset.json',
            maximumScreenSpaceError: 2,
            maximumNumberOfLoadedTiles: 1000
          })
          this.viewer.scene.primitives.add(palaceTileset);
          var longitude = 117.2764;
          var latitude = 31.868;
          var height = 20;
          // //缩放
          let params = {
            tx: 117.2764, //模型中心X轴坐标（经度，单位：十进制度）
            ty: 31.868, //模型中心Y轴坐标（纬度，单位：十进制度）
            tz: 20, //模型中心Z轴坐标（高程，单位：米）
            rx: 0, //X轴（经度）方向旋转角度（单位：度）
            ry: 0, //Y轴（纬度）方向旋转角度（单位：度）
            rz: -1 //Z轴（高程）方向旋转角度（单位：度）
          };
          var that=this;
          palaceTileset.readyPromise.then(function(tileset) {
            //经纬度、高转笛卡尔坐标
            var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
            var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            palaceTileset._root.transform =that.update3dtilesMaxtrix(params);
            // Position tileset
          })

        },
        addModels(){
          // 小车旋转角度
          let radian = Cesium.Math.toRadians(3.0);
          // 小车的速度
          let speed = 60;
          // 速度矢量
          let speedVector = new Cesium.Cartesian3();
          // 起始位置
          let position = Cesium.Cartesian3.fromDegrees(117.2764,31.868,0);
          // 用于设置小车方向
          let hpRoll = new Cesium.HeadingPitchRoll();
          let fixedFrameTransforms =  Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');
          this.scene=this.viewer.scene;
          this.carPrimitive = this.scene.primitives.add(
            Cesium.Model.fromGltf({
              url: 'static/CesiumMilkTruck.glb',
              modelMatrix: Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms),
              minimumPixelSize: 128,
            })
          )
        },
        update3dtilesMaxtrix(params){
          debugger
          let mx = Cesium.Matrix3.fromRotationX(Cesium.Math.toRadians(params.rx));
          let my = Cesium.Matrix3.fromRotationY(Cesium.Math.toRadians(params.ry));
          let mz = Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(params.rz));
          let rotationX = Cesium.Matrix4.fromRotationTranslation(mx);
          let rotationY = Cesium.Matrix4.fromRotationTranslation(my);
          let rotationZ = Cesium.Matrix4.fromRotationTranslation(mz);
          //平移
          let position = Cesium.Cartesian3.fromDegrees(params.tx, params.ty, params.tz);
          let m = Cesium.Transforms.eastNorthUpToFixedFrame(position);

          let scale = Cesium.Matrix4.fromUniformScale(100);
          // //缩放
          Cesium.Matrix4.multiply(m, scale, m);
          //旋转、平移矩阵相乘
          Cesium.Matrix4.multiply(m, rotationX, m);
          Cesium.Matrix4.multiply(m, rotationY, m);
          Cesium.Matrix4.multiply(m, rotationZ, m);
          //赋值给tileset
          return m;
        },
        ttCar(){
          setTimeout(()=>{
            this.index++;
            this.moveCar(this.index);
          },1000)
        },
      // 移动小车
      moveCar(index) {
          let speedVector = new Cesium.Cartesian3();
          var speed=60;
          let position = Cesium.Cartesian3.fromDegrees(117.2764+index,31.868,0);
          let hpRoll = new Cesium.HeadingPitchRoll();
          let fixedFrameTransforms =  Cesium.Transforms.localFrameToFixedFrameGenerator('north', 'west');
           // 计算速度矩阵
          speedVector = Cesium.Cartesian3.multiplyByScalar(Cesium.Cartesian3.UNIT_X,speed,speedVector);
          // 根据速度计算出下一个位置的坐标
          position = Cesium.Matrix4.multiplyByPoint(this.carPrimitive.modelMatrix ,speedVector, position);
          // 小车移动
          Cesium.Transforms.headingPitchRollToFixedFrame(position, hpRoll, Cesium.Ellipsoid.WGS84, fixedFrameTransforms, this.carPrimitive.modelMatrix);
          this.ttCar();
       },
      handleFullScreen(){

      },
      getNowTime(){
        this.nowTime = moment().format("YYYY年MM月DD日  ")+ "星期" + "日一二三四五六".charAt(new Date().getDay())
          + (moment().format("a") == "am"?"  上午":"  下午")+ moment().format("HH:mm")
      },
    }

  };
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100vh;
    position:relative;
  }
  #cesiumContainer {
    width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
  }
  .log{
    width:10%;
    margin-left: 5px;
  }
  .home-top {
    background-size:100% 100%;
    width: 100%;
    height: 100px;
    background-image:url('../images/top-bg.png');
    position: absolute;
    z-index: 100;
  }
  .menu{
    width: 90%;
    height: 100%;
    margin-top: -46px;
    margin-left: 160px;
    font-size: 1.04167rem;
    color: #ade8ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 2px;
  }
  .menu-li{
    float:left;
    height: 100%;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    display: inline-block;
    vertical-align: top;
    min-width: 100px;
    margin-left: 80px;
    border-bottom: .20833rem solid transparent;
    cursor: pointer;
    font-size: 1rem;
    color: #ade8ff;
    font-weight: 500;
    text-align: center;
    letter-spacing: 2px;
    line-height: 3rem
  }
   .menu-li:hover  .drop-down-content{
    display: block;
  }
  .menu-title{
    font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
    font-size:20px;
  }
  .drop-down-content{
    margin-top: 0;
    padding: 0;
    display: none;
  }
  .drop-down-content li:hover a{
    background-color:red;
  }
  ul{
    list-style: none;
  }
  ul a{
    display: block;
    text-decoration: none;
    width: 100px;
    height: 50px;
    text-align: center;
    line-height: 50px;
    color: white;
    background-color: rgba(7,21,58,70);
  }
  .user-title{
    text-align: center;
    font-size: 42px;
    margin-top: 25px;
    color: #fff;
    line-height: 58px;
    text-shadow:2px 2px 0px rgba(8,25,75,1)
  }
  .top-right{
    position: absolute;
    width: 30%;
    height: 38px;
    line-height: 38px;
    top: 10px;
    right: 60px;
  .now-data{
    display: inline-block;
    font-size: 16px;
    font-weight: 300;
    color: #fff;
    margin-right: 20px;
    float: left;
    white-space: pre;
  }
  .full-icon{
    cursor: pointer;
    display: inline-block;
    float: right;
    font-size: 24px;
    color: #B8BFD0;
    margin-left: 15px;
  }
  .yuan-icon{
    cursor: pointer;
    display: inline-block;
    float: right;
    font-size: 24px;
    color: #FFA338;
  }
  }
</style>
