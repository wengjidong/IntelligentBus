import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes:[
    {
      path: '/',
      name: 'zym',
      redirect:'/login'
    },
    {
      path: '/login',
      name: 'login',
      component: ()=> import('../Views/Login')
    },
    {
      path: '/home',
      name: 'home',
      component: ()=> import('../Views/Home')
    }
  ]
})

