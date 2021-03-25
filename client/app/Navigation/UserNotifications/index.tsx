/* eslint-disable tsdoc/syntax */
import React from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { isEmpty } from 'underscore'
import { MenuItem } from '../UserMenu/MenuItem'
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
        <MenuItem
          iconProps={{ iconName: 'Ringer' }}
          hideText={isBrowser}
          text='Notifications' />
        <div
          style={{ opacity: isEmpty(context.notifications) ? 0 : 1 }}
          className={styles.count}>
          {context.notifications.length}
        </div>
        <NotificationsPanel />
      </div>
    </UserNotificationsContext.Provider>
  )
}

export * from './NotificationsPanel'
export * from './types'

