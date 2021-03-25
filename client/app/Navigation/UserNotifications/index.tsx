/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../UserMenu/MenuItem'
import { UserNotificationsContext } from './context'
import { NotificationIndicator } from './NotificationIndicator'
import { NotificationsPanel } from './NotificationsPanel'
import { IUserNotificationsProps } from './types'
import styles from './UserNotifications.module.scss'
import { useUserNotifications } from './useUserNotifications'

/**
 * User notifications
 * 
 * Can be rendered as a `<MenuItem />` if `renderAsMenuItem`
 * is set to `true`.
 * 
 * An icon name is optional and defaults to **Ringer**
 * 
 * @category Function Component
 */
export const UserNotifications: React.FC<IUserNotificationsProps> = ({ renderAsMenuItem, iconName = 'Ringer' }) => {
  const { t } = useTranslation()
  const context = useUserNotifications()
  return (
    <UserNotificationsContext.Provider value={context}>
      {renderAsMenuItem ?
        <MenuItem
          onClick={context.showPanel}
          iconProps={{ iconName }}
          text={t('notifications.headerText')} />
        : (
          <div className={styles.root} onClick={context.showPanel}>
            <div className={styles.icon}>
              <Icon iconName={iconName} />
            </div>
            <NotificationIndicator />
          </div>
        )
      }
      <NotificationsPanel />
    </UserNotificationsContext.Provider>
  )
}

export * from './NotificationsPanel'
export * from './types'

