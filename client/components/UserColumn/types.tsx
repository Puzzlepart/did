import { PersonaProps } from '@fluentui/react-components'
import { HTMLAttributes } from 'react'
import { User } from 'types'

export interface IUserColumnProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'displayName' | 'mail' | 'photo' | 'role'>
  size?: PersonaProps['size']
  displayMail?: boolean
}
