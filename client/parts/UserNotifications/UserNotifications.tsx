/* eslint-disable tsdoc/syntax */
import { useToggle } from 'hooks/common/useToggle'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { MenuItem } from '../UserMenu/MenuItem'
import { NotificationIndicator } from './NotificationIndicator'
import { NotificationsPanel } from './NotificationsPanel'
import { IUserNotificationsProps } from './types'
import styles from './UserNotifications.module.scss'
import { useAppContext } from 'AppContext'

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
export const UserNotifications: StyledComponent<IUserNotificationsProps> = ({
  renderAsMenuItem
}) => {
  const { t } = useTranslation()
  const context = useAppContext()
  const [isOpen, togglePanel] = useToggle(false)
  if(context.user?.isExternal) return null
  return (
    <>
      {renderAsMenuItem ? (
        <MenuItem
          onClick={togglePanel}
          icon={icon('Alert')}
          text={t('notifications.headerText')}
        >
          <NotificationIndicator
            style={{
              top: 8,
              left: 22,
              height: 12,
              width: 14,
              fontSize: 8
            }}
          />
        </MenuItem>
      ) : (
        <div className={UserNotifications.className} onClick={togglePanel}>
          <div className={styles.icon}>{icon('Alert')}</div>
          <NotificationIndicator />
        </div>
      )}
      <NotificationsPanel open={isOpen} onDismiss={togglePanel} />
    </>
  )
}

UserNotifications.displayName = 'UserNotifications'
UserNotifications.className = styles.userNotifications
