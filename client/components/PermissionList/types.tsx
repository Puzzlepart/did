import { HTMLAttributes } from 'react'

/**
 * @category PermissionList
 */
export interface IPermissionListProps extends HTMLAttributes<HTMLDivElement> {
  permissionIds: string[]
}
