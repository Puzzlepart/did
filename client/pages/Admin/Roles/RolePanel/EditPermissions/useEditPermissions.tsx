/* eslint-disable unicorn/consistent-function-scoping */
import { MenuProps } from '@fluentui/react-components'
import { usePermissions } from 'hooks'
import { IEditPermissionsProps } from './types'
import { useMemo, useState } from 'react'

/**
 * Custom hook for editing permissions.
 * 
 * @param props The properties for the component.
 * 
 * @returns An object containing permissions, onCheckedValueChange function, and checkedValues.
 */
export function useEditPermissions(props: IEditPermissionsProps) {
  const [permissions] = usePermissions()

  const onCheckedValueChange: MenuProps['onCheckedValueChange'] = (
    _,
    { name, checkedItems }
  ) => {
    // eslint-disable-next-line no-console
    console.log(name, checkedItems)
  }

  const checkedValues = useMemo(() => ({
    permissions: props.selectedPermissions
  }), [props.selectedPermissions])

  const [open, setOpen] = useState(false)
  const onOpenChange: MenuProps['onOpenChange'] = (_, data) => {
    setOpen(data.open)
  }

  return { open, onOpenChange, permissions, onCheckedValueChange, checkedValues }
}
