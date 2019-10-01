import './assets/js/firebase'

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import vuetify from './plugins/vuetify'

Vue.config.productionTip = false

window.Vue = new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
  created: () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        store.dispatch('login', true)
      } else {
        store.dispatch('login', false)
      }

      if (!store.state.loaded) {
        store.dispatch('loaded', true)
      }
    })
  }
}).$mount('#app')
