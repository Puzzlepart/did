import { MessageBar } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { IUserMessageProps } from './types'
import styles from './UserMessage.module.scss'
import { useUserMessage } from './useUserMessage'
import { useUserMessageStyles } from './useUserMessageStyles'

/**
 * A component that supports a `<MessageBar />` with
 * markdown using `react-markdown`.
 *
 * @category Reusable Component
 */
export const UserMessage: ReusableComponent<IUserMessageProps> = (props) => {
  const { container, message } = useUserMessage(props)
  const classNames = useUserMessageStyles(props.type)

  return (
    <div {...container}>
      <MessageBar {...message} className={classNames.root}>
        <div style={props.innerStyle}>
          {props.headerText && (
            <div className={styles.header}>{props.headerText}</div>
          )}
          {props.text && (
            // Change after upgrading ReactMarkdown from 6 to 8 - with-html is deprecated
            // see https://github.com/remarkjs/react-markdown/blob/bd8e53b4969a0a6f5cfd0fb1d4fe5d97d2cfa630/changelog.md#remove-buggy-html-in-markdown-parser
            <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
              {props.text}
            </ReactMarkdown>
          )}
          {props.children}
        </div>
      </MessageBar>
    </div>
  )
}

export * from './types'
export * from './useMessage'
