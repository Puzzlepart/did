// eslint-disable-next-line @typescript-eslint/no-var-requires
const log = require('debug')('middleware/passport/onVerifySignin')
import SubscriptionService from '../../services/subscription'
import AzStorageService from '../../services/azstorage'
import { NO_OID_FOUND, TENANT_NOT_ENROLLED, USER_NOT_ENROLLED } from './errors'

async function onVerifySignin(_iss, _sub, profile, _accessToken, _refreshToken, oauthToken, done) {
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
  const user = await new AzStorageService(subscription).getUser(profile.oid)
  if (!user) {
    log('User %s is not registered for %s', profile.oid, subscription.name)
    return done(USER_NOT_ENROLLED, null)
  }
  user.subscription = subscription
  user.oauthToken = oauthToken
  return done(null, user)
}

export default onVerifySignin
