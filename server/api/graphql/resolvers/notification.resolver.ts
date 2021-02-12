/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prefer-spread */
import 'reflect-metadata'
import { Arg, Authorized, Ctx, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
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
   */
  constructor() {}

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
    return await Promise.resolve([])
    // const notifications = await Promise.all([
    //   unconfirmedPeriods(ctx, this._azstorage, templates.unconfirmedPeriods, locale),
    //   forecast(ctx, this._azstorage, templates.forecast, locale)
    // ])
    // return [].concat.apply([], notifications)
  }
}
