/*
* 首页使用的后台接口方法
*/
import request from '@/utils/request'
// 获取分类
export const getCateAPI = () => {
  return request('/home/category/head', 'get')
}
/**
 * @description: 获取banner图
 * @return {*}
 */
export const findBannerAPI = () => {
  return request('home/banner', 'get')
}
