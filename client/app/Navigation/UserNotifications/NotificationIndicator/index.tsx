/* eslint-disable tsdoc/syntax */
import React from 'react'
import { isEmpty } from 'underscore'
import { useUserNotifications } from '../useUserNotifications'
import styles from './NotificationIndicator.module.scss'

/**
 * @category Function Component
 */
export const NotificationIndicator: React.FC = () => {
  const { notifications } = useUserNotifications()
  return (
    <div
      className={styles.root}
      style={{ opacity: isEmpty(notifications) ? 0 : 1 }}>
      {notifications.length}
    </div>
  )
}
