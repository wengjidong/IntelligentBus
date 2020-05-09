import axios from 'axios'
import { Message, MessageBox } from 'element-ui'
import store from '../store'

// 创建axios实例
const service = axios.create({
  baseURL: 'http://192.168.1.20:4459/api', // api 的 base_url
  /* baseURL: window.glod.baseApi, // api 的 base_url*/
  timeout: 30000 // 请求超时时间
})

// request拦截器
service.interceptors.request.use(
  config => {
    config.headers['Content-Type'] = 'application/json'
    if (store.getters.token) {
      config.headers['Authorization'] = 'Bearer ' + store.getters.token // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    return config
  },
  error => {
    // Do something with request error
    console.log(error) // for debug
    Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use(
  response => {
    /**
     * code为201-206的暂时定为正确 可结合自己业务进行修改
     */
    const res = response
    if (res.status < 200 || res.status > 299) {
      Message({
        message: res.statusText,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (res.status === 50008 || res.status === 50012 || res.status === 50014) {
        MessageBox.confirm(
          '你已被登出，可以取消继续留在该页面，或者重新登录',
          '确定登出',
          {
            confirmButtonText: '重新登录',
            cancelButtonText: '取消',
            type: 'warning'
          }
        ).then(() => {
          store.dispatch('oidc/removeOidcUser').then(() => {
            location.reload() // 为了重新实例化vue-router对象 避免bug
          })
        })
      }
      return Promise.reject('error')
    } else {
      return response.data
    }
  },
  error => {
    if (error.response) {
      Message({
        message: error.response.data.error.details,
        type: 'error',
        duration: 5 * 1000
      })
      console.log('err' + error.response.data) // for debug
    } else {
      Message({
        message: error.message,
        type: 'error',
        duration: 5 * 1000
      })
      console.log('err' + error.message) // for debug
    }
    return Promise.reject(error)
  }
)

export default service
