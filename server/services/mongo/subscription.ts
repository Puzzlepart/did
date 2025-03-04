import { Inject, Service } from 'typedi'
import _ from 'lodash'
import { RequestContext } from '../../graphql/requestContext'
import {
  ExternalUserInvitation,
  Subscription,
  SubscriptionSettings
} from '../../graphql/resolvers/types'
import { environment } from '../../utils'
import { MongoDocumentService } from './document'

/**
 * Subscription service
 *
 * @extends MongoDocumentService
 *
 * @category Injectable Container Service
 */
@Service({ global: false })
export class SubscriptionService extends MongoDocumentService<Subscription> {
  /**
   * Constructor for `SubscriptionService`
   *
   * @param context Injected context through `typedi`
   * @param _msgraphSvc MS Graph service
   */
  constructor(@Inject('CONTEXT') readonly context: RequestContext) {
    super(
      context,
      'subscriptions',
      null,
      context?.mcl?.db(environment('MONGO_DB_DB_NAME'))
    )
  }

  /**
   * Replace id with _id
   *
   * @param subscription - Subscription
   */
  private _replaceId<T>(subscription: Subscription): T {
    return {
      ..._.omit(subscription, 'id'),
      _id: subscription.id
    } as unknown as T
  }

  /**
   * Get subscription by ID
   *
   * @remarks Returns null if no subscription is found.
   *
   * @param id - Subscription ID
   */
  public async getById(id: string): Promise<Subscription> {
    try {
      const subscription = await this.collection.findOne({ _id: id })
      if (!subscription) return null
      return {
        ...subscription,
        id: subscription._id
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Get subscription by external id or email
   *
   * @remarks Returns null if no subscription is found.
   *
   * @param idOrMail - User ID or mail
   * @param provider - Provider name
   */
  public async getByExternalId(idOrMail: string, provider: string) {
    try {
      const subscription = await this.collection.findOne({
        [`externals.${provider}`]: idOrMail
      })
      if (!subscription) return null
      return {
        ...subscription,
        id: subscription._id
      }
    } catch (error) {
      throw error
    }
  }

  /**
   * Add subscription
   *
   * @param subscription - Subscription
   */
  public async addSubscription(subscription: Subscription) {
    try {
      const result = await this.collection.insertOne(
        this._replaceId(subscription)
      )
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Update subscription
   *
   * @param settings - Subscription settings
   */
  public async updateSubscription(settings: SubscriptionSettings) {
    try {
      const result = await this.update(
        { _id: this.context.subscription.id },
        { settings }
      )
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Register external user
   *
   * @param provider - Provider
   * @param mail - Email address
   * @param subscriptionId - Subscription ID
   */
  public async registerExternalUser(
    provider: string,
    mail: string,
    subscriptionId = this.context.subscription.id
  ) {
    try {
      const result = await this.collection.updateOne(
        { _id: subscriptionId },
        { $push: { [`externals.${provider}`]: mail } }
      )
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Lock or unlock a period for the subscription.
   *
   * @param periodId Period ID
   * @param unlock If true, unlock the period
   * @param reason Reason for locking the period (optional)
   */
  public async lockPeriod(periodId: string, unlock: boolean, reason?: string) {
    try {
      const current = await this.collection.findOne({
        _id: this.context.subscription.id
      })
      const lockedPeriods = current.lockedPeriods ?? []
      const index = _.findIndex(lockedPeriods, { periodId })

      if (unlock) {
        if (index > -1) lockedPeriods.splice(index, 1)
      } else {
        if (index === -1) {
          lockedPeriods.push({
            periodId,
            reason,
            lockedBy: this.context.user.id,
            lockedAt: new Date()
          })
        }
      }

      return await this.update(
        { _id: this.context.subscription.id },
        { lockedPeriods }
      )
    } catch (error) {
      throw error
    }
  }

  /**
   * Invites an external user by adding their invitation to the subscription's invitations list.
   *
   * @param invitation - The invitation details for the external user.
   * @returns The result of the update operation.
   */
  public async inviteExternalUser(invitation: ExternalUserInvitation) {
    try {
      const result = await this.collection.updateOne(
        { _id: this.context.subscription.id },
        {
          $push: { [`invitations.${invitation.provider}|external`]: invitation }
        }
      )
      return result
    } catch (error) {
      throw error
    }
  }

  /**
   * Retrieves an external user invitation from the database based on the provided email.
   *
   * @param mail - The email address of the external user invitation to retrieve.
   * @param provider - The provider of the external user invitation to retrieve.
   *
   * @returns A promise that resolves to the external user invitation if found, otherwise null.
   */
  public async getExternalInvitation(
    mail: string,
    provider: string
  ): Promise<ExternalUserInvitation> {
    const invitationsPath = `invitations.${provider}|external`

    const subscription = await this.collection.findOne({
      [invitationsPath]: {
        $elemMatch: { mail }
      }
    })

    if (!subscription) return null

    const invitation = (
      _.get(subscription, invitationsPath) as ExternalUserInvitation[]
    ).find((inv) => inv.mail === mail)

    return {
      ...invitation,
      subscription: {
        ...subscription,
        id: subscription._id
      }
    }
  }

  /**
   * Removes an external user invitation from the subscription's invitations list.
   *
   * @param invitation - The external user invitation to be removed.
   *
   * @returns - The result of the update operation.
   */
  public async removeExternalInvitation(invitation: ExternalUserInvitation) {
    try {
      const result = await this.collection.updateOne(
        { _id: invitation.subscription.id },
        {
          $pull: {
            [`invitations.${invitation.provider}|external`]: {
              id: invitation.id
            }
          }
        }
      )
      return result
    } catch (error) {
      throw error
    }
  }
}
