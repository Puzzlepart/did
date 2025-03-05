import {
  MessageBar,
  MessageBarActions,
  MessageBarBody,
  MessageBarTitle
} from '@fluentui/react-components'
import { Progress } from 'components/Progress'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { getFluentIcon } from 'utils'
import styles from './UserMessage.module.scss'
import { UserMessageAction } from './UserMessageAction/UserMessageAction'
import { IUserMessageProps } from './types'
import { useUserMessage } from './useUserMessage'

/**
 * A component that uses `MessageBar` from [@fluentui/react-components](@fluentui/react-components),
 * conditionally renders a `Menu` from [@fluentui/react-components](@fluentui/react-components).
 *
 * @category Reusable Component
 */
export const UserMessage: ReusableComponent<IUserMessageProps> = (props) => {
  const { containerProps, alertStyle } = useUserMessage(props)
  return (
    <div {...containerProps}>
      <MessageBar
        {...props}
        icon={props.iconName && getFluentIcon(props.iconName)}
        style={alertStyle}
        className={styles.alert}
        layout='auto'
        politeness='assertive'
      >
        <MessageBarBody>
          {props.headerText && (
            <div className={styles.header}>
              <MessageBarTitle>{props.headerText}</MessageBarTitle>
            </div>
          )}
          {props.renderProgress[0] && (
            <Progress text={props.renderProgress[1] ?? props.text} />
          )}
          {props.text && !props.renderProgress[0] && (
            <div className={styles.flex}>
              <ReactMarkdown
                className={styles.text}
                rehypePlugins={[rehypeRaw, rehypeSanitize]}
              >
                {props.text}
              </ReactMarkdown>
            </div>
          )}
          {props.children}
        </MessageBarBody>
        {props.action && (
          <MessageBarActions
            containerAction={<UserMessageAction {...props.action} />}
          />
        )}
      </MessageBar>
    </div>
  )
}

UserMessage.className = styles.userMessage
UserMessage.defaultProps = {
  intent: 'info',
  renderProgress: [false, null]
}
