import { Title3 } from '@fluentui/react-components'
import { Alert } from '@fluentui/react-components/unstable'
import { Progress } from 'components/Progress'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import { getFluentIcon } from 'utils'
import styles from './UserMessage.module.scss'
import { UserMessageActions } from './UserMessageActions/UserMessage'
import { IUserMessageProps } from './types'
import { useUserMessage } from './useUserMessage'

/**
 * A component that uses `Alert` from [@fluentui/react-components](@fluentui/react-components),
 * conditionally renders a `Menu` from [@fluentui/react-components](@fluentui/react-components).
 *
 * @category Reusable Component
 */
export const UserMessage: ReusableComponent<IUserMessageProps> = (props) => {
  const { containerProps, alertStyle } = useUserMessage(props)
  return (
    <div {...containerProps}>
      <UserMessageActions actions={props.actions}>
        <Alert
          {...props}
          icon={props.iconName && getFluentIcon(props.iconName)}
          style={alertStyle}
          className={styles.alert}
        >
          {props.headerText && (
            <Title3 className={styles.header}>{props.headerText}</Title3>
          )}
          {props.renderProgress && <Progress text={props.text} />}
          {props.text && !props.renderProgress && (
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
        </Alert>
      </UserMessageActions>
    </div>
  )
}

UserMessage.className = styles.userMessage
UserMessage.defaultProps = {
  intent: 'info',
  actions: []
}
