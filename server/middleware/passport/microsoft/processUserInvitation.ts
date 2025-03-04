/* eslint-disable unicorn/prevent-abbreviations */
import { IProfile } from 'passport-azure-ad'
import { ExternalUserInvitationInput, User } from 'server/graphql'
import { UserService, SubscriptionService } from 'server/services'
import { debug, PROVIDER } from './onVerifySignin'

/**
 * Process a user invitation and create a user account
 */
export async function processUserInvitation(
  userSrv: UserService,
  subSvc: SubscriptionService,
  userId: string,
  mail: string,
  subId: string,
  profile: IProfile,
  userInvitation: ExternalUserInvitationInput,
  subscription: any
): Promise<User> {
  debug(
    `User invitation with ID ${userInvitation.id} found. Adding user to the database`
  )

  const dbUser: Partial<User> = {
    id: userId,
    mail,
    displayName: profile.displayName,
    role: userInvitation.role,
    preferredLanguage: 'en-GB',
    tenantId: subId,
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
  debug(`Registering user ${mail} with subscription ${subscription.id}`)
  await subSvc.registerExternalUser(PROVIDER, mail, subscription.id)
  debug(`Removing external invitation with ID ${userInvitation.id}`)
  await subSvc.removeExternalInvitation(userInvitation)
  debug(
    `User added as external user and invitation with ID ${userInvitation.id} removed`
  )

  return dbUser
}
