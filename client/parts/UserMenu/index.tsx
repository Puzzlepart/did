/* eslint-disable tsdoc/syntax */
import { Callout, Icon, Persona, PersonaSize, useTheme } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { Toast, useToast } from 'components/Toast'
import { useToggle } from 'hooks'
import React, { FC, useEffect, useRef } from 'react'
import { isMobile, MobileView } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
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
  const { semanticColors, palette } = useTheme()
  const [menuHidden, toggleMenu] = useToggle(true)
  const target = useRef(null)
  const [toast, setToast] = useToast(8000, { isMultiline: true })

  useEffect(() => {
    setToast({
      text: sessionStorage.did_on_load_user_menu_mesage,
      type: 'success'
    })
    sessionStorage.removeItem('did_on_load_user_menu_mesage')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      <span ref={target} className={styles.root} onClick={() => toggleMenu()}>
        <Persona
          className={styles.user}
          text={user.displayName}
          secondaryText={user.mail}
          imageUrl={user.photo?.base64}
          size={PersonaSize.size32}
          hidePersonaDetails={isMobile}
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
      </span>
      <Callout
        hidden={menuHidden}
        styles={{
          calloutMain: {
            background: semanticColors.menuBackground,
            borderRadius: 6
          }
        }}
        target={target?.current}
        onDismiss={toggleMenu}
        isBeakVisible={false}
        gapSpace={-8}
      >
        <FadeIn className={styles.menu}>
          <MenuItem
            text={subscription.name}
            style={{
              padding: '0 2px 2px 12px',
              color: palette.neutralSecondary,
              fontSize: 10
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
            iconProps={{ iconName: 'SignOut' }}
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
        </FadeIn>
      </Callout>
      <Toast {...toast} />
    </>
  )
}
