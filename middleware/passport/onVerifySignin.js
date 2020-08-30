const log = require('debug')('middleware/passport/onVerifySignin')
const SubscriptionService = require('../../services/subscription')
const StorageService = require('../../services/storage')
const {pick} = require('underscore')
const { NO_OID_FOUND, TENANT_NOT_ENROLLED, USER_NOT_ENROLLED } = require('./errors')

async function onVerifySignin(_iss, _sub, profile, _accessToken, _refreshToken, params, done) {
    if (!profile.oid) {
        log('No oid found. Returning error NO_OID_FOUND.')
        return done(NO_OID_FOUND, null)
    }
    const subscription = await SubscriptionService.getSubscription(profile._json.tid)
    if (!subscription) {
        log('No subscription found for %s', profile._json.tid)
        return done(TENANT_NOT_ENROLLED, null)
    }
    log('Subscription found for %s', profile._json.tid)
    let user = await new StorageService(subscription).getUser(profile.oid)
    if (!user) {
        log('User %s is not registered for %s', profile.oid, subscription.name)
        return done(USER_NOT_ENROLLED, null)
    }
    user = {
        id: profile.oid,
        tenantId: profile._json.tid,
        locale: user.userLanguage,
        profile: pick(profile, 'displayName', 'email'),
        subscription,
        oauthToken: params,
    }
    return done(null, user)
}

module.exports = onVerifySignin
