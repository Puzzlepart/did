const session = require('express-session')
const connectAzureTables = require('connect-azuretables')(session)
const env = require('../../utils/env')

const store = connectAzureTables.create({
  table: 'Sessions',
  sessionTimeOut: 10080,
})

module.exports = session({
  store: store,
  secret: env('SESSION_SIGNING_KEY'),
  resave: false,
  saveUninitialized: false,
  rolling: true,
})
