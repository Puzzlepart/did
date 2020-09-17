import { IUser } from 'interfaces'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

/**
 * @category Admin
 */
export interface IUserFormProps extends IPanelProps {
  /**
   * User to edit
   */
  user?: IUser
}
