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
  const { container, message } = useUserMessage(props)

  return (
    <div {...container}>
      <MessageBar {...message}>
        <div style={props.innerStyle}>
          {props.headerText && (
            <div className={styles.header}>{props.headerText}</div>
          )}
          {props.text && (
            <ReactMarkdown
              source={props.text}
              escapeHtml={false} />
          )}
          {props.children}
        </div>
      </MessageBar>
    </div>
  )
}

export * from './types'
export * from './useMessage'

