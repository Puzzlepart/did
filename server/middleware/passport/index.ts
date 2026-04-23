import { MongoClient } from 'mongodb'
import passport from 'passport'
import { googleStrategy } from './google'
import { azureAdStrategy } from './microsoft'

/**
 * Trim the full user object down to the minimal set of fields that are
 * actually read from `request.user` during request handling. This is the
 * shape that gets written to the Redis-backed session store.
 *
 * Fields intentionally excluded (not read from `request.user`):
 * - givenName, surname, jobTitle, mobilePhone, preferredLanguage (profile-only)
 * - displayName (only used on Graph user objects, not session)
 *
 * @param user - Full user object from passport verify callback
 * @returns Minimal session-safe user shape
 */
export function pickSessionFields(user: Record<string, unknown>): Express.User {
  return {
    id: user.id as string | undefined,
    mail: user.mail as string | undefined,
    provider: user.provider as string | undefined,
    role: user.role as { name?: string; permissions?: string[] } | undefined,
    subscription: user.subscription as
      | { id: string; name: string; db?: string; settings?: Record<string, unknown> }
      | undefined,
    configuration: user.configuration as
      | string
      | Record<string, unknown>
      | undefined,
    tokenParams: user.tokenParams as Record<string, unknown> | undefined
  }
}

/**
 * Setup passport to be used for authentication
 *
 * @param mcl - Mongo client
 *
 * @category Express middleware
 */
export const passportMiddleware = (mcl: MongoClient) => {
  /**
   * In a typical web application, the credentials used to authenticate
   * a user will only be transmitted during the login request. If
   * authentication succeeds, a session will be established and maintained
   * via a cookie set in the user's browser.
   * Each subsequent request will not contain credentials, but rather the
   * unique cookie that identifies the session. In order to support login sessions,
   * Passport will serialize and deserialize user instances to and from the session.
   *
   * pickSessionFields trims the user object to a minimal shape before writing
   * to the Redis-backed session store, reducing payload size.
   */
  passport.serializeUser((user: any, done) => {
    done(null, pickSessionFields(user))
  })
  passport.deserializeUser((user, done) => done(null, user as Express.User))

  passport.use(azureAdStrategy(mcl))
  passport.use(googleStrategy(mcl))

  return passport
}
