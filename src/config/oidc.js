export const oidcSettings = {
  authority: window.location.origin,
  clientId: 'js',
  redirectUri: window.location.origin + '/oidc-callback',
  popupRedirectUri: window.location.origin + '/oidc-popup-callback',
  responseType: 'id_token token',
  scope: 'openid profile system resource evaluation',
  automaticSilentRenew: true,
  silentRedirectUri: window.location.origin + '/silent-renew-oidc.html'
};
