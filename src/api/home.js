/*
* 首页使用的后台接口方法
*/
import request from '@/utils/request'
// 获取分类
export const getCateAPI = () => {
  return request('/home/category/head', 'get')
}
