/* eslint-disable unicorn/prevent-abbreviations */
/* eslint-disable unicorn/consistent-function-scoping */
import { usePermissions } from 'hooks'
import { useEffect, useState } from 'react'
import _ from 'underscore'
import { t9r } from 'utils'
import { IPermissionInfo } from '../../../../../../shared/config/security/types'
import { IEditPermissionsProps } from './types'

/**
 * Custom hook for editing permissions.
 *
 * @param props The properties for the component.
 *
 * @returns An object containing permissions, onCheckedValueChange function, and checkedValues.
 */
export function useEditPermissions(props: IEditPermissionsProps) {
  const [selectedPermissions, $setSelectedPermissions] = useState<
    IPermissionInfo[]
  >([])
  const [permissions] = usePermissions(undefined, props.api)
  const permissionsGrouped = _.groupBy(permissions, 'category')
  const selectedOptions = selectedPermissions.map((permission) => permission.id)

  /**
   * Sets the selected permissions based on the provided array of option IDs.
   *
   * @param selectedOptions - An array of string IDs representing the selected options.
   */
  const setSelectedPermissions = (selectedOptions: string[]) => {
    const selectedPermissions = permissions.filter((permission) =>
      selectedOptions.includes(permission.id)
    )
    $setSelectedPermissions(selectedPermissions)
  }

  /**
   * Calls the onChange function when the selected permissions change.
   */
  useEffect(() => {
    props.onChange(selectedOptions)
  }, [selectedOptions.length])

  /**
   * Sets the initial selected permissions.
   */
  useEffect(() => {
    if (!props.selectedPermissions) return
    setSelectedPermissions(props.selectedPermissions)
  }, [props.selectedPermissions])

  return {
    label: t9r(props.labelFormat, {
      label: props.label,
      count: selectedOptions.length
    }),
    permissionsGrouped,
    selectedOptions,
    setSelectedPermissions,
    value: selectedPermissions.map((permission) => permission.name).join(', ')
  }
}
