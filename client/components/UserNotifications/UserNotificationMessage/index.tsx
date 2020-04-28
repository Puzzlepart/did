import { MessageBar } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import { IUserNotificationMessageProps } from '../types';

/**
 * @component UserNotificationMessage
 */
export const UserNotificationMessage = ({ model, className }: IUserNotificationMessageProps) => {
    return (
        <MessageBar  {...model.messageBarProps} className={className}>
            <span>{model.text} </span>
            {model.moreLink && <a href={model.moreLink}>Read more here</a>}
        </MessageBar>
    );
}