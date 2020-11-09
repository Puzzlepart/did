import { UserMessage } from 'components/UserMessage'
import { Panel } from 'office-ui-fabric'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import { UserNotification } from '../UserNotification'
import { INotificationsPanelProps } from './types'
import styles from './UserNotificationsPanel.module.scss'

export const NotificationsPanel = (props: INotificationsPanelProps) => {
    const { t } = useTranslation()
    return (
        <Panel
            isOpen={props.isOpen}
            className={styles.root}
            headerText={t('notifications.headerText')}
            onDismiss={props.onDismiss}
            isLightDismiss={true}>
            <div className={styles.body}>
                <div hidden={props.notifications.size > 0}>
                    <UserMessage text={t('notifications.emptyText')} />
                </div>
                <div hidden={props.notifications.size === 0}>
                    {[...props.notifications].map((n, idx) => (
                        <UserNotification
                            key={idx}
                            model={n}
                            onDismiss={props.onDismissNotification} />
                    ))}
                </div>
            </div>
        </Panel>
    )
}