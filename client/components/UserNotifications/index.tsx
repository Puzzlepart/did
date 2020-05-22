import { useQuery } from '@apollo/react-hooks'
import { dateAdd, IPnPClientStore, PnPClientStorage } from '@pnp/common'
import { value } from 'helpers'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import { withDefaultProps } from 'with-default-props'
import GET_NOTIFICATIONS, { IGetNotifications } from './GET_NOTIFICATIONS'
import { IUserNotificationsProps, UserNotificationMessageModel } from './types'
import { UserNotificationsPanel } from './UserNotificationsPanel'

const BROWSER_STORAGE: IPnPClientStore = new PnPClientStorage().session

/**
 * @category UserNotifications
 */
const UserNotifications = (props: IUserNotificationsProps) => {
    const [showPanel, setShowPanel] = React.useState(false)
    const [notifications, setNotifications] = React.useState<Set<UserNotificationMessageModel>>(new Set())
    const { loading, data } = useQuery<IGetNotifications>(GET_NOTIFICATIONS, { skip: notifications.size > 0, fetchPolicy: 'cache-first' })

    /**
     * On dismiss notification. Updates state and persists in browser storage.
     * 
     * @param {UserNotificationMessageModel} UserNotificationMessageModel Notification
     */
    const onDismissNotification = (notification: UserNotificationMessageModel) => {
        const _notifications = new Set(notifications)
        _notifications.delete(notification)        
        const _dismissedIds = new Set<string>(BROWSER_STORAGE.get(props.storageKey) || [])
        _dismissedIds.add(notification.id)
        BROWSER_STORAGE.put(props.storageKey, [..._dismissedIds], dateAdd(new Date(), 'year', 1))
        setNotifications(_notifications)
    }


    React.useEffect(() => {
        const _dismissedIds = new Set<string>(BROWSER_STORAGE.get(props.storageKey) || [])
        let _notifications = value(data, 'notifications', []).map(n => new UserNotificationMessageModel(n))
        _notifications = _notifications.filter(n => !_dismissedIds.has(n.id))
        if (_notifications.length > 0) {
            setNotifications(new Set(_notifications))
        }
    }, [loading])

    return (
        <div className={props.className.root} hidden={loading}>
            <div className={props.className.toggle.root} onClick={() => setShowPanel(!showPanel)}>
                <div className={props.className.toggle.icon}>
                    <Icon iconName={props.toggleIcon} styles={props.toggleStyles} />
                </div>
                <div className={props.className.toggle.count}>{notifications.size}</div>
            </div>
            <UserNotificationsPanel
                isOpen={showPanel}
                headerText={props.panelHeaderText}
                notifications={notifications}
                className={props.className.panel.root}
                bodyClassName={props.className.panel.body}
                notificationClassName={props.className.panel.notification}
                onDismiss={() => setShowPanel(false)}
                onDismissNotification={onDismissNotification} />
        </div>
    )
}

export default withDefaultProps(UserNotifications, {
    storageKey: 'did365_notifications_dismissed',
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
})