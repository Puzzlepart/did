/* eslint-disable tsdoc/syntax */
import 'reflect-metadata'
import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { NotificationService } from '../../../services/notification'
import { IAuthOptions } from '../../authChecker'
import { Notification, NotificationTemplates } from './types'

/**
 * @category Resolver
 */
@Service()
@Resolver(Notification)
export class NotificationResolver {
  /**
   * Constructor for NotificationResolver
   *
   * @param _notification - Notification service
   */
  constructor(private readonly _notification: NotificationService) {}

  /**
   * Get notifications
   *
   * @param templates - Templates
   * @param locale - Locale
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [Notification], { description: 'Get notifications' })
  notifications(
    @Arg('templates', () => NotificationTemplates)
    templates: NotificationTemplates,
    @Arg('locale') locale: string
  ) {
    return this._notification.getNotifications(templates, locale)
  }
}

export * from './types'
