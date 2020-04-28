import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { IUserNotificationMessageProps } from '../types';

/**
 * @component UserNotificationMessage
 */
export const UserNotificationMessage = (props: IUserNotificationMessageProps) => {
    return (
        <MessageBar itemID={props.itemID} {...props}>{props.content}</MessageBar>
    );
}