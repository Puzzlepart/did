import { IPersonaProps } from '@fluentui/react-react'
import { User } from 'types'

export interface IUserColumnProps {
  user: Pick<User, 'displayName' | 'mail' | 'photo' | 'role'>
  persona?: IPersonaProps
}
