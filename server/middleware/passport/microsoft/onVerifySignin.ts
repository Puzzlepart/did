/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from 'mongodb'
import { IProfile, VerifyCallback } from 'passport-azure-ad'
import { SubscriptionService, UserService } from '../../../services'
import { environment } from '../../../utils'
import {
  NO_OID_FOUND,
  TENANT_NOT_ENROLLED,
  USER_ACCOUNT_DISABLED,
  USER_NOT_ENROLLED
} from '../errors'
import { synchronizeUserProfile } from './synchronizeUserProfile'
import { checkSecurityGroupMembership } from './checkSecurityGroupMembership'

/**
 * On verify sign in Microsoft
 *
 * 1. Checks if the tenant has an subscription
 * 2. Checks if the user is enrolled in the subscription or
 * the user is the subscription owner.
 * 3. If the user is an owner, we create the user for them.
 *
 * @param mcl - Mongo client
 * @param profile - User profile object
 * @param tokenParameters - Token params
 * @param done - Done callback
 */
export const onVerifySignin = async (
  mcl: MongoClient,
  profile: IProfile,
  tokenParameters: any,
  done: VerifyCallback
) => {
  const subSvc = new SubscriptionService({
    db: mcl.db(environment('MONGO_DB_DB_NAME'))
  })
  try {
    const { tid: subId, oid: userId, preferred_username: mail } = profile._json

    if (!userId) throw NO_OID_FOUND

    const subscription = await subSvc.getById(subId)
    if (!subscription) {
      throw TENANT_NOT_ENROLLED
    }
    const isOwner = subscription.owner === mail

    const userSrv = new UserService({
      db: mcl.db(subscription.db)
    })

    let dbUser = await userSrv.getById(userId)

    let isUserInSecurityGroup = false

    if (!dbUser && !isOwner) {
      isUserInSecurityGroup = await checkSecurityGroupMembership(
        subscription,
        tokenParameters,
        mail
      )
    }

    const isUserEnrolled = isOwner || isUserInSecurityGroup || !!dbUser

    if (!isUserEnrolled) throw USER_NOT_ENROLLED

    if (isUserEnrolled && !dbUser) {
      dbUser = {
        id: userId,
        mail,
        displayName: profile.displayName,
        role: isOwner ? 'Owner' : 'User',
        preferredLanguage: 'en-GB'
      }
      if (isUserInSecurityGroup) {
        dbUser.securityGroupId = subscription.settings.security.securityGroupId
      }
      await userSrv.addUser(dbUser)
    }

    if (dbUser?.accountEnabled === false) throw USER_ACCOUNT_DISABLED

    const user = {
      ...dbUser,
      subscription,
      tokenParams: tokenParameters
    }

    if (subscription?.settings?.adsync?.enabled) {
      await synchronizeUserProfile(user, userSrv)
    }

    done(null, user)
  } catch (error) {
    done(error, null)
  }
}
