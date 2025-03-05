/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { PermissionScope } from '../../../../shared/config/security'
import { SubscriptionService, UserService } from '../../../services/mongo'
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
import _ from 'lodash'

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
   * @param _subSvc - Subscription service
   */
  constructor(
    private readonly _subSvc: SubscriptionService,
    private readonly _userSvc: UserService
  ) {
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
    return this._subSvc.getById(context.subscription.id)
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
    await this._subSvc.updateSubscription(settings)
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
      await this._subSvc.lockPeriod(periodId, unlock, reason)
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
      await this._subSvc.inviteExternalUser({
        id: generateId(),
        ...invitation,
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

  /**
   * Fetches external invitations using the subscription service.
   *
   * @returns A promise that resolves to the external invitations.
   */
  @Query(() => [ExternalUserInvitation], {
    description: 'Get external invitations',
    nullable: true
  })
  async externalInvitations() {
    return await this._subSvc.getExternalInvitations()
  }

  /**
   * Cancel an external user invitation.
   *
   * @param invitationId - The ID of the invitation to cancel.
   *
   * @returns A promise that resolves when the invitation is cancelled.
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.INVITE_EXTERNAL_USERS })
  @Mutation(() => BaseResult, {
    description: 'Cancel external user invitation'
  })
  async cancelExternalInvitation(
    @Arg('invitationId') invitationId: string
  ): Promise<BaseResult> {
    try {
      await this._subSvc.cancelExternalInvitation(invitationId)
      return { success: true, error: null }
    } catch (error) {
      return {
        success: false,
        error: _.pick(error, ['name', 'message', 'code', 'statusCode'])
      }
    }
  }

  /**
   * Revoke external access for a user. This will remove the user from the
   * `externals` on the subscription as well as removing the user from
   * the users collection.
   *
   * @param userId - The ID of the user to revoke external access for
   */
  @Authorized<IAuthOptions>({ scope: PermissionScope.MANAGE_USERS })
  @Mutation(() => BaseResult, {
    description: 'Revoke external access by user ID'
  })
  public async revokeExternalAccess(
    @Arg('userId') userId: string
  ): Promise<BaseResult> {
    try {
      const user = await this._userSvc.getById(userId)
      if (!user) {
        throw new Error(`User with ID ${userId} not found.`)
      }
      const removeExternalUser = await this._subSvc.removeExternalUser(
        user.provider,
        userId
      )
      if (!removeExternalUser) {
        throw new Error(`Failed to remove external user with ID ${userId}`)
      }
      const deleteById = await this._userSvc.deleteById(userId)
      return { success: deleteById, error: null }
    } catch (error) {
      return {
        success: false,
        error: _.pick(error, ['name', 'message', 'code', 'statusCode'])
      }
    }
  }
}
