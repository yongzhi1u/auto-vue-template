// 基于axios的二次封装
import axios from 'axios'
import qs from 'qs'

const instance = axios.create()
/**
 * 1.根据环境变量设置baseURL
 */
switch (process.env.NODE_ENV) {
  case 'development':
    instance.defaults.baseURL = 'http://127.0.0.1:9000'
    break
  case 'test':
    instance.defaults.baseURL = 'http://192.168.1.1:9000'
    break
  case 'production':
    instance.defaults.baseURL = 'https://api.yongzhi1u.com'
    break
  default:
}

/**
 * 2.设置请求超时时间 ms
 */
instance.defaults.timeout = 10000

/**
 * 3.设置CORS跨域是否允许携带资源凭证(如cookie)
 */
instance.defaults.withCredentials = true

/**
 * 4.设置数据的默认请求格式 formData ?key1=value1&key2=value2
 */
instance.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
instance.defaults.transformRequest = (data) => qs.stringify(data)

/**
 * 5.请求拦截器
 */
instance.interceptors.request.use(
  (config) => {
    // token验证
    const token = localStorage.getItem('token')
    token && (config.headers['Authorization'] = token)
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)

/**
 * 6.响应拦截器
 */
instance.defaults.validateStatus = (status) => {
  // 响应成功http状态码
  return /^(2|3)\d{2}$/.test(status)
}
instance.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    let { response } = error
    if (response) {
      switch (response.status) {
        case 401: //权限问题,提示未登录或无权限等；
          break
        case 403: //服务器拒绝执行 （token过期）
          break
        case 404: //找不到页面
          break
      }
    } else {
      //服务器连结果都没有返回
      if (!window.navigator.onLine) {
        //断网处理：跳转断网页面/提示网络错误等等
        return
      }
      return Promise.reject(error)
    }
  }
)

export default instance
