/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import React from 'react'
import { isMobile } from 'react-device-detect'
import { isEmpty } from 'underscore'
import { UserNotificationsContext } from './context'
import { NotificationsPanel } from './NotificationsPanel'
import styles from './UserNotifications.module.scss'
import { useUserNotifications } from './useUserNotifications'

/**
 * @category Function Component
 */
export const UserNotifications: React.FC<{ mobile?: boolean }> = ({ mobile }) => {
  const context = useUserNotifications()
  if (isMobile && !mobile) return null
  return (
    <UserNotificationsContext.Provider value={context}>
      <div className={styles.root} onClick={context.showPanel}>
        <a>
          <div className={styles.icon}>
            <Icon iconName='Ringer' />
          </div>
          <div
            style={{ opacity: isEmpty(context.notifications) ? 0 : 1 }}
            className={styles.count}>
            {context.notifications.length}
          </div>
        </a>
        <NotificationsPanel />
      </div>
    </UserNotificationsContext.Provider>
  )
}

export * from './NotificationsPanel'
export * from './types'

