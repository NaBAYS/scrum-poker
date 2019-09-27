import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import './assets/js/firebase'
import vuetify from './plugins/vuetify'

window.Vue = Vue
window.store = store

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')

// Set auth
const user = firebase.auth().currentUser

if (user) {
  store.commit('login', true)
} else {
  store.commit('login', false)
}
