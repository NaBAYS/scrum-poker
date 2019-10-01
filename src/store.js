import Vue from 'vue'
import Vuex from 'vuex'

import { isBoolean } from './assets/js/utils'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loaded: false,
    auth: null,
    drawer: true,
    alert: false,
    alertMessage: null,
    alertType: null
  },
  mutations: {
    setLogin (state, val) {
      state.auth = val
    },
    setLoaded (state, val) {
      state.loaded = val
    },
    setAlert (state, val) {
      state.alert = val
    },
    setAlertMessage (state, val) {
      state.alertMessage = val
    },
    setAlertType (state, val) {
      state.alertType = val
    },
    toggleDrawer (state) {
      state.drawer = !state.drawer
    }
  },
  actions: {
    login ({ commit }, val) {
      if (isBoolean(val)) {
        commit('setLogin', val)
      }
    },
    loaded ({ commit }, val) {
      commit('setLoaded', val)
    },
    alert ({ commit }, val) {
      commit('setAlert', val)
    },
    alertMessage ({ commit }, val) {
      commit('setAlertMessage', val)
    },
    alertType ({ commit }, val) {
      commit('setAlertType', val)
    },
    toggleDrawer ({ commit }) {
      commit('toggleDrawer')
    }
  }
})
