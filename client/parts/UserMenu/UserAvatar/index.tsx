import { Persona } from '@fluentui/react-components'
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
        name={user.displayName}
        secondaryText={user.role.name}
        avatar={{
          image: {
            src: user.photo?.base64
          }
        }}
        size='large'
      />
    </MenuItem>
  )
}
