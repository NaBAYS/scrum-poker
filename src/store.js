import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    auth: null
  },
  mutations: {
    login (state, val) {
      if (typeof val === 'boolean') {
        state.auth = val
      } else {
        console.error('Login payload must be a boolean, the following value was passed: ', val)
      }
    }
  },
  actions: {

  }
})
