import { User } from 'types'
import { AdditionalMetadataField } from '../../types'

export interface IUserMetadataCellProps {
  id: string
  field: AdditionalMetadataField
  user: User
  onChange: (value: string) => void
}
