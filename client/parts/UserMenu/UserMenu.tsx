import { useTheme } from '@fluentui/react'
import {
  Popover,
  PopoverSurface
} from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import React from 'react'
import { MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { UserFeedback } from '../UserFeedback'
import { UserNotifications } from '../UserNotifications'
import { MenuItem } from './MenuItem'
import { UserAvatar } from './UserAvatar'
import styles from './UserMenu.module.scss'
import { UserMenuTrigger } from './UserMenuTrigger'
import { UserReports } from './UserReports'
import { UserSettings } from './UserSettings'
import { UserVacation } from './UserVacation'

/**
 * @category Function Component
 */
export const UserMenu: StyledComponent = () => {
  const { t } = useTranslation()
  const { subscription } = useAppContext()
  const { palette } = useTheme()
  return (
    <Popover withArrow={true}>
      <UserMenuTrigger />
      <PopoverSurface className={UserMenu.className}>
        <MenuItem
          text={subscription.name}
          className={styles.subscription}
          style={{ color: palette.neutralSecondary }}
        />
        <UserAvatar />
        <UserVacation />
        <UserReports />
        <UserSettings />
        <MobileView renderWithFragment={true}>
          <UserNotifications renderAsMenuItem={true} />
          <UserFeedback renderAsMenuItem={true} />
        </MobileView>
        <MenuItem
          href='/auth/signout'
          text={t('common.signOutText')}
        />
        <span className={styles.version}>
          {`v${process.env.VERSION}`}
        </span>
      </PopoverSurface>
    </Popover>
  )
}

UserMenu.displayName = 'UserMenu'
UserMenu.className = styles.userMenu
