/* eslint-disable unicorn/prevent-abbreviations */
import _ from 'lodash'
import { ExternalUserInvitationInput, User } from 'server/graphql'
import { SubscriptionService, UserService } from 'server/services'
import { debug, PROVIDER } from './onVerifySignin'
import { IProfileJson } from './types'

/**
 * Process a user invitation and create a user account
 *
 * @param userSrv - User service instance
 * @param subSvc - Subscription service instance
 * @param profile - User profile object
 * @param userInvitation - User invitation object
 */
export async function processUserInvitation(
  userSrv: UserService,
  subSvc: SubscriptionService,
  profile: IProfileJson,
  userInvitation: ExternalUserInvitationInput
): Promise<User> {
  debug(
    `User invitation with ID ${userInvitation.id} found. Adding user to the database`
  )

  const invitedBy = await userSrv.getById(userInvitation.invitedBy)

  const dbUser: Partial<User> = {
    id: profile.oid,
    mail: profile.preferred_username,
    displayName: profile.displayName,
    role: userInvitation.role,
    preferredLanguage: userInvitation.preferredLanguage,
    tenantId: profile.tid,
    isExternal: true,
    invitationId: userInvitation.id,
    invitedAt: userInvitation.invitedAt,
    startPage: userInvitation.startPage,
    configuration: {
      ui: {
        theme: userInvitation.theme
      }
    }
  }

  if (Boolean(invitedBy)) {
    dbUser.manager = _.pick(invitedBy, ['id', 'mail', 'displayName'])
  }

  await userSrv.addUser(dbUser)

  debug(
    `Registering user ${profile.preferred_username} (${profile.oid}) with subscription ${userInvitation.subscription.id}`
  )
  await subSvc.registerExternalUser(
    PROVIDER,
    profile.oid,
    userInvitation.subscription.id
  )

  debug(`Removing external invitation with ID ${userInvitation.id}`)
  await subSvc.removeExternalInvitation(userInvitation)

  debug(
    `User added as external user and invitation with ID ${userInvitation.id} removed`
  )

  return dbUser
}
