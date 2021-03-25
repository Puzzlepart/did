import { IPanelProps } from '@fluentui/react'
import { NotificationModel } from '../types'

export interface INotificationsPanelProps extends IPanelProps {
  notifications: NotificationModel[]
}
