import { Panel } from 'office-ui-fabric-react/lib/Panel'
import * as React from 'react'
import { UserNotificationMessage } from '../UserNotificationMessage'
import { IUserNotificationsPanelProps } from './types'
import styles from './UserNotificationsPanel.module.scss'

/**
 * @category UserNotifications
 */
export const UserNotificationsPanel = (props: IUserNotificationsPanelProps) => {
    return (
        <Panel
            type={props.type}
            isOpen={props.isOpen}
            className={styles.root}
            headerText='Notifications'
            onDismiss={props.onDismiss}
            isLightDismiss={true}>
            <div className={styles.body}>
                {[...props.notifications].map((n, idx) => (
                    <UserNotificationMessage
                        key={idx}
                        model={n}
                        onDismiss={props.onDismissNotification} />
                ))}
            </div>
        </Panel>
    )
}