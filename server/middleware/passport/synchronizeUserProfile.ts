import createDebug from 'debug'
import get from 'get-value'
import { isEqual, pick } from 'underscore'
import { AzStorageService, MSGraphService } from '../../api/services'
const debug = createDebug('middleware/passport/synchronizeUserProfile')
const AD_USER_SYNC_PROPERTIES_KEY = 'settings.adsync.adUserSyncProperties'

/**
 * Synchronize user profile
 *
 * @param {Express.User} user
 * @param {any} subscription
 * @param {string} access_token
 */
export async function synchronizeUserProfile(
  user: Express.User,
  subscription: any,
  access_token: string
): Promise<void> {
  const properties = get(subscription, AD_USER_SYNC_PROPERTIES_KEY, { default: [] })
  if (properties.length > 0) {
    const data = await new MSGraphService(null, access_token).getCurrentUser(properties)
    const needSync = !isEqual(pick(user, ...properties), pick(data, ...properties))
    if (needSync) {
      debug('Synchronizing user profile properties %s from Azure AD.', properties.join(', '))
      await new AzStorageService({ subscription }).addOrUpdateUser(
        pick(data, 'id', ...properties),
        true
      )
      debug('User profile properties synchronized from Azure AD.')
    } else {
      debug('User profile properties are up to date!')
    }
  } else {
    debug('User profile synchronization is turned on, but no properties are selected.')
  }
}
