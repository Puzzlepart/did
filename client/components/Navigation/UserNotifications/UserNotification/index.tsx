import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import { Link } from 'office-ui-fabric-react/lib/Link'
import * as React from 'react'
import { IUserNotificationProps } from './types'
import styles from './UserNotificationMessage.module.scss'
import { useTranslation } from 'react-i18next'

/**
 * @category UserNotifications
 */
export const UserNotificationActions = ({ model }: IUserNotificationProps) => {
    const { t } = useTranslation('notifications')
    if (!model.moreLink) return null
    return <Link href={model.moreLink}>{model.getMoreLinkText(t)}</Link>
}

/**
 * @category UserNotifications
 */
export const UserNotification = ({ model, onDismiss }: IUserNotificationProps) => {
    return (
        <MessageBar
            {...model.messageProps}
            onDismiss={() => onDismiss(model)}
            className={styles.root}
            styles={{ actions: { flexDirection: 'row', paddingLeft: 28 } }}
            actions={<UserNotificationActions model={model} />}>
            <span className={styles.text}>{model.text}</span>
        </MessageBar>
    )
}