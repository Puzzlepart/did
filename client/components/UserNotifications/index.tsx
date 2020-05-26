import { useQuery } from '@apollo/react-hooks'
import { dateAdd, IPnPClientStore, PnPClientStorage } from '@pnp/common'
import { value } from 'helpers'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import * as React from 'react'
import styles from './UserNotifications.module.scss'
import GET_NOTIFICATIONS, { IGetNotifications } from './GET_NOTIFICATIONS'
import { NotificationModel } from './types'
import { NotificationsPanel } from './NotificationsPanel'
import { useTranslation } from 'react-i18next'

const BROWSER_STORAGE: IPnPClientStore = new PnPClientStorage().session
const STORAGE_KEY = 'did365_dismissed_notifications'

/**
 * @category UserNotifications
 */
export const UserNotifications = () => {
    const { t } = useTranslation('notifications')
    const [showPanel, setShowPanel] = React.useState(false)
    const [notifications, setNotifications] = React.useState<Set<NotificationModel>>(new Set())
    const { loading, data } = useQuery<IGetNotifications>(
        GET_NOTIFICATIONS,
        {
            variables: {
                templates: t('templates', { returnObjects: true })
            },
            skip: notifications.size > 0,
            fetchPolicy: 'cache-and-network',
        })

    /**
     * On dismiss notification. Updates state and persists in browser storage.
     * 
     * @param {NotificationModel} notification Notification
     */
    const onDismissNotification = (notification: NotificationModel) => {
        const _notifications = new Set(notifications)
        _notifications.delete(notification)
        const _dismissedIds = new Set<string>(BROWSER_STORAGE.get(STORAGE_KEY) || [])
        _dismissedIds.add(notification.id)
        BROWSER_STORAGE.put(STORAGE_KEY, [..._dismissedIds], dateAdd(new Date(), 'year', 1))
        setNotifications(_notifications)
    }


    React.useEffect(() => {
        const _dismissedIds = new Set<string>(BROWSER_STORAGE.get(STORAGE_KEY) || [])
        let _notifications = value(data, 'notifications', []).map(n => new NotificationModel(n))
        _notifications = _notifications.filter(n => !_dismissedIds.has(n.id))
        if (_notifications.length > 0) {
            setNotifications(new Set(_notifications))
        }
    }, [loading])

    return (
        <>
            <div hidden={loading} className={styles.root} onClick={() => setShowPanel(!showPanel)}>
                <div className={styles.icon}>
                    <Icon iconName='Ringer' />
                </div>
                <div
                    hidden={notifications.size === 0}
                    className={styles.count}>{notifications.size}</div>
            </div>
            <NotificationsPanel
                isOpen={showPanel}
                notifications={notifications}
                onDismiss={() => setShowPanel(false)}
                onDismissNotification={onDismissNotification} />
        </>
    )
}