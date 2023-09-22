import {
  Menu,
  MenuItem,
  MenuList,
  MenuPopover,
  MenuTrigger,
  Title3
} from '@fluentui/react-components'
import { Alert } from '@fluentui/react-components/unstable'
import { ConditionalWrapper } from 'components/ConditionalWrapper'
import { Progress } from 'components/Progress'
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import _ from 'underscore'
import { getFluentIcon } from 'utils'
import { IUserMessageProps } from './types'
import styles from './UserMessage.module.scss'
import { useUserMessage } from './useUserMessage'

/**
 * A component that uses `Alert` from [@fluentui/react-components](@fluentui/react-components),
 * conditionally renders a `Menu` from [@fluentui/react-components](@fluentui/react-components).
 *
 * @category Reusable Component
 */
export const UserMessage: ReusableComponent<IUserMessageProps> = (props) => {
  const { containerProps, alertStyle, actions } = useUserMessage(props)
  return (
    <div {...containerProps}>
      <ConditionalWrapper
        condition={!_.isEmpty(actions)}
        wrapper={(children) => (
          <Menu openOnHover={props.openActionsOnHover}>
            <MenuTrigger disableButtonEnhancement>{children}</MenuTrigger>
            <MenuPopover>
              <MenuList>
                {actions.map((action, index) => (
                  <MenuItem {...action} key={index} />
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        )}
      >
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
            <ReactMarkdown
              className={styles.text}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
            >
              {props.text}
            </ReactMarkdown>
          )}
          {props.children}
        </Alert>
      </ConditionalWrapper>
    </div>
  )
}

UserMessage.className = styles.userMessage
UserMessage.defaultProps = {
  intent: 'info',
  actions: [],
  openActionsOnHover: false
}
