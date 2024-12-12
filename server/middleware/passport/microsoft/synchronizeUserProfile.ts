import createDebug from 'debug'
import _ from 'underscore'
import { User } from '../../../graphql'
import { MSGraphService, UserService } from '../../../services'
import MSOAuthService from '../../../services/msoauth'
const debug = createDebug('middleware/passport/synchronizeUserProfile')

/**
 * Check if user profile synchronization is needed. If needed, return
 * the merged data to update the user.
 *
 * @param user - User object
 * @param properties - Properties to check
 * @param data - Data to compare
 */
function evaluateUserSync(
  user: User,
  properties: string[],
  data: Record<string, any>
) {
  const mergedData: Record<string, any> = _.pick({
    ...data,
    manager: _.pick(data.manager, 'id', 'mail', 'displayName')
  }, properties)

  const needSync = !_.isEqual(
    _.pick(user, [...properties, 'photo']),
    mergedData
  )

  return [needSync, mergedData] as const
}

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
  if (_.isEmpty(properties)) {
    debug(
      'User profile synchronization is turned on, but no properties are selected.'
    )
    return
  }
  try {
    const msGraphSvc = new MSGraphService(new MSOAuthService({ user }))
    const [data, userPhoto] = await Promise.all([
      msGraphSvc.getCurrentUser(properties),
      msGraphSvc.getUserPhoto('48x48')
    ])
    const [needSync, mergedData] = evaluateUserSync(user, properties, {
      ...data,
      photo: userPhoto
    })
    if (syncUserPhoto && userPhoto) {
      user.photo = {
        base64: userPhoto
      }
    }
    if (!needSync) {
      debug('User profile properties for %s are up to date.', user.id)
      return
    }
    debug(
      'Synchronizing user profile properties %s from Azure AD for %s.',
      properties.join(', '),
      user.id
    )
    await userSvc.updateUser({
      ..._.pick(user, 'id', 'photo'),
      ...mergedData
    })
    debug('User profile properties synchronized from Azure AD for %s.', user.id)
  } catch (error) {
    debug(
      'Failed to sync user profile properties from Azure AD for %s: %s',
      user.id,
      error.message
    )
  }
}
