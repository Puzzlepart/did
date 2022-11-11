/* eslint-disable tsdoc/syntax */
import React, { FC, useContext } from 'react'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import styles from './NotificationIndicator.module.scss'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface INotificationIndicatorProps
  extends React.HTMLProps<HTMLDivElement> {}

/**
 * @category Function Component
 */
export const NotificationIndicator: FC<INotificationIndicatorProps> = (
  props
) => {
  const { notifications, count } = useContext(UserNotificationsContext)
  return (
    <div
      className={styles.root}
      style={{ ...props.style, opacity: _.isEmpty(notifications) ? 0 : 1 }}
    >
      {count}
    </div>
  )
}
