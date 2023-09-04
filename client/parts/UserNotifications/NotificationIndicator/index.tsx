/* eslint-disable tsdoc/syntax */
import React, { FC, HTMLProps, useContext } from 'react'
import _ from 'underscore'
import { UserNotificationsContext } from '../context'
import styles from './NotificationIndicator.module.scss'


/**
 * @category Function Component
 */
export const NotificationIndicator: FC<HTMLProps<HTMLDivElement>> = (
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
