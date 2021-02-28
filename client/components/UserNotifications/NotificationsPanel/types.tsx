import { IPanelProps } from 'office-ui-fabric-react'
import { NotificationModel } from '../types'

export interface INotificationsPanelProps extends IPanelProps {
  notifications: NotificationModel[]
}
