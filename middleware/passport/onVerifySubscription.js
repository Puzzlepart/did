const log = require('debug')('middleware/passport/onVerifySubscription')
const SubscriptionService = require('../../services/subscription')
const { NO_OID_FOUND, TENANT_NOT_ENROLLED } = require('./errors')

async function onVerifySubscription(_iss, _sub, profile, _accessToken, _refreshToken, params, done) {
    if (!profile.oid) {
        log('No oid found. Returning error NO_OID_FOUND.')
        return done(NO_OID_FOUND, null);
    }
    const subscription = await new SubscriptionService().getSubscription(profile._json.tid)
    if (!subscription) {
        log('No subscription found for %s', profile._json.tid)
        return done(TENANT_NOT_ENROLLED, null)
    }
    
    log('Subscription found for %s', profile._json.tid)
    profile['email'] = profile._json.preferred_username
    profile['subscription'] = subscription
    return done(null, { profile, oauthToken: params })
}

module.exports = onVerifySubscription
