const passport = require('passport')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const { USER_NOT_ENROLLED } = require('./errors')

passport.serializeUser((user, done) => done(null, user))
passport.deserializeUser(async (user, done) => done(null, user))

const strategy = new OIDCStrategy(
    {
        identityMetadata: `${process.env.OAUTH_AUTHORITY}${process.env.OAUTH_ID_METADATA}`,
        clientID: process.env.OAUTH_APP_ID,
        responseType: process.env.OAUTH_RESPONSE_TYPE,
        responseMode: process.env.OAUTH_RESPONSE_MODE,
        redirectUrl: process.env.OAUTH_REDIRECT_URI,
        allowHttpForRedirectUrl: true,
        clientSecret: process.env.OAUTH_APP_PASSWORD,
        validateIssuer: false,
        passReqToCallback: false,
        scope: process.env.OAUTH_SCOPES.split(' ')
    },
    require('./onVerifySignin'),
)

passport.use(strategy)

module.exports = passport