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
/**
 * @description: 获取新鲜好物
 * @param {*}
 * @return {*}
 */
export const findNewAPI = () => {
  return request('home/new', 'get')
}
/**
 * @description: 获取人气推荐
 * @param {*}
 * @return {*}
 */
export const findHotAPI = () => {
  return request('home/hot', 'get')
}
