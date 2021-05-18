import { ICheckboxProps } from '@fluentui/react'
import { IPermission } from 'security'

export interface IPermissionCheckboxProps extends ICheckboxProps {
  permission: IPermission
  onToggle: (id: string, checked: boolean) => void
}
