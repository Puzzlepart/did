import { ICheckboxProps } from 'office-ui-fabric-react'
import { IPermission } from 'security'

export interface IPermissionCheckboxProps extends ICheckboxProps {
  permission: IPermission
  onToggle: (id: string, checked: boolean) => void
}
