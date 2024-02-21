import { IPanelProps } from 'components/Panel/types'
import { NotificationModel } from '../types'

export interface INotificationsPanelProps extends IPanelProps {
  notifications: NotificationModel[]
}
