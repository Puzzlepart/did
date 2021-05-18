import { IIconProps } from '@fluentui/react'
import { IUserMessageProps, UserMessageType } from 'components/UserMessage'
import { TFunction } from 'i18next'
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

  private get _messageType(): UserMessageType {
    switch (this.type) {
      case 'WEEK_NOT_CONFIRMED':
        return 'warning'
      default:
        return 'info'
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

  public get messageProps(): IUserMessageProps {
    const userMessageProps: IUserMessageProps = {
      itemID: this.id,
      type: this._messageType,
      messageBarIconProps: this._iconProps
    }
    return userMessageProps
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

export interface IUserNotificationsProps {
  renderAsMenuItem?: boolean
  iconName?: string
}
