/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import createDebug from 'debug'
import { MongoClient } from 'mongodb'
import { IProfile, VerifyCallback } from 'passport-azure-ad'
import { ExternalUserInvitationInput, User } from 'server/graphql'
import { SubscriptionService, UserService } from '../../../services'
import { environment } from '../../../utils'
import { checkSecurityGroupMembership } from './checkSecurityGroupMembership'
import { processUserInvitation } from './processUserInvitation'
import { retrieveSubscription } from './retrieveSubscription'
import { synchronizeUserProfile } from './synchronizeUserProfile'
import { IProfileJson } from './types'
import {
  NO_OID_FOUND,
  USER_ACCOUNT_DISABLED,
  USER_INVITATION_ACCEPTED,
  USER_NOT_ENROLLED
} from '../errors'
const debug = createDebug('server/middleware/passport/microsoft/onVerifySignin')
export const PROVIDER = 'microsoft'

/**
 * On verify sign in Microsoft
 *
 * 1. Checks if the tenant has a subscription
 * 2. Checks if the user is enrolled in the subscription or
 *    the user is the subscription owner
 * 3. Creates or updates the user as needed
 *
 * @param mcl - Mongo client
 * @param profile - User profile object
 * @param tokenParameters - Token params
 * @param done - Done callback
 */
export const onVerifySignin = async (
  mcl: MongoClient,
  profile: IProfile,
  tokenParameters: Record<string, any>,
  done: VerifyCallback
): Promise<void> => {
  const subSvc = new SubscriptionService({
    db: mcl.db(environment('MONGO_DB_DB_NAME'))
  })
  try {
    // Extract profile JSON
    const _profile = profile._json as IProfileJson

    // User invitation
    let userInvitation: ExternalUserInvitationInput

    // Extract user identity information
    const { tid: subId, oid: userId, preferred_username: mail } = _profile

    if (!userId) {
      throw NO_OID_FOUND
    }

    // Find applicable subscription
    const subscription = await retrieveSubscription(subSvc, subId, _profile)

    // Check if user is owner
    const isOwner = subscription.owner === mail

    // Initialize user service with the subscription's database
    const userSrv = new UserService({
      db: mcl.db(subscription.db)
    })

    // Get user from database
    let dbUser = await userSrv.getById(userId)

    // Process user invitation if exists
    if (!dbUser) {
      userInvitation = await subSvc.getExternalInvitation(mail, PROVIDER)
      if (userInvitation?.subscription?.id === subscription.id) {
        dbUser = await processUserInvitation(
          userSrv,
          subSvc,
          _profile,
          userInvitation
        )
      }
    }

    // Check user enrollment status
    const isUserInSecurityGroup = await checkUserSecurityGroupMembership(
      dbUser,
      isOwner,
      subscription,
      tokenParameters,
      mail
    )

    const isUserEnrolled = isOwner || isUserInSecurityGroup || Boolean(dbUser)
    if (!isUserEnrolled) {
      throw USER_NOT_ENROLLED
    }

    // Create user if not already in database but has enrollment rights
    if (!dbUser) {
      dbUser = await createUser(
        userSrv,
        userId,
        mail,
        profile,
        isOwner,
        isUserInSecurityGroup,
        subscription
      )
    }

    // Check if user account is enabled
    if (dbUser?.accountEnabled === false) {
      throw USER_ACCOUNT_DISABLED
    }

    // Prepare final user object and synchronize if needed
    const user = {
      ...dbUser,
      subscription,
      tokenParams: tokenParameters
    }

    if (subscription?.settings?.adsync?.enabled) {
      const syncManager = !Boolean(userInvitation) && !dbUser.isExternal
      await synchronizeUserProfile(user, userSrv, syncManager)
    }

    // Check if user invitation was accepted, if so, return
    // a special error message to the client
    if (Boolean(userInvitation)) {
      return done(USER_INVITATION_ACCEPTED(dbUser.manager), null)
    }

    done(null, user)
  } catch (error) {
    debug('Failed to verify sign in', error.message)
    done(error, null)
  }
}

/**
 * Check if user is a member of a security group
 */
async function checkUserSecurityGroupMembership(
  dbUser: Partial<User>,
  isOwner: boolean,
  subscription: any,
  tokenParameters: Record<string, any>,
  mail: string
): Promise<boolean> {
  if (dbUser || isOwner) {
    return false
  }

  return await checkSecurityGroupMembership(
    subscription?.settings?.security ?? {},
    tokenParameters,
    mail
  )
}

/**
 * Create a new user in the database
 */
async function createUser(
  userSrv: UserService,
  userId: string,
  mail: string,
  profile: IProfile,
  isOwner: boolean,
  isUserInSecurityGroup: boolean,
  subscription: any
): Promise<User> {
  const dbUser: Partial<User> = {
    id: userId,
    mail,
    displayName: profile.displayName,
    role: isOwner ? 'Owner' : 'User',
    preferredLanguage: 'en-GB'
  }

  if (
    isUserInSecurityGroup &&
    subscription?.settings?.security?.securityGroupId
  ) {
    dbUser.securityGroupId = subscription.settings.security.securityGroupId
  }

  await userSrv.addUser(dbUser)
  return dbUser
}
