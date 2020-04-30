import { UserNotificationMessageModel } from '../types';

/**
 * @category UserNotifications
 */
export interface IUserNotificationMessageProps {
    model: UserNotificationMessageModel;
    onDismiss: (notification: UserNotificationMessageModel) => void;
    className: string;
}