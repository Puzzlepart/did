import { IFormControlProps } from 'components'
import { Role } from 'types'
import { useRolesPermissions } from '../useRolesPermissions'

export interface IRolePanelProps extends IFormControlProps<Role> {
  /**
   * Refetch callback is needed to update the list of roles after a role is added or updated.
   */
  refetch?: ReturnType<typeof useRolesPermissions>['query']['refetch']
}
