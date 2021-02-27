import { NotificationModel } from '../types'
import { IPanelProps } from 'office-ui-fabric'

export interface INotificationsPanelProps extends IPanelProps {
  notifications: NotificationModel[]
}
