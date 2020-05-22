import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar'
import * as React from 'react'
import { IUserNotificationMessageProps } from './types'

/**
 * @category UserNotifications
 */
export const UserNotificationMessage = ({ model, onDismiss, className }: IUserNotificationMessageProps) => {
    return (
        <MessageBar
            {...model.messageBarProps}
            onDismiss={_ => onDismiss(model)}
            className={className}>
            <span>{model.text} </span>
            {model.moreLink && <a href={model.moreLink}>Read more here</a>}
        </MessageBar>
    )
}