const session = require('express-session')
const connectAzureTables = require('connect-azuretables')(session)
const env = require('../../utils/env')

module.exports = session({
  name: env('SESSION_NAME'),
  store: connectAzureTables.create({
    table: 'Sessions',
    sessionTimeOut: parseInt(env('SESSION_TIMEOUT', '10080'))
  }),
  secret: env('SESSION_SIGNING_KEY'),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { secure: env('SESSION_SECURE') === '1' }
})
