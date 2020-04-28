import { UserNotificationMessageModel } from '../types';
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel';

export interface IUserNotificationsPanelClassName {
    root: string;
    body: string;
    notification: string;
}

export interface IUserNotificationsPanelProps extends IPanelProps {
    notifications: Set<UserNotificationMessageModel>;
    bodyClassName: string;
    notificationClassName: string;
    onDismissNotification: (notification: UserNotificationMessageModel) => void;
}