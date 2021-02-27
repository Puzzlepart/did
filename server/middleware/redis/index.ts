import { createClient as createRedisClient } from 'redis'
import env from '../../utils/env'

/**
 * Redis client
 */
export const RedisClient = createRedisClient(
  6380,
  env('REDIS_CACHE_HOSTNAME'),
  {
    auth_pass: env('REDIS_CACHE_KEY'),
    tls: {
      servername: env('REDIS_CACHE_HOSTNAME')
    },
    socket_keepalive: true
  }
)
