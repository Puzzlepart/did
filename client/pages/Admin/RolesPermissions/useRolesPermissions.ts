import { useMutation, useQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { IRolePanelProps } from './RolePanel/types'
import $deleteRole from './deleteRole.gql'
import $roles from './roles.gql'
import { useMenuItems } from './useMenuItems'
import $users from './users.gql'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<RolesPermissions />` component.
 *
 * @category RolesPermissions
 */
export function useRolesPermissions() {
  const { t } = useTranslation()
  const roleQuery = useQuery($roles)
  const userRoleQuery = useQuery($users, {
    skip: true,
    fetchPolicy: 'network-only'
  })
  const [panel, setPanel] = useState<IRolePanelProps>(null)
  const [deleteRole] = useMutation($deleteRole)
  const [confirmationDialog, getResponse] = useConfirmationDialog()
  const [selectedRole, onSelectionChanged] = useState<Role>(null)
  const { displayToast } = useAppContext()

  /**
   * On delete role. Potentially it should be moved
   * to the `useMenuItems` hook.
   */
  const onDelete = useCallback(async () => {
    const { response } = await getResponse({
      title: t('admin.roles.confirmDeleteTitle'),
      subText: t('admin.roles.confirmDeleteSubText', selectedRole),
      responses: [[t('common.yes'), true, true], [t('common.no')]]
    })
    if (response !== true) return
    const { data } = await userRoleQuery.refetch({
      query: { role: selectedRole.name }
    })
    if (data?.users?.length > 0) {
      displayToast(
        t('admin.roleInUseMessage', {
          count: data?.users?.length
        }),
        'error'
      )
    } else {
      await deleteRole({
        variables: {
          name: selectedRole.name
        }
      })
      await roleQuery.refetch()
      displayToast(
        t('admin.rolesPermissions.deleteSuccess', {
          name: selectedRole.name
        }),
        'success'
      )
    }
  }, [selectedRole])

  /**
   * On add role. Potentially it should be moved
   * to the `useMenuItems` hook.
   */
  const onAdd = () => {
    setPanel({
      panel: {
        title: t('admin.addNewRole'),
        onDismiss: ({ refetch = false } = {}) => {
          setPanel(null)
          if(refetch) {
            roleQuery.refetch()
          }
        }
      }
    })
  }

  /**
   * On edit role. Potentially it should be moved
   * to the `useMenuItems` hook.
   * 
   * @param _ - The mouse event
   * @param edit - The role to edit
   */
  const onEdit = (_: MouseEvent, edit = selectedRole) => {
    setPanel({
      panel: {
        title: t('admin.editRole'),
        onDismiss: ({ refetch = false } = {}) => {
          setPanel(null)
          if(refetch) {
            roleQuery.refetch()
          }
        }
      },
      edit
    })
  }

  const columns = useColumns()
  const menuItems = useMenuItems({ selectedRole, onDelete, onAdd, onEdit })

  return {
    query: roleQuery,
    columns,
    panel,
    onEdit,
    confirmationDialog,
    onSelectionChanged,
    menuItems
  }
}
