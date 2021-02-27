import { Icon } from 'office-ui-fabric'
import React, { FunctionComponent, useState } from 'react'
import { isEmpty } from 'underscore'
import { NotificationsPanel } from './NotificationsPanel'
import { IUserNotificationsState } from './types'
import styles from './UserNotifications.module.scss'
import { useUserNotifications } from './useUserNotifications'

export const UserNotifications: FunctionComponent = () => {
  const state = useState<IUserNotificationsState>({})
  const {
    notifications,
    panelOpen,
    showPanel,
    dismissPanel
  } = useUserNotifications(state)

  return (
    <div className={styles.root}>
      <a onClick={showPanel}>
        <div className={styles.icon}>
          <Icon iconName='Ringer' />
        </div>
        <div hidden={isEmpty(notifications)} className={styles.count}>
          {notifications.length}
        </div>
      </a>
      <NotificationsPanel
        isOpen={panelOpen}
        onDismiss={dismissPanel}
        notifications={notifications}
      />
    </div>
  )
}
