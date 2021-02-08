/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import session from 'express-session'
import redis from 'redis'
import env from '../../utils/env'
const RedisStore = require('connect-redis')(session)
const client = redis.createClient(
  6380,
  env('REDIS_CACHE_HOSTNAME'),
  {
    auth_pass: env('REDIS_CACHE_KEY'),
    tls: {
      servername: env('REDIS_CACHE_HOSTNAME')
    }
  }
)


export default session({
  name: env('SESSION_NAME', 'connect.sid'),
  store: new RedisStore({ client }),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  rolling: false
})
