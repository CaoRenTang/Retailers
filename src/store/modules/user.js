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
    },
    delProfile (state) {
      state.profile = {}
    }
  },
  actions: {
    // 登录方法
    async loginAction ({ commit }, formData) {
      const { data } = await userAccountLoginAPI(formData)
      console.log('登录信息', data)
      // console.log('-------', xtc)
      commit('setProfile', data)
    },
    // 退出方法
    loginOutAction ({ commit }) {
      commit('delProfile')
    }
  }

}
