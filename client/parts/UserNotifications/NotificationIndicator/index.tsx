/* eslint-disable tsdoc/syntax */
import React, { useContext } from 'react'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import styles from './NotificationIndicator.module.scss'

/**
 * @category Function Component
 */
export const NotificationIndicator: React.FC = () => {
  const { notifications, count } = useContext(UserNotificationsContext)
  return (
    <div
      className={styles.root}
      style={{ opacity: _.isEmpty(notifications) ? 0 : 1 }}>
      {count}
    </div>
  )
}
