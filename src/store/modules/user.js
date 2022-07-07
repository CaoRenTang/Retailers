/**
 * 存储用户个人信息
 */
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
    setToken (state, token) {
      state.profile.token = token
    }
  }

}
