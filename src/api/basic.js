import request from '@/utils/request'

// 供应商管理
export function getQuatoSetList(params) {
  return request({
    url: '/QuatoSet/GetQuatoSetList',
    method: 'get',
    params
  })
}
// 供应商管理
export function tilesurl() {
  return request({
    url: 'http://192.168.1.179:8066/',
    method: 'get',
  })
}

