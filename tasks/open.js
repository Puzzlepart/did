require('dotenv').config()
const open = require('open')

setTimeout(() => {
  open(new URL(process.env.OAUTH_REDIRECT_URI).origin)
}, 5000)
