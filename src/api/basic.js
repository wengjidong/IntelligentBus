import request from '@/utils/request'

// 供应商管理
export function getQuatoSetList(params) {
  return request({
    url: '/QuatoSet/GetQuatoSetList',
    method: 'get',
    params
  })
}


