require('dotenv').config()
const fs = require('fs')
const open = require('open')

setTimeout(() => {
  let localtunnel = fs.readFileSync('.localtunnel', 'utf-8')
  let redirectUrl = localtunnel || process.env.OAUTH_REDIRECT_URI
  open(new URL(redirectUrl).origin)
}, 5000)
