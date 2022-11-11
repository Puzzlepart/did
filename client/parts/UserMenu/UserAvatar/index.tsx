/* eslint-disable tsdoc/syntax */
import { Icon, Persona, PersonaSize } from '@fluentui/react'
import { useAppContext } from 'AppContext'
import React, { FC } from 'react'
import { MenuItem } from '../MenuItem'

/**
 * @category UserMenu
 */
export const UserAvatar: FC = () => {
  const { user } = useAppContext()
  return (
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
        styles={{
          secondaryText: { fontSize: 10 },
          tertiaryText: { display: 'block', fontSize: 10 }
        }}
      />
    </MenuItem>
  )
}
