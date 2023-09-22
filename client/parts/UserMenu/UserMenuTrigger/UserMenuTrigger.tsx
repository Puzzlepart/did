import { Avatar, Persona, PopoverTrigger } from '@fluentui/react-components'
import { useAppContext } from 'AppContext'
import React from 'react'
import { isBrowser, MobileView } from 'react-device-detect'
import { StyledComponent } from 'types'
import { NotificationIndicator } from '../../UserNotifications/NotificationIndicator'
import styles from './UserMenuTrigger.module.scss'

export const UserMenuTrigger: StyledComponent = () => {
  const { user } = useAppContext()
  return (
    <PopoverTrigger>
      <span className={UserMenuTrigger.className}>
        {isBrowser ? (
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
        ) : (
          <Avatar
            className={styles.user}
            name={user.displayName}
            image={{
              src: user.photo?.base64
            }}
            size={40}
          />
        )}
        <MobileView renderWithFragment={true}>
          <NotificationIndicator />
        </MobileView>
      </span>
    </PopoverTrigger>
  )
}

UserMenuTrigger.displayName = 'UserMenuTrigger'
UserMenuTrigger.className = styles.userMenuTrigger
