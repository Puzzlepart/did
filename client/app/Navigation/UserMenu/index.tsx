/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { Callout, Persona, PersonaSize } from 'office-ui-fabric-react'
import React, { FunctionComponent, useContext, useRef, useState } from 'react'
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
export const UserMenu: FunctionComponent = () => {
  const { t } = useTranslation()
  const { user, subscription } = useContext(AppContext)
  const [menuHidden, setMenuHidden] = useState(true)
  const target = useRef(null)

  if (!subscription) return null

  return (
    <>
      <span ref={target} className={styles.root}>
        <Persona
          className={styles.persona}
          text={user.displayName}
          secondaryText={user.mail}
          imageUrl={user.photo?.base64}
          size={PersonaSize.size32}
          onClick={() => setMenuHidden(false)}
        />
      </span>
      <Callout
        hidden={menuHidden}
        target={target?.current}
        onDismiss={() => setMenuHidden(true)}
        gapSpace={-8}>
        <FadeIn className={styles.menu}>
          <MenuItem>
            <Persona
              text={user.displayName}
              secondaryText={user.mail}
              tertiaryText={user.mail}
              imageUrl={user.photo?.base64}
              size={PersonaSize.size40}
            />
          </MenuItem>
          <Divider />
          <MenuItem iconProps={{ iconName: 'Home' }} text={subscription.name} />
          <Divider />
          <MenuItem
            iconProps={{ iconName: user.role?.icon }}
            text={user.role.name}
          />
          <span hidden={isMobile}>
            <Divider />
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
            style={{ textAlign: 'right', fontSize: 10, padding: 8 }}
            text={`v${process.env.VERSION}`}
          />
        </FadeIn>
      </Callout>
    </>
  )
}
