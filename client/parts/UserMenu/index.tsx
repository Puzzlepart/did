/* eslint-disable tsdoc/syntax */
import { Callout, Icon, Persona, PersonaSize, useTheme } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import { useToggle } from 'hooks'
import React, { useRef } from 'react'
import { BrowserView, isMobile, MobileView } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { UserFeedback } from '../UserFeedback'
import { UserNotifications } from '../UserNotifications'
import { NotificationIndicator } from '../UserNotifications/NotificationIndicator'
import { Divider } from './Divider'
import { MenuItem } from './MenuItem'
import styles from './UserMenu.module.scss'
import { UserReports } from './UserReports'
import { UserSettings } from './UserSettings'

/**
 * @category Function Component
 */
export const UserMenu: React.FC = () => {
  const { t } = useTranslation()
  const { user, subscription } = useAppContext()
  const { semanticColors, palette } = useTheme()
  const [menuHidden, toggleMenu] = useToggle(true)
  const target = useRef(null)
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
        gapSpace={-8}>
        <FadeIn className={styles.menu}>
          <MenuItem
            text={subscription.name}
            style={{
              padding: '0 2px 2px 12px',
              color: palette.neutralSecondary,
              fontSize: 10
            }}
          />
          <MenuItem>
            <Persona
              text={user.displayName}
              secondaryText={user.mail}
              tertiaryText={user.role.name}
              imageUrl={user.photo?.base64}
              size={PersonaSize.size40}
              onRenderTertiaryText={() => (
                <div>
                  <Icon
                    iconName='Permissions'
                    styles={{ root: { color: '#444', margin: '2px 4px 0 0' } }}
                  />
                  <span>{user.role.name}</span>
                </div>
              )}
              styles={{ tertiaryText: { display: 'block', fontSize: 10 } }}
            />
          </MenuItem>
          <BrowserView renderWithFragment={true}>
            <UserReports />
          </BrowserView>
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
            text={`v${process.env.VERSION} - ${new Date(user.lastActive).toLocaleString() || ''} `}
          />
        </FadeIn>
      </Callout>
    </>
  )
}
