import axios from 'axios'

const http = axios.create({
  baseURL: '/',
  timeout: 1000 * 20
})

// 设置post请求头
http.defaults.headers.post['Content-Type'] = 'application/json'

/**
 * 请求拦截器
 * 每次请求前，如果存在token则在请求头中携带token
 */
http.interceptors.request.use(
  config => {
    // 登录流程控制中，根据本地是否存在token判断用户的登录情况
    // 但是即使token存在，也有可能token是过期的，所以在每次的请求头中携带token
    // 后台根据携带的token判断用户的登录情况，并返回给我们对应的状态码
    // 而后我们可以在响应拦截器中，根据状态码进行一些统一的操作
    return config
  },
  error => Promise.error(error)
)

// 响应拦截器
http.interceptors.response.use(
  // 请求成功
  res => {
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },
  // 请求失败
  error => {
    const { response } = error
    if (response) {
      // 请求已发出，但是不在2xx的范围
      errorHandle(response.status, response.data.message)
      return Promise.reject(response)
    } else {
      return Promise.reject(error)
    }
  }
)

function errorHandle (status, other) {
  // 状态码判断
  switch (status) {
    // 401: 未登录状态，跳转登录页
    case 401:
      break
    // 403 token过期
    case 403:
      break
    // 404请求不存在
    case 404:
      break
    default:
      console.log(other)
  }
}

export default async ({ Vue }) => {
  Vue.prototype.$axios = http
}

export { http }
