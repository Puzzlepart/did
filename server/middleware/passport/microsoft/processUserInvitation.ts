/* eslint-disable unicorn/prevent-abbreviations */
import { ExternalUserInvitationInput, User } from 'server/graphql'
import { SubscriptionService, UserService } from 'server/services'
import { debug, PROVIDER } from './onVerifySignin'

/**
 * Process a user invitation and create a user account
 */
export async function processUserInvitation(
  userSrv: UserService,
  subSvc: SubscriptionService,
  profile: Record<string, any>,
  userInvitation: ExternalUserInvitationInput,
  subscription: any
): Promise<User> {
  debug(
    `User invitation with ID ${userInvitation.id} found. Adding user to the database`
  )

  const dbUser: Partial<User> = {
    id: profile.oid,
    mail: profile.preferred_username,
    displayName: profile.displayName,
    role: userInvitation.role,
    preferredLanguage: 'en-GB',
    tenantId: profile.tid,
    isExternal: true,
    startPage: '/reports',
    configuration: {
      ui: {
        theme: 'auto',
        stickyNavigation: true
      }
    }
  }

  await userSrv.addUser(dbUser)
  debug(`Registering user ${profile.preferred_username} (${profile.oid}) with subscription ${subscription.id}`)
  await subSvc.registerExternalUser(PROVIDER, profile.oid, subscription.id)
  debug(`Removing external invitation with ID ${userInvitation.id}`)
  await subSvc.removeExternalInvitation(userInvitation)
  debug(
    `User added as external user and invitation with ID ${userInvitation.id} removed`
  )

  return dbUser
}
