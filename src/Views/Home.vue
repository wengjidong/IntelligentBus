<template>
  <div id="cesiumContainer" class="home">
    <div class="home-top">
      <div class="log">
        <div style="width: 160px;margin-top: 10px">
          <img style="vertical-align: center" src="../../static/img/bus-logo.png">
        </div>
      </div>
      <div class="menu">
        <div class="menu-li"><span class="menu-title">数据展示</span></div>
        <div class="menu-li">
          <span class="menu-title">应用功能
          </span>
          <ul class="drop-down-content">
            <li><a >我是1</a></li>
            <li><a >我是2</a></li>
            <li><a >我是3</a></li>
          </ul>
        </div>
        <div class="menu-li"><span class="menu-title">统计分析</span></div>
        <div class="menu-li"><span class="menu-title">专题图</span></div>
      </div>
    </div>

  </div>
</template>

<script>
  // 导出组件
  import { getQuatoSetList,tilesurl} from '@/api/basic'
  import 'cesium/Widgets/widgets.css'
  export default {
    name: "home",
    data() {
      return {

      };
    },
    mounted () {
      this.$nextTick(()=>{
        this.initMap()
        this.add3DTiles()
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
            pitch : Cesium.Math.toRadians(0),
            roll : Cesium.Math.toRadians(0)
          },
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
          debugger
          //Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZDgxYjkxMy05OWI2LTRkYTEtYjA4ZC1kN2Q4Yzc2NzM5M2QiLCJpZCI6MTI5MDAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjIxMzc1NzF9.mU7f3eFJZxPtESiMyetyp4-4JlvB6l-euHELB5q0p_I'
          //this.viewer = new Cesium.Viewer('cesiumContainer');//创建默认地图
/*          tilesurl().then(response=>{

          })*/

          var palaceTileset = new Cesium.Cesium3DTileset({
            url: 'static/3DData/hn04/tilesnew/tileset.json'
            //url: 'localhost'
          })
          this.viewer.scene.primitives.add(palaceTileset);
          var longitude = 117.2764;
          var latitude = 31.868;
          var height = 60;
          palaceTileset.readyPromise.then(function(argument) {
            //经纬度、高转笛卡尔坐标
            var position = Cesium.Cartesian3.fromDegrees(longitude, latitude, height);
            var mat = Cesium.Transforms.eastNorthUpToFixedFrame(position);
            var rotationX = Cesium.Matrix4.fromRotationTranslation(Cesium.Matrix3.fromRotationZ(Cesium.Math.toRadians(0)));
            Cesium.Matrix4.multiply(mat, rotationX, mat);
            palaceTileset._root.transform = mat;
          })
        }
    }

  };
</script>

<style scoped>
  .home {
    width: 100%;
    height: 100vh;
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
    height: 50px;
    color: #ffffff;
    background:url('../images/top.png'),0 0 repeat, linear-gradient(to right, #6fb7ff, #e2414d);
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
</style>
