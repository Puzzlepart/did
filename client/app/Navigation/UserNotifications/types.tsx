import { TFunction } from 'i18next'
import {
  IIconProps,
  IMessageBarProps,
  MessageBarType
} from '@fluentui/react'
import { Notification } from 'types'

export class NotificationModel {
  public id: string
  public type: string
  public severity: string
  public text: string
  public moreLink: string

  /**
   * Constructs a new instance of UserNotificationMessageModel
   *
   * @param notification - The notification
   */
  constructor(notification: Notification) {
    this.id = notification.id
    this.type = notification.type
    this.severity = notification.severity
    this.text = notification.text
    this.moreLink = notification.moreLink
  }

  private get _messageType(): MessageBarType {
    switch (this.type) {
      case 'WEEK_NOT_CONFIRMED':
        return MessageBarType.warning

      case 'MISSING_FORECAST':
        return MessageBarType.info

      default:
        return MessageBarType.info
    }
  }

  private get _iconProps(): IIconProps {
    switch (this.type) {
      case 'WEEK_NOT_CONFIRMED':
        return { iconName: 'CalendarWorkWeek' }
      case 'MISSING_FORECAST':
        return { iconName: 'BufferTimeBefore' }
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
      case 'WEEK_NOT_CONFIRMED': {
        return t('notifications.goToPeriodText')
      }
      case 'MISSING_FORECAST': {
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
