/* eslint-disable tsdoc/syntax */
import React, { useContext } from 'react'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import styles from './NotificationIndicator.module.scss'

/**
 * @category Function Component
 */
export const NotificationIndicator: StyledComponent = (props) => {
  const { notifications, count } = useContext(UserNotificationsContext)
  return (
    <div
      className={NotificationIndicator.className}
      style={{ ...props.style, opacity: _.isEmpty(notifications) ? 0 : 1 }}
    >
      {count}
    </div>
  )
}

NotificationIndicator.displayName = 'NotificationIndicator'
NotificationIndicator.className = styles.notificationIndicator
