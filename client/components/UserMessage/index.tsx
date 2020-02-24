
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { IUserMessageProps } from './IUserMessageProps';

/**
 * @component UserMessage
 * @description A component that supports a MessageBar with markdown using react-markdown
 */
export const UserMessage = ({ id, text, onClick = undefined, onDismiss = undefined, type = MessageBarType.info, iconName, hidden, style, children }: IUserMessageProps) => {
    return (
        <div
            id={id}
            className='c-UserMessage'
            style={style}
            hidden={hidden}
            onClick={onClick}>
            <MessageBar
                messageBarType={type}
                messageBarIconProps={iconName && { iconName }}
                onDismiss={onDismiss}>
                {text && <ReactMarkdown source={text} escapeHtml={false} skipHtml={false} />}
                {children && children}
            </MessageBar>
        </div>
    );
}