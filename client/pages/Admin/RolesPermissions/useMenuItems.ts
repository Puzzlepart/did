import { ListMenuItem } from 'components'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'

type UseMenuItemsProps = {
  selectedRole: Role
  onAdd?: () => void
  onEdit: (event: any) => void
  onDelete: () => void
}

/**
 * Hook for `<RolesPermissions />` component that returns the menu items. For now it
 * must be passed the `setPanel` function, the `selectedRole` and the
 * `onDelete` function. It returns an array of `ListMenuItem` objects.
 *
 * @category RolesPermissions
 */
export function useMenuItems({
  selectedRole,
  onAdd,
  onEdit,
  onDelete
}: UseMenuItemsProps) {
  const { t } = useTranslation()
  return [
    new ListMenuItem(t('admin.addNewRole'))
      .setOnClick(onAdd)
      .withIcon('Permissions'),
    new ListMenuItem(t('admin.editRole'))
      .setOnClick(onEdit)
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
