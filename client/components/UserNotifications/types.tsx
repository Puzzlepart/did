import { TFunction } from 'i18next'
import { IMessageBarProps, MessageBarType } from 'office-ui-fabric-react'
import { Notification } from '../../../server/graphql/resolvers/types'

export enum NotificationType {
  WEEK_NOT_CONFIRMED,
  MISSING_FORECAST,
  SERVICE_ANNOUNCEMENT,
  FEATURE_ANNOUNCEMENT
}

export enum NotificationSeverity {
  LOW,
  MEDIUM,
  HIGH
}

export class NotificationModel {
  public id: string
  public type: NotificationType
  public severity: NotificationSeverity
  public text: string
  public moreLink: string

  /**
   * Constructs a new instance of UserNotificationMessageModel
   *
   * @param msg - The message
   */
  constructor(message: Notification) {
    this.id = message.id
    this.type = message.type
    this.severity = message.severity
    this.text = message.text
    this.moreLink = message.moreLink
  }

  private get _messageType(): MessageBarType {
    switch (this.type) {
      case NotificationType.WEEK_NOT_CONFIRMED:
        return MessageBarType.warning

      case NotificationType.MISSING_FORECAST:
        return MessageBarType.info

      case NotificationType.SERVICE_ANNOUNCEMENT: {
        return this.severity === NotificationSeverity.HIGH ? MessageBarType.severeWarning : MessageBarType.warning
      }
      default:
        return MessageBarType.info
    }
  }

  private get _iconProps(): { iconName: string } {
    switch (this.type) {
      case NotificationType.WEEK_NOT_CONFIRMED:
        return { iconName: 'CalendarWorkWeek' }
      case NotificationType.MISSING_FORECAST:
        return { iconName: 'BufferTimeBefore' }
      case NotificationType.SERVICE_ANNOUNCEMENT:
        return { iconName: 'Manufacturing' }
      case NotificationType.FEATURE_ANNOUNCEMENT:
        return { iconName: 'BuildQueueNew' }
      default:
        return
    }
  }

  public get messageProps(): IMessageBarProps {
    const messageBarProps: IMessageBarProps = {
      itemID: this.id,
      messageBarType: this._messageType,
      messageBarIconProps: this._iconProps
    }
    return messageBarProps
  }

  /**
   * Get text for more link
   *
   * @param t - Translate function
   */
  public getMoreLinkText(t: TFunction): string {
    switch (this.type) {
      case NotificationType.WEEK_NOT_CONFIRMED: {
        return t('notifications.goToPeriodText')
      }
      case NotificationType.MISSING_FORECAST: {
        return t('notifications.goToPeriodText')
      }

      default:
        return t('notifications.moreLinkText')
    }
  }
}

export interface IUserNotificationsState {
  showPanel?: boolean
}
