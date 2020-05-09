const getters = {
  IsAuthenticated: (state, getters) => getters['oidc/oidcIsAuthenticated'],
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: (state, getters) => getters['oidc/oidcAccessToken'],
  avatar: (state, getters) => getters['oidc/oidcUser'].avatar,
  name: (state, getters) => getters['oidc/oidcUser'].name,
  userName: (state, getters) => getters['oidc/oidcUser'].unique_name,
  personCode: (state, getters) => getters['oidc/oidcUser'].personCode,
  roles: (state, getters) => {
    const oidcRoles = getters['oidc/oidcUser'].role
    return Array.isArray(oidcRoles) ? [...oidcRoles] : [oidcRoles]
  },
  orgCode: () => '',
  productName: () => '评价管理',
  products: (state, getters) => getters['oidc/oidcUser'].product,
  featurePermission: state => state.permission.featurePermission,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,
  permission_routes: state => state.permission.routes
}
export default getters
