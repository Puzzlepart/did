import { UserMessage } from 'components/UserMessage'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { UserNotificationMessage } from '../UserNotificationMessage'
import { IUserNotificationsPanelProps } from './types'
import styles from './UserNotificationsPanel.module.scss'

/**
 * @category UserNotifications
 */
export const UserNotificationsPanel = (props: IUserNotificationsPanelProps) => {
    const { t } = useTranslation('notifications')
    return (
        <Panel
            isOpen={props.isOpen}
            className={styles.root}
            headerText={t('headerText')}
            onDismiss={props.onDismiss}
            isLightDismiss={true}>
            <div className={styles.body}>
                <div hidden={props.notifications.size > 0}>
                    <UserMessage text={t('emptyText')} />
                </div>
                <div hidden={props.notifications.size === 0}>
                    {[...props.notifications].map((n, idx) => (
                        <UserNotificationMessage
                            key={idx}
                            model={n}
                            onDismiss={props.onDismissNotification} />
                    ))}
                </div>
            </div>
        </Panel>
    )
}