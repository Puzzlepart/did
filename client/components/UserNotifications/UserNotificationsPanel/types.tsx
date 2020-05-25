import { UserNotificationMessageModel } from '../types'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

/**
 * @category UserNotifications
 */
export interface IUserNotificationsPanelProps extends IPanelProps {
    notifications: Set<UserNotificationMessageModel>;
    onDismissNotification: (notification: UserNotificationMessageModel) => void;
}