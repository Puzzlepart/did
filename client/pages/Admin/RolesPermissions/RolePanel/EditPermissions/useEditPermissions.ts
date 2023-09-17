/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
import { MenuProps } from '@fluentui/react-components'
import { usePermissions } from 'hooks'
import { useMemo, useState } from 'react'
import { IPermissionInfo } from 'security'
import _ from 'underscore'
import { IEditPermissionsProps } from './types'

/**
 * Helper function to remove disabled permissions.
 *
 * @param permissions Permissions to remove disabled from
 */
const removeDisabled = (permissions: IPermissionInfo[]) =>
  permissions.filter(({ disabled }) => !disabled)

/**
 * Helper function to get permission IDs.
 *
 * @param permissions Permissions to get IDs from
 */
const permissionIds = (permissions: IPermissionInfo[]) =>
  permissions.map(({ id }) => id)

/**
 * Custom hook for editing permissions.
 *
 * @param props The properties for the component.
 *
 * @returns An object containing permissions, onCheckedValueChange function, and checkedValues.
 */
export function useEditPermissions(props: IEditPermissionsProps) {
  const [permissions] = usePermissions(undefined, props.api)
  const permissionsGrouped = _.groupBy(permissions, 'category')

  const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (
    _e,
    data
  ) => {
    if (data.name === props.name) {
      props.onChange(data.checkedItems)
    } else if (data.checkedItems[0] === 'allSelected') {
      props.onChange(
        _.uniq([
          ...(props.selectedPermissions ?? []),
          ...permissionIds(removeDisabled(permissionsGrouped[data.name]))
        ])
      )
    } else {
      props.onChange(
        _.difference(
          props.selectedPermissions ?? [],
          permissionIds(removeDisabled(permissionsGrouped[data.name]))
        )
      )
    }
  }

  const checkedValues = useMemo(
    () => ({
      permissions: props.selectedPermissions,
      ...Object.keys(permissionsGrouped).reduce((acc, key) => {
        const isCategorySelected = _.every(
          removeDisabled(permissionsGrouped[key]),
          ({ id }) => props.selectedPermissions?.includes(id)
        )
        return {
          ...acc,
          [key]: isCategorySelected ? ['allSelected'] : []
        }
      }, {} as Record<string, string[]>)
    }),
    [props.selectedPermissions]
  )

  const [open, setOpen] = useState(false)

  const onOpenChange: MenuProps['onOpenChange'] = (event, data) => {
    if (data.type === 'clickOutside') return
    if (data.type === 'menuTriggerClick' && !data.open) return
    setOpen(data.open)
  }

  return {
    open,
    onOpenChange,
    onCheckedValueChange,
    checkedValues,
    permissions: permissionsGrouped
  }
}
