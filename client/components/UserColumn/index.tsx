/* eslint-disable tsdoc/syntax */
import get from 'get-value'
import { Persona, PersonaSize } from 'office-ui-fabric-react'
import React, { FC } from 'react'
import { isBrowser, isMobile } from 'react-device-detect'
import { IUserColumnProps } from './types'

/**
 * User column
 *
 * Renders a `<Persona />` component
 *
 * @category SummaryView
 */
export const UserColumn: FC<IUserColumnProps> = ({
  user,
  persona = { size: PersonaSize.size24 }
}: IUserColumnProps) => {
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
