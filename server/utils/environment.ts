import s from 'underscore.string'
const debug = require('debug')('environment')

type EnvironmentParseOptions = {
  /**
   * Split value by the given string.
   */
  splitBy?: string

  /**
   * Parse value as boolean. `1` is `true`, everything else is `false`.
   */
  isSwitch?: boolean
}

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
  APOLLO_SCHEMA_REPORTING_SEND_REPORTS_IMMEDIATELY: string
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
  GITHUB_APPID: string
  GITHUB_INSTALLATION_ID: string
  GITHUB_CLIENT_ID: string
  GITHUB_CLIENT_SECRET: string
  GITHUB_PRIVATE_KEY: string
  GITHUB_FEEDBACK_OWNER: string
  GITHUB_FEEDBACK_REPO: string
  GITHUB_FEEDBACK_REPORTER_INFO: string
  GITHUB_FEEDBACK_REPORTER_GITHUB_USER_INFO: string
  MAINTENANCE_MODE: string
  MAINTENANCE_MESSAGE: string
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
  if (s.isBlank(value)) {
    debug(
      'Missing environment variable %s. Using %s instead.',
      key,
      fallbackValue
    )
    return fallbackValue as T
  }
  if (options.splitBy) return value.split(options.splitBy) as unknown as T
  if (options.isSwitch)
    return (value === '1' || value?.toLowerCase() === 'true') as unknown as T
  return value as unknown as T
}
