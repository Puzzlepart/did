import { Icon } from 'office-ui-fabric'
import React, { FunctionComponent } from 'react'
import { isEmpty } from 'underscore'
import { UserNotificationsContext } from './context'
import { NotificationsPanel } from './NotificationsPanel'
import styles from './UserNotifications.module.scss'
import { useUserNotifications } from './useUserNotifications'

export const UserNotifications: FunctionComponent = () => {
  const context = useUserNotifications()

  return (
    <UserNotificationsContext.Provider value={context}>
      <div className={styles.root} onClick={context.showPanel}>
        <a>
          <div className={styles.icon}>
            <Icon iconName='Ringer' />
          </div>
          <div hidden={isEmpty(context.notifications)} className={styles.count}>
            {context.notifications.length}
          </div>
        </a>
        <NotificationsPanel />
      </div>
    </UserNotificationsContext.Provider>
  )
}
