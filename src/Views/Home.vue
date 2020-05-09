<template>
  <div>
    <div id="cesiumContainer"></div>
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
  #cesiumContainer {
    width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
  }
</style>
