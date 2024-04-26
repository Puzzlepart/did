import { User } from 'types'

export interface IUserMeadataCellProps {
  field: string
  user: User
  onChange: (value: string) => void
}
