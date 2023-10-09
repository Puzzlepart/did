import { IPanelProps } from 'components/Panel'
import { User } from 'types'

export interface IUserFormProps extends IPanelProps {
  /**
   * User to edit (optional).
   */
  user?: User
}
