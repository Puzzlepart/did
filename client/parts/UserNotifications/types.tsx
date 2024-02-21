import { MessageBarProps } from '@fluentui/react-components'
import { AlertProps } from '@fluentui/react-components/dist/unstable'
import { TFunction } from 'i18next'
import { Notification } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'

export class NotificationModel {
  public id: string
  public type: string
  public severity: string
  public text: string
  public moreLink: string
  public iconName?: string

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
    this.iconName = notification.iconName
  }

  /**
   * Returns the intent of the notification based on its type.
   *
   * @returns The intent of the notification.
   */
  private get _notificationIntent(): AlertProps['intent'] {
    switch (this.type) {
      case 'WEEK_NOT_CONFIRMED': {
        return 'warning'
      }
      default: {
        return 'info'
      }
    }
  }

  private get _icon() {
    switch (this.type) {
      case 'WEEK_NOT_CONFIRMED': {
        return icon('CalendarWeekNumbers')
      }
      case 'MISSING_FORECAST': {
        return icon('Timer2')
      }
      default: {
        return null
      }
    }
  }

  public get alertProps(): MessageBarProps {
    return {
      itemID: this.id,
      intent: this._notificationIntent,
      icon: this._icon
    }
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

      default: {
        return t('notifications.moreLinkText')
      }
    }
  }
}

export interface IUserNotificationsProps {
  renderAsMenuItem?: boolean
}
