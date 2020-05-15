const StorageService = require('../../services/storage')

async function onVerifySubscription(_iss, _sub, profile, _accessToken, _refreshToken, params, done) {
    if (!profile.oid) {
        let error = new Error()
        error.name = 'NO_OID_FOUND'
        error.message = 'An error occured attempting to sign you in.'
        error.status = 401;
        return done(error, null)
    }
    const sub = await new StorageService(profile._json.tid).getSubscription()
    if (!sub) {
        let error = new Error()
        error.name = 'TENANT_NOT_ENROLLED'
        error.message = 'Your company is not enrolled in Did 365. Please contact did@puzzlepart.com.'
        error.status = 401;
        return done(error, null)
    }
    profile['email'] = profile._json.preferred_username
    profile['sub'] = sub.name
    return done(null, { profile, oauthToken: params })
}

module.exports = onVerifySubscription