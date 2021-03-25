import { IPanelProps } from '@fluentui/react'
import { User } from 'types'

export interface IUserFormProps extends IPanelProps {
  /**
   * User to edit
   */
  user?: User
}
