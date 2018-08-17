import axios from 'axios'
// import {Message} from 'element-ui'

// 配置Api接口地址
const baseUrl = process.env.NODE_ENV === 'development' ? '/' : 'http://dianli.hbnrtech.com'

// 添加请求拦截器
axios.interceptors.request.use(config => {
  return config
}, err => {
  // Message.error({message: '请求超时!'})
  return Promise.resolve(err)
})

// 添加响应拦截器
axios.interceptors.response.use(data => {
  // console.log(data)
  if (data.status && data.status === 200 && data.data.status === 'error') {
    // Message.error({message: data.data.msg})
    return
  }
  return data
}, err => {
  if (err.response.status === 504 || err.response.status === 404) {
    // Message.error({message: '服务器被吃了⊙﹏⊙∥'})
  } else if (err.response.status === 403) {
    // Message.error({message: '权限不足,请联系管理员!'})
  } else {
    // Message.error({message: '未知错误!'})
  }
  return Promise.resolve(err)
})

// get请求封装
export const getRequest = function (url, params) {
  return axios({
    method: 'get',
    url: url,
    params: params,
    baseURL: baseUrl
  })
}

// post请求封装
export const postRequest = function (url, params) {
  return axios({
    method: 'POST',
    url: url,
    data: params,
    baseURL: baseUrl,
    transformRequest: [function (data) {
      let ret = ''
      for (let it in data) {
        ret += encodeURIComponent(it) + '=' + encodeURIComponent(data[it]) + '&'
      }
      return ret
    }],
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  })
}
