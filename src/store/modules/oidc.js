import { vuexOidcCreateStoreModule } from 'vuex-oidc'
import { oidcSettings } from '@/config/oidc'
import store from '@/store'

function userLoaded(user) {
  console.log('OIDC user is loaded:', user)

  store.dispatch('SetFeaturePermission', user).then(featurePermission => {
    store.dispatch('SetRoutes', featurePermission)
  })
}

const oidc = vuexOidcCreateStoreModule(
  oidcSettings,
  // NOTE: If you do not want to use localStorage for tokens, in stead of just passing oidcSettings, you can
  // spread your oidcSettings and define a userStore of your choice
  // {
  //   ...oidcSettings,
  //   userStore: new WebStorageStateStore({ store: window.sessionStorage })
  // },
  // Optional OIDC store settings
  {
    namespaced: true,
    dispatchEventsOnWindow: true
  },
  // Optional OIDC event listeners
  {
    userLoaded: userLoaded,
    userUnloaded: () => console.log('OIDC user is unloaded'),
    accessTokenExpiring: () => console.log('Access token will expire'),
    accessTokenExpired: () => console.log('Access token did expire'),
    silentRenewError: () => console.log('OIDC user is unloaded'),
    userSignedOut: () => console.log('OIDC user is signed out'),
    oidcError: (payload) => console.log('OIDC error', payload)
  }
)

export default oidc
