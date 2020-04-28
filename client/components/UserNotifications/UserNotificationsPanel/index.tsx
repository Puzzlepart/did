import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';
import { IUserNotificationsPanelProps } from '../types';
import { UserNotificationMessage } from '../UserNotificationMessage';

/**
 * @component UserNotificationsPanel
 */
export const UserNotificationsPanel = (props: IUserNotificationsPanelProps) => {
    return (
        <Panel
            type={PanelType.smallFixedFar}
            isOpen={props.isOpen}
            className={props.className.root}
            headerText={props.headerText}
            onDismiss={props.onDismiss}
            isLightDismiss={true}>
            <div className={props.className.body}>
                {props.notifications.map((n, idx) => (
                    <UserNotificationMessage
                        key={idx}
                        model={n}
                        className={props.className.notification} />
                ))}
            </div>
        </Panel>
    );
}