/*
* 存储购物车商品列表数据
*/
export default {
  namespaced: true,
  // 定义变量
  state: () => ({
    list: []
  }),
  // 修改变量
  mutations: {},
  // 发送请求
  actions: {
    /*
    *通过是否有token值判断是否登录
    *1、有token已经登录，发请求
    * 2、没有token，未登录，将数据存到vuex
    */
    addCartAction ({
      commit,
      rootState
    }, SkuGoods) {
      if (rootState.user.profile.token) {
        console.log('已经登录')
      } else {
        console.log('未登录')
      }
    }
  }

}
