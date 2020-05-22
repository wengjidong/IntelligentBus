module.exports = {
  proxyList: {
    // 测试环境
    '/api': {
      target: 'http://192.168.1.179:8066/', // 接口域名
      changeOrigin: true //是否跨域
    }
  }
}
