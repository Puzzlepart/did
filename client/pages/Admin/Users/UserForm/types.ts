import { IRole, IUser } from 'interfaces'
import { IPanelProps } from 'office-ui-fabric-react/lib/Panel'

/**
 * @category Admin
 */
export interface IUserFormProps {
  title?: string
  users?: any[]
  user?: IUser
  roles?: IRole[]
  panel?: IPanelProps
}
