import 'reflect-metadata'
import { NotificationService } from '../../../services/notification'
import { Arg, Authorized, Query, Resolver } from 'type-graphql'
import { Service } from 'typedi'
import { IAuthOptions } from '../../authChecker'
import { Notification, NotificationTemplates } from './types'

@Service()
@Resolver(Notification)
export class NotificationResolver {
  /**
   * Constructor for NotificationResolver
   *
   * @param {NotificationService} _notification Notification service
   */
  constructor(private readonly _notification: NotificationService) {}

  /**
   * Get notifications
   *
   * @param {NotificationTemplates} templates Templates
   * @param {string} locale Locale
   */
  @Authorized<IAuthOptions>({ userContext: true })
  @Query(() => [Notification], { description: 'Get notifications' })
  notifications(
    @Arg('templates', () => NotificationTemplates) templates: NotificationTemplates,
    @Arg('locale') locale: string
  ) {
    return this._notification.getNotifications(templates, locale)
  }
}

export * from './types'
