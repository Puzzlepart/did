import { User } from 'types'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

export interface IUserFormProps extends IPanelProps {
  /**
   * User to edit
   */
  user?: User
}
