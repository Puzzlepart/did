import session from 'express-session'
import env from '../../utils/env'
import createDebug from 'debug'
const debug = createDebug('middleware/session')
// eslint-disable-next-line @typescript-eslint/no-var-requires
const connectAzureTables = require('connect-azuretables')(session)

export default session({
  name: env('SESSION_NAME', 'connect.sid'),
  store: connectAzureTables.create({
    table: 'Sessions',
    sessionTimeOut: parseInt(env('SESSION_TIMEOUT', '10080')),
    logger: debug,
    errorLogger: debug
  }),
  secret: env('SESSION_SIGNING_KEY'),
  resave: false,
  saveUninitialized: false,
  rolling: false,
  cookie: { secure: env('SESSION_SECURE', '0') === '1' },
  unset: 'destroy'
})
