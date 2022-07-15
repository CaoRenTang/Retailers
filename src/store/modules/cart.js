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
    },
    // 修改选中状态
    // good当前勾选商品，sel当前商品勾选状态
    singleSel (state, {
      good,
      sel
    }) {
      const currGood = state.list.find((item) => item.skuId === good.skuId)
      currGood.selected = sel
    },
    // 全选，遍历数组中所有的单选状态
    selAll (state, isSelAll) {
      state.list.forEach((item) => {
        // 每一个选择框和全选框选择状态保持一致
        item.selected = isSelAll
      })
    },
    // 删除方法
    delCart (state, skuId) {
      state.list.splice(state.list.findIndex(item => item.id === skuId), 1)
    }
  },
  getters: {
    // 计算有效商品列表 isEffective = true  filter
    effectiveList (state) {
      return state.list.filter((item) => item.isEffective)
    },
    // 已选中列表 selected = true
    selectedList (state, getters) {
      return getters.effectiveList.filter((item) => item.selected)
    },
    // 已选择列表总钱数  selectedList 中所有项的单价*数据进行叠加
    allSelectedPrice (state, getters) {
      // 总价
      let total = 0
      getters.selectedList.forEach((item) => {
        // 累加(数量*单价)
        total += item.nowPrice * item.count
      })
      return total
    },
    // 全选：有效列表中的seleted字段全为true 才为true
    isAll (state, getters) {
      return getters.effectiveList.every((item) => item.selected)
    }
  },
  // 发送请求
  actions: {
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
        return '加入购物车成功'
      }
    },
    /*
    * 商品单选
   **/
    singleSelAction ({
      commit,
      rootState
    }, {
      good,
      sel
    }) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
      } else {
        // 未登录
        commit('singleSel', {
          good,
          sel
        })
      }
    },
    /*
    * 全选实现
    */
    selAllAction ({
      commit,
      rootState
    }, isSelAll) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
      } else {
        // 未登录
        commit('selAll', isSelAll)
      }
    },
    /*
    * 删除方法
    * */
    delCartAction ({
      commit,
      rootState
    }, skuId) {
      if (rootState.user.profile.token) {
        // 已经登录
        console.log('已经登录')
      } else {
        // 未登录,调用删除方法
        commit('delCart', skuId)
      }
    }
  }

}
