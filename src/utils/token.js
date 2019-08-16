import { LocalStorage } from 'quasar'

const TOKEN_KEY = 'token'

let _token = null

export function hasTokenCache () {
  return !!_token
}

export function hasToken () {
  return LocalStorage.has(TOKEN_KEY)
}

export function getToken () {
  if (!_token) {
    _token = LocalStorage.getItem(TOKEN_KEY)
  }
  return _token
}

export function setToken (tokens) {
  _token = tokens
  LocalStorage.set(TOKEN_KEY, tokens)
}

export function removeToken () {
  LocalStorage.remove(TOKEN_KEY)
  _token = null
}

export function checkTokenUpdated () {
  return _token !== getToken()
}
