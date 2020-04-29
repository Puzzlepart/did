
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar';
import * as React from 'react';
import ReactMarkdown from 'react-markdown/with-html';
import { IUserMessageProps } from './IUserMessageProps';

/**
 * A component that supports a MessageBar with markdown using react-markdown
 * 
 * @category UserMessage
 */
export const UserMessage = (props: IUserMessageProps) => {
    return (
        <div
            id={props.id}
            className='c-UserMessage'
            style={props.style}
            hidden={props.hidden}
            onClick={props.onClick}>
            <MessageBar
                isMultiline={props.isMultiline}
                messageBarType={props.type}
                messageBarIconProps={props.iconName && { iconName: props.iconName }}
                onDismiss={props.onDismiss}
                actions={props.actions}>
                {props.text && <ReactMarkdown source={props.text} escapeHtml={false} skipHtml={false} />}
                {props.children && props.children}
            </MessageBar>
        </div>
    );
}