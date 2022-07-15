/*
* 存储购物车商品列表数据
*/
export default {
  // 加锁避免和其他模块命名冲突
  namespaced: true,
  // 定义变量
  state: () => ({
    list: []
  }),
  // 修改变量
  mutations: {
    /**
     * 判断之前是否加入过该商品？（排重）
     * 1. 加入过：数量的增加
     * 2. 没有加入过：新增
     */
    // state.list 获取已经加入购物车商品
    /**
     * state.list.findIndex方法判断当前skuGood商品是否在list中：
     * 1. 存在：返回存在sku商品的索引值
     * 2. 不存在：返回-1
     */
    addCart (state, SkuGood) {
      const index = state.list.findIndex((item) => item.id === SkuGood.skuId)
      if (index === -1) {
        // 不存在
        state.list.unshift(SkuGood)
      } else {
        // 存在(获取当前存在的商品，将数量+1)
        state.list[index].count += SkuGood.count
      }
    }
  },
  // 发送请求
  actions: {
    /**
     *
     * @param {*} param0
     * @param {*} skuGood 当前加入购物车的sku组合商品
     * 购物车逻辑：
     * 问题?怎么判断是否登录
     * 1. 未登录（今天）
     * 数据存到vuex（不需要调用后台接口）
     *
     * 2. 已经登录
     * 数据存到数据库（需要调用后台接口）
     */
    addCartAction ({
      commit,
      rootState
    }, SkuGood) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
      } else {
        // 未登录
        console.log('未登录')
        commit('addCart', SkuGood)
      }
    }
  }

}
