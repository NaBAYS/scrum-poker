// authentication middleware
export default (to, from, next) => {
  if (firebase.auth().currentUser) {
    next()
  } else {
    console.error('user not logged in')
  }
}
