import createDebug from 'debug'
const debug = createDebug('middleware/passport/onVerifySignin')
import SubscriptionService from '../../api/services/subscription'
import AzStorageService from '../../api/services/azstorage'
import { NO_OID_FOUND, TENANT_NOT_ENROLLED, USER_NOT_ENROLLED } from './errors'
import { IProfile } from 'passport-azure-ad/oidc-strategy'
import { VerifyCallback } from 'passport-azure-ad'

/**
 * On verify signin
 *
 * @param {string} _iss
 * @param {string} _sub
 * @param {IProfile} profile
 * @param {string} _accessToken
 * @param {string} _refreshToken
 * @param {any} oauthToken
 * @param {VerifyCallback} done
 */
export  async function onVerifySignin(
  _iss: string,
  _sub: string,
  profile: IProfile,
  _accessToken: string,
  _refreshToken: string,
  oauthToken: any,
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
    debug('Subscription found for %s', profile._json.tid)
    const user = await new AzStorageService({ subscription }).getUser(profile.oid)
    if (!user) {
      debug('User %s is not registered for %s', profile.oid, subscription.name)
      return done(USER_NOT_ENROLLED, null)
    }
    user.subscription = subscription
    user.oauthToken = oauthToken
    return done(null, user)
  } catch (error) {
    debug(error)
  }
}
