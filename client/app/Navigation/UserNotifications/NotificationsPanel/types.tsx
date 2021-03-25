import { IPanelProps } from '@fluentui/react-react'
import { NotificationModel } from '../types'

export interface INotificationsPanelProps extends IPanelProps {
  notifications: NotificationModel[]
}
