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
import { ReusableComponent } from 'components/types'
import React from 'react'
import ReactMarkdown from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import rehypeSanitize from 'rehype-sanitize'
import _ from 'underscore'
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
  const { className, container } = useUserMessage(props)

  return (
    <div {...container}>
      <ConditionalWrapper
        condition={!_.isEmpty(props.actions)}
        wrapper={(children: any) => (
          <Menu openOnHover={props.openActionsOnHover}>
            <MenuTrigger disableButtonEnhancement>{children}</MenuTrigger>
            <MenuPopover>
              <MenuList>
                {props.actions.map((action, index) => (
                  <MenuItem {...action} key={index} />
                ))}
              </MenuList>
            </MenuPopover>
          </Menu>
        )}
      >
        <Alert {...props} className={className}>
          <div style={props.innerStyle}>
            {props.headerText && (
              <Title3 className={styles.header}>{props.headerText}</Title3>
            )}
            {props.text && (
              <ReactMarkdown rehypePlugins={[rehypeRaw, rehypeSanitize]}>
                {props.text}
              </ReactMarkdown>
            )}
            {props.children}
          </div>
        </Alert>
      </ConditionalWrapper>
    </div>
  )
}

UserMessage.defaultProps = {
  actions: [],
  openActionsOnHover: false
}

export * from './types'
export * from './useMessage'
