import { User } from 'types'

export interface IUserMetadataCellProps {
  field: string
  user: User
  onChange: (value: string) => void
}
