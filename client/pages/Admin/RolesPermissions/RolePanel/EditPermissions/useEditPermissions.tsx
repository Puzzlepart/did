/* eslint-disable unicorn/consistent-function-scoping */
import { MenuProps } from '@fluentui/react-components'
import { usePermissions } from 'hooks'
import { useMemo, useState } from 'react'
import { IEditPermissionsProps } from './types'

/**
 * Custom hook for editing permissions.
 *
 * @param props The properties for the component.
 *
 * @returns An object containing permissions, onCheckedValueChange function, and checkedValues.
 */
export function useEditPermissions(props: IEditPermissionsProps) {
  const [permissions] = usePermissions(undefined, props.api)

  const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (
    _,
    { checkedItems }
  ) => {
    props.onChange(checkedItems)
  }

  const checkedValues = useMemo(
    () => ({
      permissions: props.selectedPermissions
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
    permissions,
    onCheckedValueChange,
    checkedValues
  }
}
