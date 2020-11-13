import createDebug from 'debug'
const debug = createDebug('middleware/passport/onVerifySignin')
import { SubscriptionService, AzStorageService, MSGraphService } from '../../api/services'
import { NO_OID_FOUND, TENANT_NOT_ENROLLED, USER_NOT_ENROLLED } from './errors'
import { IProfile } from 'passport-azure-ad/oidc-strategy'
import { VerifyCallback } from 'passport-azure-ad'
import { isEqual, pick } from 'underscore'
import get from 'get-value'

const AD_USER_SYNC_ENABLED_KEY = 'settings.adsync.adUserSyncEnabled'
const AD_USER_SYNC_PROPERTIES_KEY = 'settings.adsync.adUserSyncProperties'

/**
 * Synchronize user profile
 *
 * @param {Express.User} user
 * @param {any} subscription
 * @param {string} access_token
 */
async function synchronizeUserProfile(user: Express.User, subscription: any, access_token: string): Promise<void> {
  const data = await new MSGraphService(null, access_token).getCurrentUser()
  const properties = get(subscription, AD_USER_SYNC_PROPERTIES_KEY, { default: [] })
  if (properties.length > 0) {
    const needSync = !isEqual(pick(user, ...properties), pick(data, ...properties))
    if (needSync) {
      debug('Synchronizing user profile properties %s from Azure AD.', properties.join(', '))
      await new AzStorageService({ subscription }).addOrUpdateUser(pick(data, 'id', ...properties), true)
      debug('User profile properties synchronized from Azure AD.')
    } else {
      debug('User profile properties are up to date!')
    }
  } else {
    debug('User profile synchronization is turned on, but no properties are selected.')
  }
}

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
    debug('Subscription found for %s', profile._json.tid)
    const user: Express.User = await new AzStorageService({ subscription }).getUser(profile.oid)
    if (!user) {
      debug('User %s is not registered for %s', profile.oid, subscription.name)
      return done(USER_NOT_ENROLLED, null)
    }
    if (get(subscription, AD_USER_SYNC_ENABLED_KEY, { default: false })) {
      await synchronizeUserProfile(user, subscription, tokenParams.access_token)
    }
    user.subscription = subscription
    user.tokenParams = tokenParams
    return done(null, user)
  } catch (error) {
    debug(error)
    return done(error, null)
  }
}
