/* eslint-disable @typescript-eslint/no-var-requires */
require('dotenv').config()
const fs = require('fs')
const open = require('open')

if (process.env.NO_BROWSER === '1') return

setTimeout(() => {
  let localtunnel = fs.readFileSync('.localtunnel', 'utf-8')
  let redirectUrl = localtunnel || process.env.MICROSOFT_REDIRECT_URI
  open(process.env.OPEN_URL || new URL(redirectUrl).origin)
}, process.env.OPEN_DELAY ? parseInt(process.env.OPEN_DELAY) * 1000 : 5000)
