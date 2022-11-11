import { Persona, PersonaSize } from '@fluentui/react'
import { ReusableComponent } from 'components/types'
import get from 'get-value'
import React from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { IUserColumnProps } from './types'

/**
 * User column
 *
 * Renders a `<Persona />` component
 *
 * @category SummaryView
 */
export const UserColumn: ReusableComponent<IUserColumnProps> = ({
  user,
  persona = { size: PersonaSize.size24 }
}) => {
  return (
    <div>
      <Persona
        {...persona}
        text={user.displayName}
        secondaryText={user.mail}
        tertiaryText={get(user, 'role.name')}
        imageUrl={user.photo?.base64}
        styles={{
          tertiaryText: {
            fontSize: 10,
            visibility: isBrowser && 'hidden',
            display: isMobile ? 'block' : 'hidden'
          }
        }}
      />
    </div>
  )
}

export * from './types'
export * from './useUserListColumn'
