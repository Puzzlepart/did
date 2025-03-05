/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { SubscriptionService } from '../../../services/mongo'
import { IAuthOptions } from '../../authChecker'
import { RequestContext } from '../../requestContext'
import { BaseResult } from '../types'
import {
  ExternalUserInvitation,
  ExternalUserInvitationInput,
  Subscription,
  SubscriptionSettingsInput
} from './types'
import { generateId } from '../../../utils'

/**
 * Resolver for `Subscription`.
 *
 * `SubscriptionService` are injected through
 * _dependendy injection_.
 *
 * @see https://typegraphql.com/docs/dependency-injection.html
 *
 * @category GraphQL Resolver
 */
@Service()
@Resolver(Subscription)
export class SubscriptionResolver {
  /**
   * Constructor for SubscriptionResolver
   *
   * @param _subscription - Subscription service
   */
  constructor(private readonly _subscription: SubscriptionService) {
    // This constructor will be probably be empty at least until
    // the world is at peace and there is no more hunger. I could
    // really recommend the song "Imagine" by John Lennon.
  }

  /**
   * Get current subscription
   */
  @Query(() => Subscription, {
    description: 'Get current subscription',
    nullable: true
  })
  subscription(@Ctx() context: RequestContext): Promise<Subscription> {
    return this._subscription.getById(context.subscription.id)
  }

  /**
   * Update subscription
   *
   * @param settings - Settings
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_SUBSCRIPTION })
  @Mutation(() => BaseResult, { description: 'Update subscription' })
  async updateSubscription(
    @Arg('settings', () => SubscriptionSettingsInput)
    settings: SubscriptionSettingsInput
  ): Promise<BaseResult> {
    await this._subscription.updateSubscription(settings)
    return { success: true }
  }

  /**
   * Lock or unlock a period for the subscription.
   *
   * @param periodId Period ID
   * @param unlock If true, unlock the period
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_SUBSCRIPTION })
  @Mutation(() => BaseResult, { description: 'Lock or unlock a period' })
  async lockPeriod(
    @Arg('periodId') periodId: string,
    @Arg('unlock', { nullable: false }) unlock: boolean,
    @Arg('reason', { nullable: true }) reason: string
  ): Promise<BaseResult> {
    try {
      await this._subscription.lockPeriod(periodId, unlock, reason)
      return { success: true } as BaseResult
    } catch (error) {
      return { success: false, error } as BaseResult
    }
  }

  @Authorized<IAuthOptions>({ scope: PermissionScope.INVITE_EXTERNAL_USERS })
  @Mutation(() => BaseResult, { description: 'Invite external user' })
  async inviteExternalUser(
    @Ctx() context: RequestContext,
    @Arg('invitation', () => ExternalUserInvitationInput)
    invitation: ExternalUserInvitationInput
  ): Promise<BaseResult> {
    try {
      await this._subscription.inviteExternalUser({
        ...invitation,
        id: generateId(),
        status: 'pending',
        invitedAt: new Date(),
        invitedBy: context.user.id,
        provider: 'microsoft',
        startPage: '/reports',
        theme: 'auto',
        preferredLanguage: 'en-GB'
      })
      return { success: true, error: null }
    } catch (error) {
      return { success: false, error } as BaseResult
    }
  }

  @Query(() => [ExternalUserInvitation], {
    description: 'Get external invitations',
    nullable: true
  })
  async externalInvitations() {
    return await this._subscription.getExternalInvitations()
  }
}
