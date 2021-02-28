import { IPanelProps } from 'office-ui-fabric-react'
import { User } from 'types'

export interface IUserFormProps extends IPanelProps {
  /**
   * User to edit
   */
  user?: User
}
