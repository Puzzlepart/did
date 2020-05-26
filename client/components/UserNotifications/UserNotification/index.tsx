import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import { Link } from 'office-ui-fabric-react/lib/Link'
import * as React from 'react'
import { IUserNotificationProps } from './types'
import styles from './UserNotificationMessage.module.scss'
import { useTranslation } from 'react-i18next'

export const UserNotificationActions = ({ model }: IUserNotificationProps) => {
    const { t } = useTranslation('notifications')
    if (model.moreLink) {
        return <Link className={styles.moreLink} href={model.moreLink}>{model.getMoreLinkText(t)}</Link>
    }
    return null
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
            actions={<UserNotificationActions model={model} />}>
            <div className={styles.text}>{model.text}</div>
        </MessageBar>
    )
}