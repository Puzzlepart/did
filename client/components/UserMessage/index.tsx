/* eslint-disable tsdoc/syntax */
import { MessageBar } from '@fluentui/react'
import React from 'react'
import ReactMarkdown from 'react-markdown/with-html'
import { IUserMessageProps } from './types'
import styles from './UserMessage.module.scss'
import { useUserMessage } from './useUserMessage'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
 *
 * @category Function Component
 */
export const UserMessage: React.FC<IUserMessageProps> = (props) => {
  const { messageBarStyles, messageBarType } = useUserMessage(props)

  return (
    <div
      id={props.id}
      className={`${styles.root} ${props.className}`}
      style={props.containerStyle}
      hidden={props.hidden}
      onClick={props.onClick}>
      <MessageBar
        styles={messageBarStyles}
        isMultiline={props.isMultiline}
        messageBarType={messageBarType}
        messageBarIconProps={props.iconName && { iconName: props.iconName }}
        onDismiss={props.onDismiss}
        actions={props.actions}>
        <div style={props.innerStyle}>
          {props.headerText && (
            <div className={styles.header}>{props.headerText}</div>
          )}
          {props.text && (
            <ReactMarkdown source={props.text} escapeHtml={false} />
          )}
          {props.children && props.children}
        </div>
      </MessageBar>
    </div>
  )
}

export * from './types'
export * from './useMessage'
