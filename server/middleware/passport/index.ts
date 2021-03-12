/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'
import { MongoClient } from 'mongodb'
import passport from 'passport'
import { IProfile, OIDCStrategy, VerifyCallback } from 'passport-azure-ad'
import { environment } from '../../utils'
import { onVerifySignin } from './onVerifySignin'

/**
 * Get redirect URL
 */
function getRedirectUrl() {
  let redirectUrl = environment('OAUTH_REDIRECT_URI')
  if (environment('LOCALTUNNEL_SUBDOMAIN')) {
    const _redirectUrl = fs.readFileSync('.localtunnel', 'utf-8')
    if (_redirectUrl) {
      redirectUrl = _redirectUrl
    }
  }
  return redirectUrl
}

/**
 * Setup passport to be used for authentication
 *
 * @param mongoClient - Mongo client
 */
export const passportMiddleware = (mongoClient: MongoClient) => {
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

  /**
   * OIDCStrategy uses OpenID Connect protocol for web application login purposes.
   * It works in the following manner:
   * If a user is not logged in, passport sends an authentication request to
   * AAD (Azure Active Directory), and AAD prompts the user for his or her sign-in
   * credentials. On successful authentication, depending on the flow you choose,
   * web application will eventually get an id_token back either directly
   * from the AAD authorization endpoint or by redeeming a code at the AAD
   * token endpoint. Passport then validates the id_token and propagates
   * the claims in id_token back to the verify callback, and let the framework
   * finish the remaining authentication procedure. If the whole process is
   * successful, passport adds the user information to req.user and passes it
   * to the next middleware. In case of error, passport either sends back an
   * unauthorized response or redirects the user to the page you specified
   * (such as homepage or login page).
   */
  const strategy = () => {
    const redirectUrl = getRedirectUrl()
    return new OIDCStrategy(
      {
        identityMetadata:
          'https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration',
        clientID: environment('OAUTH_APP_ID'),
        responseType: 'code id_token',
        responseMode: 'form_post',
        redirectUrl,
        allowHttpForRedirectUrl: true,
        clientSecret: environment('OAUTH_APP_PASSWORD'),
        validateIssuer: false,
        passReqToCallback: false,
        scope: environment('OAUTH_SCOPES').split(' ')
      },
      (
        _iss: string,
        _sub: string,
        profile: IProfile,
        _accessToken: string,
        _refreshToken: string,
        tokenParameters: any,
        done: VerifyCallback
      ) => onVerifySignin(mongoClient, profile, tokenParameters, done)
    )
  }

  passport.use(strategy())
  return passport
}
