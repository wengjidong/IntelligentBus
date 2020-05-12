<template>
  <div id="cesiumContainer" class="home">
    <div class="home-top">
      <div class="menu">
        <div class="menu-li"><span class="menu-title">数据展示</span></div>
        <div class="menu-li">
          <span class="menu-title">应用功能
          </span>
          <ul class="drop-down-content">
            <li><a href="#">我是1</a></li>
            <li><a href="#">我是2</a></li>
            <li><a href="#">我是3</a></li>
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
  import { getQuatoSetList } from '@/api/basic'
  import 'cesium/Widgets/widgets.css'
  export default {
    name: "home",
    data() {
      return {};
    },
    mounted () {
      getQuatoSetList().then(response=>{
        debugger
      })
      this.$nextTick(() => {
        Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI0ZDgxYjkxMy05OWI2LTRkYTEtYjA4ZC1kN2Q4Yzc2NzM5M2QiLCJpZCI6MTI5MDAsInNjb3BlcyI6WyJhc3IiLCJnYyJdLCJpYXQiOjE1NjIxMzc1NzF9.mU7f3eFJZxPtESiMyetyp4-4JlvB6l-euHELB5q0p_I'
        const viewer = new Cesium.Viewer('cesiumContainer',{
          geocoder:false,
          homeButton:false,
          sceneModePicker:false,
          navigationHelpButton:false,
          animation:false,
          timeline:false,
          baseLayerPicker:false,
          fullscreenButton:false,
          vrButton:false
        })
        //// 去除左下角的logo
        viewer._cesiumWidget._creditContainer.style.display="none";
// 1. 通过top-down视图设置位置。
/*        viewer.camera.setView({
          destination : Cesium.Cartesian3.fromDegrees(117.2764, 31.868, 9000.0)
        });*/

// 2 通过方位角、俯仰角、滚动角设置视图。ddddddd
        viewer.camera.setView({
          destination : Cesium.Cartesian3.fromDegrees(117.2764, 31.868, 9000.0),
          orientation: {
            heading : Cesium.Math.toRadians(0), // east, default value is 0.0 (north)
            pitch : Cesium.Math.toRadians(-90),    // default value (looking down)
            roll : 0.0                             // default value
          }
        });
      })
    },

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
    height: 100%;
    vertical-align: top;
    margin-left: 5.83333rem;
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
    min-width: 4.6875rem;
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
  .menu-title{
    display: inline-block;
    font-family: '微软雅黑', 'Avenir', Helvetica, Arial, sans-serif;
    font-size:20px;
  }
  .drop-down-content{
    position:absolute;
    margin-top: 56px;
    left:24.89%;
    padding: 0;
    display: inline-block;
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
