import { Menu, MenuItem, MenuList, MenuPopover, MenuTrigger } from '@fluentui/react-components'
import { ConditionalWrapper } from 'components'
import React from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { getFluentIcon } from 'utils'
import { IUserMessageProps } from '../types'
import styles from './UserMessageActions.module.scss'

export const UserMessageActions: StyledComponent<
  Pick<IUserMessageProps, 'actions'>
> = (props) => {
  return (
    <ConditionalWrapper
      condition={!_.isEmpty(props.actions)}
      wrapper={(children) => (
        <Menu openOnHover={true}>
          <MenuTrigger disableButtonEnhancement>{children}</MenuTrigger>
          <MenuPopover>
            <MenuList>
              {props.actions.map((action, index) => (
                <MenuItem
                  key={index}
                  content={action.text}
                  onClick={() => action.onClick(null)}
                  icon={getFluentIcon(action.iconName, true, action.iconColor)}
                />
              ))}
            </MenuList>
          </MenuPopover>
        </Menu>
      )}>
      {props.children}
    </ConditionalWrapper>
  )
}
UserMessageActions.displayName = 'UserMessageActions'
UserMessageActions.className = styles.userMessageActions
UserMessageActions.defaultProps = {
  actions: []
}
