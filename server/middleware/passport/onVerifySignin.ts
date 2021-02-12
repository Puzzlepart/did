import createDebug from 'debug'
import get from 'get-value'
import { VerifyCallback } from 'passport-azure-ad'
import { IProfile } from 'passport-azure-ad/oidc-strategy'
import { AzStorageService, SubscriptionService } from '../../api/services'
import { NO_OID_FOUND, TENANT_NOT_ENROLLED, USER_NOT_ENROLLED } from './errors'
import { synchronizeUserProfile } from './synchronizeUserProfile'
const debug = createDebug('middleware/passport/onVerifySignin')
const AD_USER_SYNC_ENABLED_KEY = 'settings.adsync.adUserSyncEnabled'

/**
 * On verify signin
 *
 * @param {string} _iss
 * @param {string} _sub
 * @param {IProfile} profile
 * @param {string} _accessToken
 * @param {string} _refreshToken
 * @param {any} tokenParams
 * @param {VerifyCallback} done
 */
export default async function onVerifySignin(
  _iss: string,
  _sub: string,
  profile: IProfile,
  _accessToken: string,
  _refreshToken: string,
  tokenParams: any,
  done: VerifyCallback
) {
  try {
    if (!profile.oid) {
      debug('No oid found. Returning error NO_OID_FOUND.')
      return done(NO_OID_FOUND, null)
    }
    const subscription = await new SubscriptionService().getSubscription(profile._json.tid)
    if (!subscription) {
      debug('No subscription found for %s', profile._json.tid)
      return done(TENANT_NOT_ENROLLED, null)
    }
    const azstorage = new AzStorageService({ subscription })
    debug('Subscription found for %s', profile._json.tid)
    const user: Express.User = await azstorage.getUser(profile.oid)
    if (!user) {
      debug('User %s is not registered for %s', profile.oid, subscription.name)
      return done(USER_NOT_ENROLLED, null)
    }
    debug('User %s found in subscription %s', user.id, subscription.name)
    if (get(subscription, AD_USER_SYNC_ENABLED_KEY, { default: false })) {
      await synchronizeUserProfile(user, subscription, tokenParams.access_token)
    }
    user.role = await azstorage.getRoleByName(user.role)
    user.subscription = subscription
    user.tokenParams = tokenParams
    debug('Sign in for %s succesfully verified', user.id)
    return done(null, user)
  } catch (error) {
    return done(error, null)
  }
}
