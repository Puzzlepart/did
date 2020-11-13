/* eslint-disable prefer-spread */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { AzStorageService } from '../../services'
import { IAuthOptions } from '../authChecker'
import { Context } from '../context'
import forecast from './notification.forecast'
import { Notification, NotificationTemplates } from './notification.types'
import unconfirmedPeriods from './notification.unconfirmed-periods'

@Service()
@Resolver(Notification)
export class NotificationResolver {
  /**
   * Constructor for NotificationResolver
   *
   * AzStorageService is automatically injected using Container from typedi
   *
   * @param {AzStorageService} _azstorage AzStorageService
   */
  constructor(private readonly _azstorage: AzStorageService) {}

  /**
   * Get notifications
   *
   * @param {NotificationTemplates} templates Templates
   * @param {string} locale Locale
   * @param {Context} ctx GraphQL context
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [Notification], { description: 'Get notifications' })
  async notifications(
    @Arg('templates', () => NotificationTemplates) templates: NotificationTemplates,
    @Arg('locale') locale: string,
    @Ctx() ctx: Context
  ) {
    const notifications = await Promise.all([
      unconfirmedPeriods(ctx, this._azstorage, templates.unconfirmedPeriods, locale),
      forecast(ctx, this._azstorage, templates.forecast, locale)
    ])
    return [].concat.apply([], notifications)
  }
}
