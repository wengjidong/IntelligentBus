//登录

<template>
  <div class="login-container" id="login">
    <div class="log-email">
      <input type="text" placeholder="Email" class="log-input" v-model="account"><br/>
      <input type="password" placeholder="Password" class="log-input"  v-model="password"><br/>
      <a href="javascript:;" class="log-btn" @click="login">Login</a>
    </div>
    <Loading v-if="isLoging"></Loading>
  </div>
</template>

<script>
  import Loading from './Loading.vue'
export default {
  name: 'Login',
  data(){
  	return {
      isLoging: false,
  		account: 'gis',
  		password: 'gis'
  	}
  },
  components:{
    Loading
  },
  mounted(){
    //检查是否存在session
    //cookie操作方法在源码里有或者参考网上的即可
/*    if(!this.getCookie('session')){
      //如果没有登录状态则跳转到登录页
      this.$router.push('/login');
    }else{
      //否则跳转到登录后的页面
      this.$router.push('/home');
    }*/
    this.$router.push('/');
  },
  methods:{

  	//登录逻辑
  	login(){
  		if(this.account!='' && this.password!=''){
  			this.toLogin();
  		}
  	},

  	//登录请求
  	toLogin(){
  	  debugger
      this.isLoging = true;
  		//一般要跟后端了解密码的加密规则
  		//这里例子用的哈希算法来自./js/sha1.min.js
/*  		let password_sha = hex_sha1(hex_sha1( this.password ));

  		//需要想后端发送的登录参数
  		let loginParam = {
  			account: this.account,
  			password_sha
  		}*/

      //设置在登录状态


      //演示用
  		setTimeout(()=>{
        //登录状态15天后过期
        let expireDays = 1000 * 60 * 60 * 24 * 15;
  			//this.setCookie('session','blablablablabla...', expireDays);

        //登录成功后
  			this.$router.push('/home/');
        this.isLoging = false;
  		},3000)
  	}
  }
}
</script>

<style lang="scss" scoped>
  .login-container {
    position: relative;
    width: 100%;
    height:100%;
    background: url(../images/bg.gif) no-repeat;
    background-size: 100% 100%;
  }
  .log-email{position: absolute;text-align: center; top: 40%;left:40%}
  .log-input{width: 370px;overflow: hidden; padding: 0 15px;font-size: 13px; border: 1px solid #EBEBEB; margin:0 auto 15px; height: 48px; line-height: 48px; -webkit-border-radius: 5px;}
  .log-btn{width:402px; display: block; text-align: left; line-height: 50px;margin:0 auto 15px; height:50px; color:#fff; font-size:13px;-webkit-border-radius: 5px; background-color: #50e3ce;
    -moz-border-radius: 5px;
    -ms-border-radius: 5px;
    -o-border-radius: 5px;
    border-radius: 5px;
    position: relative;
    text-decoration:none}
  .log-btn:hover,.log-btn:focus{color: #fff; opacity: .8;}
  .log-email .log-btn{background-color: #50E3CE;text-align: center;}
</style>
