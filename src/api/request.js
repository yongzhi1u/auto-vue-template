// 封装fetch
import qs from 'qs'

let baseURL = ''
let baseURLArr = [
  {
    type: 'development',
    url: 'http://127.0.0.1:9000',
  },
  {
    type: 'development',
    url: 'http://127.0.0.1:9000',
  },
  {
    type: 'development',
    url: 'http://127.0.0.1:9000',
  },
]

baseURLArr.forEach((item) => {
  if (process.env.NODE_ENV === item.type) {
    baseURL = item.url
  }
})

export default function request(url, options = {}) {
  url = baseURL + url
  /**
   * get系列请求的处理
   */
  !options.method ? (options.method = 'GET') : null
  if (options.hasOwnProperty('params')) {
    if (/^(GET|DELETE|HEAD|OPTIONS)$/i.test(options.method)) {
      const ask = url.includes('?') ? '&' : '?'
      url += `${ask}${qs.stringify(options.params)}`
    }
    delete options.params
  }

  /**
   * 合并配置项
   */
  options = Object.assign(
    {
      credentials: 'include', // include/same-origin/omit
      headers: {},
    },
    options
  )
  options.headers.Accept = 'application/json'

  /**
   * token校验
   */
  const token = localStorage.getItem('token')
  token && (options.headers.Authorization = token)

  /**
   * post请求处理
   */
  if (/^(POST|PUT)$/i.test(options.method)) {
    !options.type ? (options.type = 'urlencoded') : null
    if (options.type === 'urlencoded') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded'
      options.body = JSON.stringify(options.body)
    }
  }

  return fetch(url, options)
    .then((response) => {
      if (!/^(2|3)\d{2}$/.test(response.status)) {
        switch (response.status) {
          case 401: //权限问题,提示未登录或无权限等；
            break
          case 403: //服务器拒绝执行 （token过期）
            break
          case 404: //找不到页面
            break
        }
        return Promise.reject(response)
      }
    })
    .catch((err) => {
      if (!window.navigator.onLine) {
        //断网处理：跳转断网页面/提示网络错误等等
        return
      }
      return Promise.reject(error)
    })
}
