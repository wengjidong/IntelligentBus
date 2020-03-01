<template>
  <div>
    <div id="cesiumContainer"></div>
  </div>
</template>

<script>
  // 导出组件

  import 'cesium/Widgets/widgets.css'
  export default {
    name: "home",
    data() {
      return {};
    },
    mounted () {
      this.$nextTick(() => {
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
      })
    },

  };
</script>

<style scoped>
   #cesiumContainer {
    width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
  }
</style>
