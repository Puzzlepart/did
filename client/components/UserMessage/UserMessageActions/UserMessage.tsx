import { Link } from '@fluentui/react-components'
import React from 'react'
import { StyledComponent } from 'types'
import { getFluentIcon } from 'utils'
import { IUserMessageProps } from '../types'
import styles from './UserMessageActions.module.scss'

export const UserMessageActions: StyledComponent<
  Pick<IUserMessageProps, 'actions'>
> = (props) => {
  return (
    <div className={UserMessageActions.className}>
      {props.actions.map((action, index) => (
        <Link
          key={index}
          className={styles.actionLink}
          onClick={() => action.onClick(null)}
        >
          {getFluentIcon(action.iconName, true, null, 16)}
          <span>{action.text}</span>
        </Link>
      ))}
    </div>
  )
}
UserMessageActions.displayName = 'UserMessageActions'
UserMessageActions.className = styles.userMessageActions
UserMessageActions.defaultProps = {
  actions: []
}
