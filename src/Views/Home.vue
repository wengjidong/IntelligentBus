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
        const viewer = new Cesium.Viewer('cesiumContainer')
        console.log('viewer: ', viewer)
      })
    },

  };
</script>

<style scoped>
   #cesiumContainer {
    width: 100%; height: 100%; margin: 0; padding: 0; overflow: hidden;
  }
</style>
