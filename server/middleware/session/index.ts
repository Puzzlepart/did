/* eslint-disable @typescript-eslint/no-var-requires */
import session from 'express-session'
import env from '../../utils/env'
import { RedisClient } from '../redis'
const RedisStore = require('connect-redis')(session)

/**
 * Defines session configuration; we use Redis for the session store.
 * "secret" will be used to create the session ID hash (the cookie id and the redis key value)
 * "name" will show up as your cookie name in the browser
 * "cookie" is provided by default; you can add it to add additional personalized options
 * The "store" ttl is the expiration time for each Redis session ID, in seconds
 */
export const redisSession = session({
  name: env('SESSION_NAME', 'connect.sid'),
  store: new RedisStore({
    client: RedisClient,
    ttl: 1209600
  }),
  cookie: { secure: false },
  secret: env('SESSION_SIGNING_KEY'),
  resave: false,
  saveUninitialized: false,
  rolling: false
})
