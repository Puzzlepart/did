import { AlertProps } from '@fluentui/react-components/dist/unstable'
import {
  bundleIcon,
  CalendarWeekNumbers24Filled,
  CalendarWeekNumbers24Regular,
  Timer224Filled,
  Timer224Regular
} from '@fluentui/react-icons'
import { TFunction } from 'i18next'
import React from 'react'
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
        return bundleIcon(
          CalendarWeekNumbers24Filled,
          CalendarWeekNumbers24Regular
        )
      }
      case 'MISSING_FORECAST': {
        return bundleIcon(Timer224Filled, Timer224Regular)
      }
      default: {
        return null
      }
    }
  }

  public get alertProps(): AlertProps {
    const Icon = this._icon
    return {
      itemID: this.id,
      intent: this._notificationIntent,
      icon: <Icon />
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
  iconName?: string
}
