import { User } from 'types'

export interface IUserColumnProps {
  user: Pick<User, 'displayName' | 'mail' | 'photo'>
}
