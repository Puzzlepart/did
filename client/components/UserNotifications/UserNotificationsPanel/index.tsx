import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import * as React from 'react'
import { UserNotificationMessage } from '../UserNotificationMessage'
import { IUserNotificationsPanelProps } from './types'

/**
 * @category UserNotifications
 */
export const UserNotificationsPanel = (props: IUserNotificationsPanelProps) => {
    return (
        <Panel
            type={props.type}
            isOpen={props.isOpen}
            className={props.className}
            headerText={props.headerText}
            onDismiss={props.onDismiss}
            isLightDismiss={true}>
            <div className={props.bodyClassName}>
                {[...props.notifications].map((n, idx) => (
                    <UserNotificationMessage
                        key={idx}
                        model={n}
                        onDismiss={props.onDismissNotification}
                        className={props.notificationClassName} />
                ))}
            </div>
        </Panel>
    )
}