import { getCateAPI } from '@/api/home'

export default {
  // 组件内调用方法
  namespaced: true, // 定义变量
  state: {
    // 菜单数据
    list: []
  },
  getters: {}, // 修改变量（同步）
  mutations: {
    // 存储菜单数据
    setCate (state, payload) {
      state.list = payload
    }
  }, // 发送请求（异步）
  actions: {
    async getCateList ({ commit }, payload) {
      const { data } = await getCateAPI()
      console.log('分类菜单数据：', data.result)
      commit('setCate', data.result)
    }
  },
  modules: {}
}
