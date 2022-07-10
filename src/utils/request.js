// 1.导入axios实例
import axios from 'axios'
// 导入vuex
import store from '../store'
// 导入路由实例
import router from '../router'
// baseURL 超时时间配置，axios.create创建新的axios实例
const request = axios.create({
  // 后台请求基地址
  baseURL: 'http://pcapi-xiaotuxian-front-devtest.itheima.net'
})
// 2.添加拦截器
// 请求拦截器-之前
request.interceptors.request.use(config => {
  // 场景：全局注入token
  // 获取token
  const { token } = store.state.user.profile
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, e => Promise.reject(e))

// 处理返回数据 token失效跳回到登录页
// 响应拦截器-之后
request.interceptors.response.use(
  (response) => {
    // 请求成功（2XX）
    const returnData = {
      msg: response.data.msg,
      data: response.data.result
    }
    return returnData
  },
  // 请求失败（5XX）
  (error) => {
    //  场景：token失效状态码401跳回登录页
    if (error.response.status === 401) {
      // token失效返回登录也重新登录返回退出页面
      const backPath = router.currentRoute.value.path
      router.replace(`/login?backPath=${backPath}`)
    }
    return Promise.reject(error)
  }
)
/**
 * @param url
 * @param method
 * @param data
 */
const myRequest = (url, method, data) => {
  return request({
    url,
    method,
    [method === 'get' ? 'params' : 'data']: data
  })
}
// 3.导出request实例
export default myRequest
