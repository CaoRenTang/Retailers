import { createStore, createLogger } from 'vuex'
// 导入vuex数据持久化插件
import createPersistedstate from 'vuex-persistedstate'
// 导入子模块
import user from './modules/user'
import cart from './modules/cart'
// 创建vuex实例并导出
export default createStore({
  state: {},
  getters: {},
  mutations: {},
  actions: {},
  modules: {
    user,
    cart
  },
  // 注册插件
  plugins: [
    // 数据持久化
    createPersistedstate(
      {
        key: 'rabbit-client-pc-store',
        paths: ['user', 'cart']
      }
    ),
    // vuex内置日志插件辅助开发
    createLogger()
  ]
})
