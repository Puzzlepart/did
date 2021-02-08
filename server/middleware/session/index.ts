/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/no-var-requires */
import session from 'express-session'
import { createClient as createRedisClient } from 'redis'
import env from '../../utils/env'
import ConnectRedis from 'connect-redis'
const RedisStore = ConnectRedis(session)
const client = createRedisClient(6380, env('REDIS_CACHE_HOSTNAME'), {
  auth_pass: env('REDIS_CACHE_KEY'),
  tls: {
    servername: env('REDIS_CACHE_HOSTNAME')
  }
})

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
