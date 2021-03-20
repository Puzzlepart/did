import { IPersonaProps } from 'office-ui-fabric-react'
import { User } from 'types'

export interface IUserColumnProps {
  user: Pick<User, 'displayName' | 'mail' | 'photo' | 'role'>
  persona?: IPersonaProps
}
