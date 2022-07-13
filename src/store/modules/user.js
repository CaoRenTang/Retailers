/**
 * 存储用户个人信息
 */
import { userAccountLoginAPI } from '@/api/user'

export default {
  namespaced: true,
  state: () => ({
    profile: {
      id: '',
      avatar: '',
      nickname: '',
      account: '',
      mobile: '',
      token: ''
    }
  }),
  mutations: {
    setProfile (state, profile) {
      state.profile = profile
    }
  },
  // 登录请求
  actions: {
    async loginAction ({ commit }, formData) {
      const { data } = await userAccountLoginAPI(formData)
      console.log('登录信息', data)
      commit('setProfile', data)
    }
  }

}
