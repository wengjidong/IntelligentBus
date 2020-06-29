<template>
  <!--天气-->
  <div class="weather-box">
    <span>{{weatherBody.tem}}℃</span>
    <div class="icon-div">
      <img class="wea-icon" v-if="weatherList.indexOf(weatherBody.wea_img) > -1 && weatherBody.wea_img"
           :src="require('../../src/images/weather/'+ weatherBody.wea_img+ '.png')" alt="">
      <img class="wea-icon" v-else src="../../src/images/weather/yun.png">
    </div>
  </div>
</template>

<script>
    export default {
      name: "weatherModel",
      data() {
        return {
          weatherBody:{},
          weatherList: [
            'yun',
            'yu',
            'xue',
            'bingbao',
            'wu',
            'qing',
            'shachen',
            'xiaoyu',
            'yin',
            'lei',
          ]
        }
      },
      methods: {
        getWeather(){
          let api = "https://www.tianqiapi.com/free/day?appid=11785636&appsecret=Ucke7XYE";
          this.$http.get(api).then(function (response) {
            if(response.body){
              this.weatherBody = response.body;
            }
          },function (err) {
            console.log(err);
          });
        }
      },
      created() {
        this.getWeather()
      }
    }
</script>

<style scoped lang="scss">
.weather-box{
  display: inline-block;
  height: 40px;
  line-height: 40px;
  width: 90px;
  font-size: 16px;
  color: #fff;
  .icon-div{
    display: inline-flex;
    vertical-align: middle;
    .wea-icon{
      margin-left: 5px;
      width: 24px;
      height: 24px;
    }
  }
}
</style>
