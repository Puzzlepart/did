/* eslint-disable tsdoc/syntax */
import { useAppContext } from 'AppContext'
import { Callout, Icon, Persona, PersonaSize } from 'office-ui-fabric-react'
import React, { useRef, useState } from 'react'
import { isMobile } from 'react-device-detect'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
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
  const [menuHidden, setMenuHidden] = useState(true)
  const target = useRef(null)

  if (!subscription) return null

  return (
    <>
      <span
        ref={target}
        className={styles.root}
        onClick={() => setMenuHidden(false)}>
        <Persona
          className={styles.user}
          text={user.displayName}
          secondaryText={user.mail}
          imageUrl={user.photo?.base64}
          size={PersonaSize.size32}
          hidePersonaDetails={isMobile}
        />
        <Icon
          hidden={isMobile}
          iconName='ChevronDown'
          styles={{ root: { color: 'white', marginLeft: 6 } }}
        />
      </span>
      <Callout
        hidden={menuHidden}
        target={target?.current}
        onDismiss={() => setMenuHidden(true)}
        gapSpace={-8}>
        <FadeIn className={styles.menu}>
          <MenuItem
            text={subscription.name}
            style={{
              padding: '0 2px 2px 12px',
              color: 'rgb(96, 94, 92)',
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
          <span hidden={isMobile}>
            <UserReports />
          </span>
          <Divider />
          <UserSettings />
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
    </>
  )
}
