import { createClient as createRedisClient } from 'redis'
import { environment } from '../../utils'

/**
 * Redis client
 *
 * - Using `hostname` from env `REDIS_CACHE_HOSTNAME`
 * - Using `port` from env `REDIS_CACHE_PORT` (defaults to 6379)
 * - Using `auth_pass` from env `REDIS_CACHE_KEY` (optional for local development)
 * - Using `tls.servername` from env `REDIS_CACHE_HOSTNAME` (only when REDIS_CACHE_KEY is provided)
 * - Using `socket_keepalive` to true
 *
 * @see https://github.com/Puzzlepart/did/issues/812
 *
 * @category Express middleware
 */
const redisPort = Number.parseInt(environment('REDIS_CACHE_PORT', '6379'), 10)
const redisKey = environment('REDIS_CACHE_KEY')
const redisHostname = environment('REDIS_CACHE_HOSTNAME')

export const redisMiddlware = createRedisClient(
  redisPort,
  redisHostname,
  {
    ...(redisKey && { auth_pass: redisKey }),
    ...(redisKey && {
      tls: {
        servername: redisHostname
      }
    }),
    socket_keepalive: true
  }
)
