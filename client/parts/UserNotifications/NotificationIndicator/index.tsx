/* eslint-disable tsdoc/syntax */
import React, { useContext } from 'react'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import styles from './NotificationIndicator.module.scss'

/**
 * @category Function Component
 */
export const NotificationIndicator: React.FC = () => {
  const context = useContext(UserNotificationsContext)
  // eslint-disable-next-line no-console
  console.log(context)
  return (
    <div
      className={styles.root}
      style={{ opacity: _.isEmpty(context.notifications) ? 0 : 1 }}
    >
      {context.count}
    </div>
  )
}
