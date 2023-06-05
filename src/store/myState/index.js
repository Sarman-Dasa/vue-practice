export default {
  namespaced: true,
  state: {
    usertoken:null,
    userinformation:null
  },
  getters: {
  },
  mutations: {
    UPDATE_AUTH_USER_TOKEN(state, val) {
        state.usertoken = val;
    },
    UPDATE_AUTH_USER_DATA(state, val) {
      state.userinformation = val;
    }
  },
  actions: {},
}
