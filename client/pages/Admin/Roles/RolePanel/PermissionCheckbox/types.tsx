import { IPermission } from 'config/security/permissions'
import { ICheckboxProps } from 'office-ui-fabric-react'

export interface IPermissionCheckboxProps extends ICheckboxProps {
  permission: IPermission
  onToggle: (id: string, checked: boolean) => void
}
