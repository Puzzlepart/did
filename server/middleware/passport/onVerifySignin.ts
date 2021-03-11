/* eslint-disable @typescript-eslint/no-unused-vars */
import { MongoClient } from 'mongodb'
import { IProfile, VerifyCallback } from 'passport-azure-ad'
import { SubscriptionService, UserService } from '../../services/mongo'
import { environment } from '../../utils'

/**
 * On verify sign in
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
    const { tid, oid, preferred_username } = profile._json

    const subscription = await subSrv.getById(tid)
    if (!subscription) {
      throw new Error('[temp error message for subscription not found]')
    }
    const isOwner = subscription.owner === preferred_username

    const userSrv = new UserService({
      db: mongoClient.db(subscription.db)
    })

    let user = await userSrv.getById(oid)

    if (!user && !isOwner) {
      throw new Error('[temp error message for user not found]')
    }

    if (isOwner) {
      user = {
        id: oid,
        mail: preferred_username,
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
