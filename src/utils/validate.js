export function isvalidUsername(str) {
  const valid_map = ['admin', 'editor']
  return valid_map.indexOf(str.trim()) >= 0
}

export function isvalidateVer(str) {
  const valid_map = '1234'
  return valid_map === str.trim()
}

export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}
