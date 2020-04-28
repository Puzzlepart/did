import { useQuery } from '@apollo/react-hooks';
import { getValueTyped } from 'helpers';
import { Icon } from 'office-ui-fabric-react/lib/Icon';
import * as React from 'react';
import { withDefaultProps } from 'with-default-props';
import GET_NOTIFICATIONS from './GET_NOTIFICATIONS';
import { IUserNotificationMessage, IUserNotificationMessageProps, IUserNotificationsProps, UserNotificationMessageModel } from './types';
import { UserNotificationsPanel } from './UserNotificationsPanel';

/**
 * @component UserNotifications
 */
const UserNotifications = (props: IUserNotificationsProps) => {
    const [showPanel, setShowPanel] = React.useState(false);
    const [notifications, setNotifications] = React.useState<UserNotificationMessageModel[]>([]);
    const { loading, data } = useQuery<{ notifications: IUserNotificationMessage[] }>(GET_NOTIFICATIONS, { fetchPolicy: 'cache-first' });

    /**
     * On dismiss notification
     * 
     * @param {string} notificationId Notification ID
     */
    const onDismissNotification = (notificationId: string) => {
        setNotifications(notifications.filter(n => n.id !== notificationId));
    }


    React.useEffect(() => {
        let _notifications = getValueTyped<any[]>(data, 'notifications', []).map(n => new UserNotificationMessageModel(n, onDismissNotification));
        if (_notifications.length > 0) {
            setNotifications(_notifications);
        }
    }, [loading]);

    return (
        <div className={props.className.root} hidden={loading}>
            <div className={props.className.toggle.root} onClick={_ => setShowPanel(!showPanel)}>
                <div className={props.className.toggle.icon}>
                    <Icon iconName={props.toggleIcon} styles={props.toggleStyles} />
                </div>
                <div className={props.className.toggle.count}>{notifications.length}</div>
            </div>
            <UserNotificationsPanel
                isOpen={showPanel}
                headerText={props.panelHeaderText}
                notifications={notifications}
                className={props.className.panel}
                onDismiss={_ => setShowPanel(false)} />
        </div >
    );
}

export default withDefaultProps(UserNotifications, {
    toggleIcon: 'Ringer',
    toggleStyles: { root: { color: '#fff', fontSize: '14pt' } },
    panelHeaderText: 'Notifications',
    className: {
        root: 'c-UserNotifications',
        toggle: {
            root: 'c-UserNotifications-toggle',
            icon: 'c-UserNotifications-toggle-icon',
            count: 'c-UserNotifications-toggle-count',
        },
        panel: {
            root: 'c-UserNotifications-panel',
            body: 'c-UserNotifications-panel-body',
            notification: 'c-UserNotifications-panel-notification'
        }
    }
});