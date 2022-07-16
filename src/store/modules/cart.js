/*
* 存储购物车商品列表数据
*/
import {
  checkAllCartAPI,
  deleteCartAPI,
  findCartListAPI,
  insertCartAPI,
  mergeLocalCartAPI,
  updateCartAPI
} from '@/api/cart'

export default {
  // 加锁避免和其他模块命名冲突
  namespaced: true, // 定义变量
  state: () => ({
    list: []
  }), // 修改变量
  mutations: {
    setList (state, list) {
      state.list = list
    }, /**
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
    }, // 修改选中状态
    // good当前勾选商品，sel当前商品勾选状态
    singleSel (state, {
      good,
      sel
    }) {
      const currGood = state.list.find((item) => item.skuId === good.skuId)
      currGood.selected = sel
    }, // 全选，遍历数组中所有的单选状态
    selAll (state, isSelAll) {
      state.list.forEach((item) => {
        // 每一个选择框和全选框选择状态保持一致
        item.selected = isSelAll
      })
    }, // 删除方法
    delCart (state, skuId) {
      // 数组的splice删除
      // state.list.splice(state.list.findIndex(item => item.skuId === skuId), 1)
      // 数组的过滤方法删除
      state.list = state.list.filter(item => item.skuId !== skuId)
    }, // 数量修改方法
    changeCart (state, {
      good,
      count
    }) {
      const item = state.list.find(item => item.skuId === good.skuId)
      item.count = count
    }
  },
  getters: {
    // 计算有效商品列表 isEffective = true  filter
    effectiveList (state) {
      return state.list.filter((item) => item.isEffective)
    }, // 已选中列表 selected = true
    selectedList (state, getters) {
      return getters.effectiveList.filter((item) => item.selected)
    }, // 已选择列表总钱数  selectedList 中所有项的单价*数据进行叠加
    allSelectedPrice (state, getters) {
      // 总价
      let total = 0
      getters.selectedList.forEach((item) => {
        // 累加(数量*单价)
        total += item.nowPrice * item.count
      })
      return total
    }, // 全选：有效列表中的seleted字段全为true 才为true
    isAll (state, getters) {
      return getters.effectiveList.every((item) => item.selected)
    }
  }, // 发送请求
  actions: {
    // 合并本地购物车
    async mergeCartAction ({
      state,
      dispatch
    }) {
      // 本地购物车数据为零无需合并
      if (state.list.length > 0) {
        // 后台要求传递三个参数，用数组的map方法生成新的数组，将新数组传递
        const mergeDate = state.list.map((item) => {
          return {
            skuId: item.skuId,
            selected: item.selected,
            count: item.count
          }
        })
        console.log('后台需要合并的购物车列表数据', mergeDate)
        // 调用合并购物车接口方法，将数据对象传递
        await mergeLocalCartAPI(mergeDate)
      }
      // 调用查询方法
      dispatch('getCartAction')
    }, // 从数据库查询当前登录人购物车数据
    async getCartAction ({ commit }) {
      const { data } = await findCartListAPI()
      console.log('登录人的购物车列表：', data)
      commit('setList', data)
    },
    /**
     * @param {*} param0
     * @param {*} skuGood 当前加入购物车的sku组合商品
     * 购物车逻辑：
     * 问题?怎么判断是否登录
     * 1. 未登录（今天）
     * 数据存到vuex（不需要调用后台接口）
     * 2. 已经登录
     * 数据存到数据库（需要调用后台接口）
     */
    async addCartAction ({
      commit,
      rootState,
      dispatch
    }, SkuGood) {
      if (rootState.user.profile.token) {
        // 已经登录
        // console.log('已经登录')
        // 1.调用接口加入购物车
        await insertCartAPI(SkuGood)
        // 2.从数据库查询最新的商品
        dispatch('getCartAction')
      } else {
        // 未登录
        console.log('未登录')
        commit('addCart', SkuGood)
        return '加入购物车成功'
      }
    }, /*
    * 商品单选
   **/
    async singleSelAction ({
      commit,
      rootState,
      dispatch
    }, {
      good,
      sel
    }) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
        await updateCartAPI({
          ...good,
          selected: sel
        })
        // 重新刷新列表
        dispatch('getCartAction')
      } else {
        // 未登录
        commit('singleSel', {
          good,
          sel
        })
      }
    }, /*
    * 全选实现
    */
    async selAllAction ({
      commit,
      rootState,
      dispatch,
      getters
    }, isSelAll) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
        const ids = getters.effectiveList.map(item => item.skuId)
        await checkAllCartAPI({
          selected: isSelAll,
          ids
        })
        // 重新刷新列表
        dispatch('getCartAction')
      } else {
        // 未登录
        commit('selAll', isSelAll)
      }
    }, /*
    * 删除方法
    * */
    async delCartAction ({
      commit,
      rootState,
      dispatch
    }, skuId) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
        // 调用删除接口
        await deleteCartAPI([skuId])
        // 重新刷新列表
        dispatch('getCartAction')
      } else {
        // 未登录,调用删除方法
        commit('delCart', skuId)
      }
    }, /*
    *修改异步方法
     */
    async editCartAction ({
      commit,
      rootState,
      dispatch
    }, {
      good,
      count
    }) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
        await updateCartAPI({
          ...good,
          count
        })
        // 重新刷新列表
        dispatch('getCartAction')
      } else {
        // 未登录,调用修改方法
        commit('changeCart', {
          good,
          count
        })
      }
    }
  }

}
