import { createClient as createRedisClient } from 'redis'
import env from '../../utils/env'

export default createRedisClient(6380, env('REDIS_CACHE_HOSTNAME'), {
  auth_pass: env('REDIS_CACHE_KEY'),
  tls: {
    servername: env('REDIS_CACHE_HOSTNAME')
  },
  socket_keepalive: true
})
