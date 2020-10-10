const fs = require('fs')
const passport = require('passport')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const { USER_NOT_ENROLLED } = require('./errors')
const env = require('../../utils/env')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser(async (user, done) => done(null, user))

/**
 * Get redirect URL
 */
function getRedirectUrl() {
  let redirectUrl = env('OAUTH_REDIRECT_URI')
  if (env('LOCALTUNNEL_SUBDOMAIN')) {
    let _redirectUrl = fs.readFileSync('.localtunnel', 'utf-8')
    if (_redirectUrl) {
      redirectUrl = _redirectUrl
    }
  }
  return redirectUrl
}

const strategy = () => {
  const onVerifySignin = require('./onVerifySignin')
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

module.exports = passport
