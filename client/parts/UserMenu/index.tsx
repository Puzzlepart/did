/* eslint-disable tsdoc/syntax */
import { Icon, useTheme } from '@fluentui/react'
import {
  Persona,
  Popover,
  PopoverSurface,
  PopoverTrigger
} from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import { Toast, useToast } from 'components/Toast'
import { useToggle } from 'hooks'
import React, { FC, useEffect, useRef } from 'react'
import { isMobile, MobileView } from 'react-device-detect'
import { useTranslation } from 'react-i18next'
import { getFluentIcon as icon } from 'utils/getFluentIcon'
import { UserFeedback } from '../UserFeedback'
import { UserNotifications } from '../UserNotifications'
import { NotificationIndicator } from '../UserNotifications/NotificationIndicator'
import { Divider } from './Divider'
import { MenuItem } from './MenuItem'
import { UserAvatar } from './UserAvatar'
import styles from './UserMenu.module.scss'
import { UserReports } from './UserReports'
import { UserSettings } from './UserSettings'
import { UserVacation } from './UserVacation'

/**
 * @category Function Component
 */
export const UserMenu: FC = () => {
  const { t } = useTranslation()
  const { user, subscription } = useAppContext()
  const { palette } = useTheme()
  const [menuHidden, toggleMenu] = useToggle(true)
  const target = useRef(null)
  const [toast, setToast] = useToast(8000)

  useEffect(() => {
    setToast({
      text: sessionStorage.did_on_load_user_menu_mesage,
      intent: 'success'
    })
    sessionStorage.removeItem('did_on_load_user_menu_mesage')
  }, [])

  return (
    <Popover withArrow={true}>
      <PopoverTrigger>
        <span ref={target} className={styles.root} onClick={() => toggleMenu()}>
          <Persona
            className={styles.user}
            name={user.displayName}
            secondaryText={user.mail}
            avatar={{
              image: {
                src: user.photo?.base64
              }
            }}
            size='small'
          />
          <span hidden={isMobile}>
            <Icon
              iconName={menuHidden ? 'ChevronDown' : 'ChevronUp'}
              styles={{ root: { color: 'white', marginLeft: 6 } }}
            />
          </span>
          <MobileView renderWithFragment={true}>
            <NotificationIndicator />
          </MobileView>
          <Toast {...toast} />
        </span>
      </PopoverTrigger>
      <PopoverSurface className={styles.menu}>
        <MenuItem
          text={subscription.name}
          style={{
            padding: '0 2px 2px 12px',
            color: palette.neutralSecondary,
            fontSize: 8,
            fontWeight: 600
          }}
        />
        <UserAvatar />
        <UserVacation />
        <UserReports />
        <Divider />
        <UserSettings />
        <MobileView renderWithFragment={true}>
          <Divider />
          <UserNotifications renderAsMenuItem={true} />
          <Divider />
          <UserFeedback renderAsMenuItem={true} />
        </MobileView>
        <Divider />
        <MenuItem
          href='/auth/signout'
          icon={icon('SignOut')}
          text={t('common.signOutText')}
        />
        <MenuItem
          style={{
            textAlign: 'right',
            fontSize: 10,
            padding: 8,
            color: 'rgb(96, 94, 92)'
          }}
          text={`v${process.env.VERSION}`}
        />
      </PopoverSurface>
    </Popover>
  )
}
