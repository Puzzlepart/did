/* eslint-disable tsdoc/syntax */
import { Persona, PersonaSize } from 'office-ui-fabric-react'
import React, { FunctionComponent } from 'react'
import { IUserColumnProps } from './types'

/**
 * User column
 *
 * Renders a `<Persona />` component
 *
 * @category SummaryView
 */
export const UserColumn: FunctionComponent<IUserColumnProps> = ({
  user
}: IUserColumnProps) => {
  return (
    <div>
      <Persona
        text={user.displayName}
        secondaryText={user.mail}
        size={PersonaSize.size24}
        imageUrl={user.photo}
      />
    </div>
  )
}

export * from './types'
