import passport from 'passport';
import { OIDCStrategy } from 'passport-azure-ad';
import { StorageService } from '../../services/storage';

passport.serializeUser((user, done) => { done(null, user) });

passport.deserializeUser(async (user: any, done: any) => {
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
        responseType: process.env.OAUTH_RESPONSE_TYPE as any,
        responseMode: process.env.OAUTH_RESPONSE_MODE as any,
        redirectUrl: process.env.OAUTH_REDIRECT_URI as any,
        allowHttpForRedirectUrl: true,
        clientSecret: process.env.OAUTH_APP_PASSWORD as any,
        validateIssuer: false,
        passReqToCallback: false,
        scope: process.env.OAUTH_SCOPES.split(' ')
    },
    require('./onVerifySubscription'),
);

passport.use(strategy);


export { isAdmin } from './isAdmin';
export { isAuthenticated } from './isAuthenticated';
export { onVerifySubscription } from './onVerifySubscription';
export default passport;