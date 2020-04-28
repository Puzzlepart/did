import { UserNotificationMessageModel } from '../types';

export interface IUserNotificationMessageProps {
    model: UserNotificationMessageModel;
    onDismiss: (notification: UserNotificationMessageModel) => void;
    className: string;
}