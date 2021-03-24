import createDebug from 'debug'
import { isBlank } from 'underscore.string'
const debug = createDebug('environment')

type EnvironmentParseOptions = { splitBy?: string }

type Environment = {
  AUTH_PROVIDERS: string
  MICROSOFT_CLIENT_ID: string
  MICROSOFT_CLIENT_SECRET: string
  MICROSOFT_REDIRECT_URI: string
  MICROSOFT_SCOPES: string
  GOOGLE_CLIENT_ID: string
  GOOGLE_CLIENT_SECRET: string
  GOOGLE_REDIRECT_URI: string
  GOOGLE_SCOPES: string
  PORT: string
  NODE_ENV: string
  MICROSOFT_SIGNIN_PROMPT: string
  SESSION_NAME: string
  SESSION_SIGNING_KEY: string
  REDIS_CACHE_HOSTNAME: string
  REDIS_CACHE_KEY: string
  APOLLO_KEY: string
  APOLLO_GRAPH_VARIANT: string
  APOLLO_SCHEMA_REPORTING: string
  NO_BROWSER: string
  OPEN_DELAY: string
  CLIENT_LOG_LEVEL: string
  API_TOKEN_SECRET: string
  WEBPACK_NOTIFICATIONS_SUPPRESSSUCCESS: string
  WEBPACK_NOTIFICATIONS_SHOWDURATION: string
  WEBPACK_NOTIFICATIONS_SOUND: string
  MONGO_DB_CONNECTION_STRING: string
  MONGO_DB_DB_NAME: string
  LOCALTUNNEL_SUBDOMAIN: string
  GITHUB_TOKEN: string
  GITHUB_FEEDBACK_REPO: string
  GITHUB_FEEDBACK_ENABLED: string
}

/**
 * Get environment variable by key with optional fallback value
 *
 * Makes it easier to work with `process.env` giving a type
 * (`Environment`) for the available environment keys
 *
 * @remarks Logs missing environment variables using the
 * [debug](https://www.npmjs.com/package/debug) module
 *
 * @param key - Key
 * @param fallbackValue - Fallback vaue if key is not found
 * @param options - options
 */
export function environment<T = string>(
  key: keyof Environment,
  fallbackValue?: T,
  options: EnvironmentParseOptions = {}
): T {
  const value = process.env[key]
  if (isBlank(value)) {
    debug(
      'Missing environment variable %s. Using %s instead.',
      key,
      fallbackValue
    )
    return (fallbackValue as unknown) as T
  }
  if (options.splitBy) return (value.split(options.splitBy) as unknown) as T
  return (value as unknown) as T
}
