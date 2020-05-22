import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import * as React from 'react'
import { IUserNotificationMessageProps } from './types'
import styles from './UserNotificationMessage.module.scss'

/**
 * @category UserNotifications
 */
export const UserNotificationMessage = ({ model, onDismiss }: IUserNotificationMessageProps) => {
    return (
        <MessageBar
            {...model.messageBarProps}
            onDismiss={() => onDismiss(model)}
            className={styles.root}>
            <span>{model.text} </span>
            {model.moreLink && <a href={model.moreLink}>Read more here</a>}
        </MessageBar>
    )
}