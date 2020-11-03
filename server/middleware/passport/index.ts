import fs from 'fs'
import passport from 'passport'
import onVerifySignin from './onVerifySignin'
import { OIDCStrategy } from 'passport-azure-ad'
import env from '../../utils/env'

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser((user, done) => done(null, user))

/**
 * Get redirect URL
 */
function getRedirectUrl() {
  let redirectUrl = env('OAUTH_REDIRECT_URI')
  if (env('LOCALTUNNEL_SUBDOMAIN')) {
    const _redirectUrl = fs.readFileSync('.localtunnel', 'utf-8')
    if (_redirectUrl) {
      redirectUrl = _redirectUrl
    }
  }
  return redirectUrl
}

const strategy = () => {
  const redirectUrl = getRedirectUrl()
  return new OIDCStrategy(
    {
      identityMetadata: `${env('OAUTH_AUTHORITY')}${env('OAUTH_ID_METADATA')}`,
      clientID: env('OAUTH_APP_ID'),
      responseType: env('OAUTH_RESPONSE_TYPE'),
      responseMode: env('OAUTH_RESPONSE_MODE'),
      redirectUrl,
      allowHttpForRedirectUrl: true,
      clientSecret: env('OAUTH_APP_PASSWORD'),
      validateIssuer: false,
      passReqToCallback: false,
      scope: env('OAUTH_SCOPES').split(' '),
    },
    onVerifySignin
  )
}

passport.use(strategy())

export default passport
