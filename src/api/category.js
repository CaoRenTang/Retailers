import request from '@/utils/request'

/**
 * @description: 获取一级分类下所有二级分类和分类下商品列表数据
 * @param {*} id 一级分类id
 * @return {*}
 */
export const findAllCategoryAPI = (id) => {
  return request('/category', 'get', { id })
}
