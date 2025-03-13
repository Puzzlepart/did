import { ListMenuItem } from 'components'
import { Dispatch } from 'react'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { IRolePanelProps } from './RolePanel'

type UseMenuItemsProps = {
  setPanel: Dispatch<React.SetStateAction<IRolePanelProps>>
  selectedRole: Role
  onDelete: () => void
}

/**
 * Hook for `<RolesPermissions />` component that returns the menu items. For now it
 * must be passed the `setPanel` function, the `selectedRole` and the
 * `onDelete` function. It returns an array of `ListMenuItem` objects.
 */
export function useMenuItems({
  setPanel,
  selectedRole,
  onDelete
}: UseMenuItemsProps) {
  const { t } = useTranslation()
  return [
    new ListMenuItem(t('admin.addNewRole'))
      .setOnClick(() =>
        setPanel({
          panel: {
            title: t('admin.addNewRole'),
            onDismiss: () => setPanel(null)
          }
        })
      )
      .withIcon('Permissions'),
    new ListMenuItem(t('admin.editRole'))
      .setOnClick(() =>
        setPanel({
          panel: {
            title: t('admin.editRole'),
            onDismiss: () => setPanel(null)
          },
          edit: selectedRole
        })
      )
      .withIcon('Edit')
      .setGroup('actions')
      .setDisabled(!selectedRole),
    new ListMenuItem(
      t('admin.deleteRole'),
      selectedRole?.allowDelete === false
        ? t('admin.roleNotDeletable')
        : undefined
    )
      .setOnClick(onDelete)
      .withIcon('Delete')
      .setGroup('actions')
      .setDisabled(!selectedRole || selectedRole?.allowDelete === false)
  ]
}
