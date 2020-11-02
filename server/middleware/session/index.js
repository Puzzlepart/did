const session = require('express-session')
const connectAzureTables = require('connect-azuretables')(session)
const env = require('../../utils/env')
const log = require('debug')('middleware/session')

module.exports = session({
  name: env('SESSION_NAME', 'connect.sid'),
  store: connectAzureTables.create({
    table: 'Sessions',
    sessionTimeOut: parseInt(env('SESSION_TIMEOUT', '10080')),
    logger: log,
    errorLogger: log,
  }),
  secret: env('SESSION_SIGNING_KEY'),
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie: { secure: env('SESSION_SECURE', '0') === '1' },
  unset: 'destroy',
})
