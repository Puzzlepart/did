import { Icon } from 'office-ui-fabric-react/lib/Icon';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { withDefaultProps } from 'with-default-props';
import { PLACEHOLDER_PANEL_MESSAGES } from './PLACEHOLDER_PANEL_MESSAGES';
import { IUserNotificationMessageProps, IUserNotificationsProps } from './types';
import { UserNotificationMessage } from './UserNotificationMessage';

/**
 * @component UserNotifications
 */
const UserNotifications = (props: IUserNotificationsProps) => {
    const [showPanel, setShowPanel] = React.useState(false);
    const [notifications, setNotifications] = React.useState<any[]>(PLACEHOLDER_PANEL_MESSAGES.map((n, idx) => ({ ...n, itemID: idx })));

    /**
     * On dismiss notification
     * 
     * @param {IUserNotificationMessageProps} notification Notification
     */
    const onDismissNotification = (notification: IUserNotificationMessageProps) => {
        setNotifications(notifications.filter(n => n.itemID !== notification.itemID));
    }

    return (
        <div className={props.className.root}>
            <div className={props.className.toggle.root} onClick={_ => setShowPanel(!showPanel)}>
                <div className={props.className.toggle.icon}>
                    <Icon iconName={props.toggleIcon} styles={props.toggleStyles} />
                </div>
                <div className={props.className.toggle.count}>{notifications.length}</div>
            </div>
            <Panel
                isOpen={showPanel}
                className={props.className.panel.root}
                headerText={props.panelHeaderText}
                onDismiss={_ => setShowPanel(false)}
                isLightDismiss={true}>
                <div className={props.className.panel.body}>
                    {notifications.map(n => (
                        <UserNotificationMessage
                            {...n}
                            onDismiss={_ => onDismissNotification(n)}
                            className={props.className.panel.notification} />
                    ))}
                </div>
            </Panel>
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