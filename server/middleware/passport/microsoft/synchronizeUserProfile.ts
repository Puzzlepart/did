import createDebug from 'debug'
import { isEmpty, isEqual, pick } from 'underscore'
import { User } from '../../../graphql'
import { MSGraphService, UserService } from '../../../services'
import MSOAuthService from '../../../services/msoauth'
const debug = createDebug('middleware/passport/synchronizeUserProfile')

/**
 * Synchronize user profile properties and user photo based
 * on subscription settings.
 *
 * @param user - User
 * @param userSvc - User service
 */
export async function synchronizeUserProfile(
  user: User,
  userSvc: UserService
): Promise<void> {
  const { properties, syncUserPhoto } = user?.subscription?.settings?.adsync
  if (isEmpty(properties)) {
    debug(
      'User profile synchronization is turned on, but no properties are selected.'
    )
  }
  const msgraphSrv = new MSGraphService(new MSOAuthService({ user }))
  const [data, photoBase64] = await Promise.all([
    msgraphSrv.getCurrentUser(properties),
    msgraphSrv.getUserPhoto('48x48')
  ])
  const needSync = !isEqual(pick(user, [...properties, 'photo']), {
    photo: {
      base64: photoBase64
    },
    ...pick(data, [...properties, 'photo'])
  })
  if (syncUserPhoto) {
    user.photo = {
      base64: photoBase64
    }
  }
  if (!needSync) {
    debug('User profile properties are up to date!')
    return
  }
  debug(
    'Synchronizing user profile properties %s from Azure AD.',
    properties.join(', ')
  )
  await userSvc.updateUser({
    ...pick(user, 'id', 'photo'),
    ...pick(data, [...properties, 'photo'])
  })
  debug('User profile properties synchronized from Azure AD.')
}
