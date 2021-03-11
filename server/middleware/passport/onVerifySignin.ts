/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from 'mongodb'
import { IProfile, VerifyCallback } from 'passport-azure-ad'
import { SubscriptionService, UserService } from '../../services/mongo'
import { environment } from '../../utils'

/**
 * On verify sign in
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
export const onVerifySignin = async (
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

    const subscription = await subSrv.getById(subId)
    if (!subscription) {
      throw new Error('[temp error message for subscription not found]')
    }
    const isOwner = subscription.owner === mail

    const userSrv = new UserService({
      db: mongoClient.db(subscription.db)
    })

    let user = await userSrv.getById(userId)

    if (!user && !isOwner) {
      throw new Error('[temp error message for user not found]')
    }

    if (isOwner) {
      user = {
        id: userId,
        mail,
        displayName: profile.displayName,
        role: 'Owner',
        preferredLanguage: 'en-GB'
      }
      await userSrv.addUser(user)
    }

    return done(null, {
      ...user,
      subscription,
      tokenParams: tokenParameters
    })
  } catch (error) {
    done(error, null)
  }
}
