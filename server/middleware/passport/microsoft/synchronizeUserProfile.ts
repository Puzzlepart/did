import createDebug from 'debug'
import { UserPhoto } from 'server/graphql'
import { isEmpty, isEqual, pick } from 'underscore'
import { MSGraphService, UserService } from '../../../services'
import OAuthService from '../../../services/oauth'
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
  if (isEmpty(properties)) {
    debug(
      'User profile synchronization is turned on, but no properties are selected.'
    )
  }
  const msgraphSrv = new MSGraphService(new OAuthService({ user }))
  const [data, photoBase64] = await Promise.all([
    msgraphSrv.getCurrentUser(properties),
    msgraphSrv.getUserPhoto('48x48')
  ])
  const photo: UserPhoto = {
    base64: photoBase64
  }
  const needSync = !isEqual(pick(user, ...properties), {
    photo,
    ...pick(data, ...properties)
  })
  if (!needSync) {
    debug('User profile properties are up to date!')
    return
  }
  debug(
    'Synchronizing user profile properties %s from Azure AD.',
    properties.join(', ')
  )
  await userSrv.updateUser({
    id: user.id,
    ...pick(data, properties),
    photo
  })
  debug('User profile properties synchronized from Azure AD.')
}
