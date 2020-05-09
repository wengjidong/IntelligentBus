import router, { constantRoutes, asyncRoutes } from '../../router'
import request from '@/utils/request'

/**
 * 通过meta.role判断是否与当前用户权限匹配
 * @param featurePermission
 * @param route
 */
function hasPermission(featurePermission, route) {
  if (route.meta && route.meta.featureId) {
    return featurePermission.some(f => f.featureId === route.meta.featureId)
  } else {
    return true
  }
}

/**
 * 递归过滤异步路由表，返回符合用户角色权限的路由表
 * @param routes asyncRoutes
 * @param featurePermission
 */
function filterAsyncRoutes(routes, featurePermission) {
  const res = []

  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(featurePermission, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, featurePermission)
      }
      res.push(tmp)
    }
  })
  return res
}

// 获取用户权限信息
function getFeaturePermission(token, params) {
  return request({
    headers: {
      'Authorization': 'Bearer ' + token
    },
    url: '/home/getUserAuth',
    method: 'get',
    params
  })
}

const permission = {
  state: {
    routes: [],
    addRoutes: [],
    featurePermission: []
  },
  mutations: {
    SET_ROUTES: (state, routes) => {
      state.addRoutes = routes
      state.routes = constantRoutes.concat(routes)
    },
    SET_FEATURE_PERMISSION: (state, featurePermission) => {
      state.featurePermission = featurePermission
    }
  },
  actions: {
    SetRoutes({ commit, state }, featurePermission) {
      const accessedRoutes = filterAsyncRoutes(asyncRoutes, featurePermission)
      // 根据roles权限生成可访问的路由表
      router.addRoutes(accessedRoutes) // 动态添加可访问路由表
      if (router.history.pending) {
        router.push(router.history.pending.path)
      }
      commit('SET_ROUTES', accessedRoutes)
    },
    SetFeaturePermission({ commit, getters }, user) {
      return new Promise(resolve => {
        getFeaturePermission(user.access_token, { productName: getters.productName }).then(response => {
          if (response.code === 0) {
            const featurePermission = response.value.userFeatureList
            commit('SET_FEATURE_PERMISSION', featurePermission)
            resolve(featurePermission)
          } else {
            console.log(response.message)
          }
        })
      })
    }
  }
}

export default permission
