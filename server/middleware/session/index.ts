
/* eslint-disable @typescript-eslint/no-var-requires */
import session from 'express-session'
import { createClient as createRedisClient } from 'redis'
import env from '../../utils/env'
const RedisStore = require('connect-redis')(session)
const client = createRedisClient(6380, env('REDIS_CACHE_HOSTNAME'), {
  auth_pass: env('REDIS_CACHE_KEY'),
  tls: {
    servername: env('REDIS_CACHE_HOSTNAME')
  }
})

/**
 * Defines session configuration; we use Redis for the session store.
 * "secret" will be used to create the session ID hash (the cookie id and the redis key value)
 * "name" will show up as your cookie name in the browser
 * "cookie" is provided by default; you can add it to add additional personalized options
 * The "store" ttl is the expiration time for each Redis session ID, in seconds
 */
export default session({
  name: env('SESSION_NAME', 'connect.sid'),
  store: new RedisStore({
    client,
    ttl: 1209600
  }),
  cookie: { secure: false },
  secret: env('SESSION_SIGNING_KEY'),
  resave: false,
  saveUninitialized: false,
  rolling: false
})
