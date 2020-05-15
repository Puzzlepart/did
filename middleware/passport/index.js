const passport = require('passport')
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy
const SubscriptionService = require('../../services/subscription')
const { USER_NOT_ENROLLED } = require('./errors')

passport.serializeUser((user, done) => {
    done(null, user)
})

passport.deserializeUser(async (user, done) => {
    try {
        if (!user.data) user.data = await new SubscriptionService().getUser(user.profile._json.tid, user.profile.oid)
        done(null, user)
    } catch (e) {
        done(USER_NOT_ENROLLED, null)
    }
})

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
    require('./onVerifySubscription'),
)

passport.use(strategy)

module.exports = passport