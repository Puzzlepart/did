/* eslint-disable @typescript-eslint/no-unused-vars */
import fs from 'fs'
import { MongoClient } from 'mongodb'
import passport from 'passport'
import { IProfile, OIDCStrategy, VerifyCallback } from 'passport-azure-ad'
import { Strategy as GoogleStrategyOAuth2 } from 'passport-google-oauth20'
import { environment } from '../../utils'
import { onVerifySigninGoogle, onVerifySigninMicrosoft } from './onVerifySignin'

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

  const azureAdStrategy = () => {
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
      ) => onVerifySigninMicrosoft(mongoClient, profile, tokenParameters, done)
    )
  }

  const googleStrategy = () => {
    return new GoogleStrategyOAuth2(
      {
        clientID: environment('GOOGLE_CLIENT_ID'),
        clientSecret: environment('GOOGLE_CLIENT_SECRET'),
        callbackURL: environment('GOOGLE_REDIRECT_URI')
      },
      (accessToken, _refreshToken, profile, done) =>
        onVerifySigninGoogle(mongoClient, accessToken, profile, done)
    )
  }

  passport.use(azureAdStrategy())
  passport.use(googleStrategy())

  return passport
}
