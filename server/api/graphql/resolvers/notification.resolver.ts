import 'reflect-metadata'
import { AzStorageService } from '../../services'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Context } from '../context'
import forecast from './notification.forecast'
import { Notification, NotificationTemplates } from './notification.types'
import unconfirmedPeriods from './notification.unconfirmed-periods'
import { Service } from 'typedi'

@Service()
@Resolver(Notification)
export class NotificationResolver {
  constructor(private readonly _azstorage: AzStorageService) {}

  /**
   * Get notifications
   *
   * @param {NotificationTemplates} templates Templates
   * @param {string} locale Locale
   * @param {Context} ctx GraphQL context
   */
  @Authorized()
  @Query(() => [Notification], { description: 'Get notifications' })
  async notifications(
    @Arg('templates', () => NotificationTemplates) templates: NotificationTemplates,
    @Arg('locale') locale: string,
    @Ctx() ctx: Context
  ) {
    if (!ctx.user.id) return { success: false, error: null }
    const notifications = await Promise.all([
      unconfirmedPeriods(ctx, this._azstorage, templates.unconfirmedPeriods, locale),
      forecast(ctx, this._azstorage, templates.forecast, locale)
    ])
    // eslint-disable-next-line prefer-spread
    return [].concat.apply([], notifications)
  }
}
