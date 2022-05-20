import Axios, { AxiosError, AxiosResponse, AxiosRequestConfig } from 'axios'
import { ElMessage as $message } from 'element-plus'
import * as nProgress from 'nprogress'
const BASE_URL = 'http://www.foogeoo.ltd:9999/blog'
const TIME_OUT = 5000

// 通过Axios.create()方法创建一个自定义配置的axios实例
const instance = Axios.create({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  headers: {
    'content-type': 'application/json',
    // 'access-control-allow-origin': '*'

  }
})
instance.interceptors.request.use((config) => {
  nProgress.start()

  return config;
})
// 使用后置拦截器，对获取的响应进行拦截：
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    nProgress.done()
    if (String(res.status).indexOf('2') !== 0) {
      return {
        code: res.status,
        message: res.data.message || '请求异常，请刷新重试',
        result: false
      }
    }
    return Promise.reject(res)
  },
  (error: AxiosError) => {
    nProgress.done()
    if (error && error.response) {
      errorHandle(error.response.status, error.response)
      return Promise.reject(error.response)
    }
    // console.log('网络请求失败, 请刷新重试')
    $message.error('网络请求失败, 请刷新重试')
    return Promise.reject(error)
  }
)
// 当捕获到错误请求时，可以自定义错误处理：
const errorHandle = (status: number, error): void => {
  // HTTP状态码判断
  // switch (status) {
  //   case 401:
  //     return alert(`Error Code: ${status}, Message: ${error.msg || '登录失效，请重新登录'}`)
  //   case 403:
  //     return alert(`Error Code: ${status}, Message: ${error.msg || '你没有访问权限'}`)
  //   case 500:
  //     return alert(`Error Code: ${status}, Message: ${error.msg || '后台错误，请联系管理员'}`)
  //   case 502:
  //     return alert(`Error Code: ${status}, Message: ${error.msg || '平台环境异常'}`)
  //   default:
  //     alert(`Error Code: ${status}, Message: ${error.msg || '未知错误，请刷新重试'}`)
  // }
}
const getPromise = (method, url, params, config = {}) => {
  return new Promise((resolve, reject) => {
    instance[method](url, params, config).catch(e => e.data)
      .then(res => resolve(res))
      .catch(err => reject(err))
  })
}

// 导出我们常用的请求方法：
const get = (url: string, params?: any) => getPromise('get', url, { params })
const post = (url: string, params: any, config?: AxiosRequestConfig) => getPromise('post', url, params, config)
const del = (url: string, params?: any, config?: AxiosRequestConfig) => getPromise('delete', url, params, config)
const put = (url: string, params?: any, config?: AxiosRequestConfig) => getPromise('put', url, params, config)
export {
  get,
  post,
  del,
  put,
  instance
}


