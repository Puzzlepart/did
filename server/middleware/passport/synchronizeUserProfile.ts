import createDebug from 'debug'
import { isEmpty, isEqual, pick } from 'underscore'
import { MSGraphService, UserService } from '../../services'
import OAuthService from '../../services/oauth'
const debug = createDebug('middleware/passport/synchronizeUserProfile')

/**
 * Synchronize user profile
 *
 * @param user - User
 * @param userSrv - User service
 */
export async function synchronizeUserProfile(
  user: Express.User,
  userSrv: UserService
): Promise<void> {
  const properties = user?.subscription?.settings?.adsync?.properties || []
  if (!isEmpty(properties)) {
    const msgraphSrv = new MSGraphService(new OAuthService({ user }))
    const data = await msgraphSrv.getCurrentUser(properties)
    const needSync = !isEqual(
      pick(user, ...properties),
      pick(data, ...properties)
    )
    if (needSync) {
      debug(
        'Synchronizing user profile properties %s from Azure AD.',
        properties.join(', ')
      )
      await userSrv.updateUser({
        id: user.id,
        ...pick(data, properties)
      })
      debug('User profile properties synchronized from Azure AD.')
    } else {
      debug('User profile properties are up to date!')
    }
  } else {
    debug(
      'User profile synchronization is turned on, but no properties are selected.'
    )
  }
}
