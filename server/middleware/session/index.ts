import session from 'express-session'
import env from '../../utils/env'
// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('debug')('middleware/session')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectAzureTables = require('connect-azuretables')(session)

export default session({
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
