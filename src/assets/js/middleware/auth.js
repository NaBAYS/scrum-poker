import store from '../../../store'

function auth (to, from, next) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      next()
      store.dispatch('alert', false)
    } else {
      next('/')
      store.dispatch('alertType', 'error')
      store.dispatch('alertMessage', 'Please login to view this page.')
      store.dispatch('alert', true)
    }
  })
}

function noAuth (to, from, next) {
  firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      next('/')
    } else {
      next()
      store.dispatch('alert', false)
    }
  })
}

export { auth, noAuth }
