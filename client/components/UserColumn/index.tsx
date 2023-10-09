import { Persona } from '@fluentui/react-components'
import { ReusableComponent } from 'components/types'
import get from 'get-value'
import React from 'react'
import { IUserColumnProps } from './types'

/**
 * User column
 *
 * Renders a `<Persona />` component
 *
 * @category SummaryView
 */
export const UserColumn: ReusableComponent<IUserColumnProps> = (props) => {
  return (
    <div>
      <Persona
        size={props.size}
        name={props.user.displayName}
        secondaryText={props.displayMail && props.user.mail}
        tertiaryText={get(props.user, 'role.name')}
        avatar={{
          image: {
            src: props.user.photo?.base64
          }
        }}
      />
    </div>
  )
}

UserColumn.displayName = 'UserColumn'
UserColumn.defaultProps = {
  size: 'small'
}

export * from './types'
export * from './useUserListColumn'
