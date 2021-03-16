/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from 'mongodb'
import { IProfile, VerifyCallback } from 'passport-azure-ad'
import { Profile } from 'passport-google-oauth20'
import { SubscriptionService, UserService } from '../../services/mongo'
import { environment } from '../../utils'
import { NO_OID_FOUND, TENANT_NOT_ENROLLED, USER_NOT_ENROLLED } from './errors'
import { synchronizeUserProfile } from './synchronizeUserProfile'

/**
 * On verify sign in Microsoft
 *
 * 1. Checks if the tenant has an subscription
 * 2. Checks if the user is enrolled in the subscription or
 * the user is the subscription owner.
 * 3. If the user is an owner, we create the user for them.
 *
 * @param mongoClient - Mongo client
 * @param profile - User profile object
 * @param tokenParams - Token params
 * @param done - Done callback
 */
export const onVerifySigninMicrosoft = async (
  mongoClient: MongoClient,
  profile: IProfile,
  tokenParameters: unknown,
  done: VerifyCallback
) => {
  const subSrv = new SubscriptionService({
    db: mongoClient.db(environment('MONGO_DB_DB_NAME'))
  })
  try {
    const { tid: subId, oid: userId, preferred_username: mail } = profile._json

    if (!userId) {
      throw NO_OID_FOUND
    }

    const subscription = await subSrv.getById(subId)
    if (!subscription) {
      throw TENANT_NOT_ENROLLED
    }
    const isOwner = subscription.owner === mail

    const userSrv = new UserService({
      db: mongoClient.db(subscription.db)
    })

    let user_ = await userSrv.getById(userId)

    if (!user_ && !isOwner) {
      throw USER_NOT_ENROLLED
    }

    if (!user_ && isOwner) {
      user_ = {
        id: userId,
        mail,
        displayName: profile.displayName,
        role: 'Owner',
        preferredLanguage: 'en-GB'
      }
      await userSrv.addUser(user_)
    }
    const user: any = {
      ...user_,
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

/**
 * On verify sign in Microsoft
 *
 * @param mongoClient - Mongo client
 * @param accessToken - Access token
 * @param profile - User profile object
 * @param done - Done callback
 */
export const onVerifySigninGoogle = async (
  mongoClient: MongoClient,
  accessToken: string,
  refreshToken: string,
  profile: Profile,
  done: VerifyCallback
) => {
  const subSrv = new SubscriptionService({
    db: mongoClient.db(environment('MONGO_DB_DB_NAME'))
  })
  const subscription = await subSrv.getById(
    environment('GOOGLE_TEMP_SUBSCRIPTION_ID')
  )
  if (!subscription) throw TENANT_NOT_ENROLLED

  const userSrv = new UserService({
    db: mongoClient.db(subscription.db)
  })

  const user: any = await userSrv.getById(profile.id)
  user.subscription = subscription
  user.tokenParams = { accessToken }
  done(null, user)
}
