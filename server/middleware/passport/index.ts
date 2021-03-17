import { MongoClient } from 'mongodb'
import passport from 'passport'
import { googleStrategy } from './google'
import { azureAdStrategy } from './microsoft'

/**
 * Setup passport to be used for authentication
 *
 * @param mcl - Mongo client
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
   */
  passport.serializeUser((user, done) => done(null, user))
  passport.deserializeUser((user, done) => done(null, user))

  passport.use(azureAdStrategy(mcl))
  passport.use(googleStrategy(mcl))

  return passport
}
