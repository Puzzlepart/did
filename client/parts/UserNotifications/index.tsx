/* eslint-disable tsdoc/syntax */
import { Icon } from '@fluentui/react'
import { useToggle } from 'hooks/common/useToggle'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { MenuItem } from '../UserMenu/MenuItem'
import { NotificationIndicator } from './NotificationIndicator'
import { NotificationsPanel } from './NotificationsPanel'
import { IUserNotificationsProps } from './types'
import styles from './UserNotifications.module.scss'

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
export const UserNotifications: FC<IUserNotificationsProps> = ({
  renderAsMenuItem,
  iconName = 'Ringer'
}) => {
  const { t } = useTranslation()
  const [isOpen, togglePanel] = useToggle(false)
  return (
    <>
      {renderAsMenuItem ? (
        <MenuItem
          onClick={togglePanel}
          iconProps={{ iconName }}
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
        <div className={styles.root} onClick={togglePanel}>
          <div className={styles.icon}>
            <Icon iconName={iconName} />
          </div>
          <NotificationIndicator />
        </div>
      )}
      <NotificationsPanel isOpen={isOpen} onDismiss={togglePanel} />
    </>
  )
}

export * from './NotificationsPanel'
export * from './types'
