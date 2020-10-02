import { NotificationModel } from '../types'

export interface IUserNotificationProps {
    model: NotificationModel;
    onDismiss?: (notification: NotificationModel) => void;
}