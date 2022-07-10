/*
* 首页使用的后台接口方法
*/
import request from '@/utils/request'

/**
 * @description: 获取分类列表
 * @return {*}
 */
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
