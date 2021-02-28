import { createClient as createRedisClient } from 'redis'
import environment from '../../utils/environment'

/**
 * Redis client
 *
 * - Using hosname from env REDIS_CACHE_HOSTNAME
 * - Using auth_pass from env REDIS_CACHE_KEY
 * - Using tls.servername from env REDIS_CACHE_HOSTNAME
 * - Using socket_keepalive to true
 *
 * @see https://github.com/Puzzlepart/did/issues/812
 */
export const redisMiddlware = createRedisClient(
  6380,
  environment('REDIS_CACHE_HOSTNAME'),
  {
    auth_pass: environment('REDIS_CACHE_KEY'),
    tls: {
      servername: environment('REDIS_CACHE_HOSTNAME')
    },
    socket_keepalive: true
  }
)
