import { createClient as createRedisClient } from 'redis'
import { environment } from '../../utils'
const debug = require('debug')('middleware:redis')

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
const configuredPort = Number(environment('REDIS_CACHE_PORT', '6379'))
// Optional dedicated SSL port env (not required). Azure Redis commonly uses 6380 for TLS.
const configuredSslPort = Number(process.env.REDIS_CACHE_SSL_PORT || '6380')
const redisKey = environment('REDIS_CACHE_KEY')
const redisHostname = environment('REDIS_CACHE_HOSTNAME')

// If we have a key (managed Redis) and user left port at default 6379 while SSL is needed, switch to SSL port.
// Allow explicit override by setting REDIS_CACHE_PORT to something else or providing REDIS_CACHE_SSL_PORT.
const effectivePort =
  redisKey && configuredPort === 6379 ? configuredSslPort : configuredPort

if (!redisHostname) {
  debug('No REDIS_CACHE_HOSTNAME provided. Redis client will not be created.')
}

debug(
  'Initializing Redis client host=%s port=%d tls=%s fallbackPortLogic=%s',
  redisHostname,
  effectivePort,
  !!redisKey,
  configuredPort === effectivePort ? 'as-configured' : 'switched-to-ssl-port'
)

export const redisMiddlware = redisHostname
  ? createRedisClient(effectivePort, redisHostname, {
      ...(redisKey && { auth_pass: redisKey }),
      ...(redisKey && {
        tls: {
          servername: redisHostname
        }
      }),
      socket_keepalive: true
    })
  : ({
      get: (_key: string, callback: (error: Error | null, reply: any) => void) =>
        callback(new Error('Redis not configured'), null),
      setex: (
        _key: string,
        _seconds: number,
        _value: string,
        callback: (error: Error | null, reply: any) => void
      ) => callback(new Error('Redis not configured'), null),
      del: (
        _keys: string | string[],
        callback: (error?: Error | null, reply?: any) => void
      ) => callback?.(new Error('Redis not configured'), null)
    } as any)
