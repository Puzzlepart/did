const passport = require('passport');
const OIDCStrategy = require('passport-azure-ad').OIDCStrategy;
const StorageService = require('../../services/storage');

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser(async (user, done) => {
    if (!user.data) {
        user.data = await new StorageService(user.profile._json.tid).getUser(user.profile.oid);
    } if (user.data) {
        done(null, user);
    } else {
        let error = new Error();
        error.name = 'USER_NOT_ENROLLED';
        error.message = 'You\'re not enrolled in Did 365. Please contact your system owner.';
        done(error, null);
    }
});

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
);

passport.use(strategy);

module.exports = passport;