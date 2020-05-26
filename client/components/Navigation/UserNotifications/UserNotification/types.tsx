import { NotificationModel } from '../types'

/**
 * @category UserNotifications
 */
export interface IUserNotificationProps {
    model: NotificationModel;
    onDismiss?: (notification: NotificationModel) => void;
}