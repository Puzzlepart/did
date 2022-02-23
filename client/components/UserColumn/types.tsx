import { IPersonaProps } from '@fluentui/react'
import { HTMLAttributes } from 'react'
import { User } from 'types'

export interface IUserColumnProps extends HTMLAttributes<HTMLDivElement> {
  user: Pick<User, 'displayName' | 'mail' | 'photo' | 'role'>
  persona?: IPersonaProps
}