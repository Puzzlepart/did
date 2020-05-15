const StorageService = require('../../services/storage')
const { NO_OID_FOUND, TENANT_NOT_ENROLLED } = require('./errors')

async function onVerifySubscription(_iss, _sub, profile, _accessToken, _refreshToken, params, done) {
    if (!profile.oid) return done(NO_OID_FOUND, null)
    const sub = await new StorageService(profile._json.tid).getSubscription()
    if (!sub) return done(TENANT_NOT_ENROLLED, null)
    profile['email'] = profile._json.preferred_username
    profile['sub'] = sub.name
    return done(null, { profile, oauthToken: params })
}

module.exports = onVerifySubscription