function isBoolean (val) {
  if (typeof val === 'boolean') {
    return true
  } else {
    console.error('Login payload must be a boolean, the following value was passed: ', val)
    return false
  }
}

export { isBoolean }
