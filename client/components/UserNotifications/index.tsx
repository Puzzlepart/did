import { useQuery } from '@apollo/client'
import { dateAdd, IPnPClientStore, PnPClientStorage } from '@pnp/common'
import { AppContext } from 'AppContext'
import { getValue } from 'helpers'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import React, { useContext, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
import GET_NOTIFICATIONS, { IGetNotifications, IGetNotificationsVariables } from './GET_NOTIFICATIONS'
import { NotificationsPanel } from './NotificationsPanel'
import { NotificationModel } from './types'
import styles from './UserNotifications.module.scss'

const BROWSER_STORAGE: IPnPClientStore = new PnPClientStorage().session
const STORAGE_KEY = 'did365_dismissed_notifications'

export const UserNotifications = () => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    const [showPanel, setShowPanel] = useState(false)
    const [notifications, setNotifications] = useState<Set<NotificationModel>>(new Set())
    const { loading, data } = useQuery<IGetNotifications, IGetNotificationsVariables>(
        GET_NOTIFICATIONS,
        {
            variables: {
                templates: t('notifications.templates', { returnObjects: true }),
                locale: user.language,
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


    useEffect(() => {
        const _dismissedIds = new Set<string>(BROWSER_STORAGE.get(STORAGE_KEY) || [])
        let _notifications = getValue(data, 'notifications', []).map(n => new NotificationModel(n))
        _notifications = _notifications.filter(n => !_dismissedIds.has(n.id))
        if (_notifications.length > 0) {
            setNotifications(new Set(_notifications))
        }
    }, [loading])

    return (
        <>
            <a hidden={loading} className={styles.root} onClick={() => setShowPanel(!showPanel)}>
                <div className={styles.icon}>
                    <Icon iconName='Ringer' />
                </div>
                <div
                    hidden={notifications.size === 0}
                    className={styles.count}>{notifications.size}</div>
            </a>
            <NotificationsPanel
                isOpen={showPanel}
                notifications={notifications}
                onDismiss={() => setShowPanel(false)}
                onDismissNotification={onDismissNotification} />
        </>
    )
}