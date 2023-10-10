import { useMutation, useQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import { IRolePanelProps } from './RolePanel/types'
import $deleteRole from './deleteRole.gql'
import $roles from './roles.gql'
import { useColumns } from './useColumns'
import $users from './users.gql'

/**
 * Component logic hook for `<Roles />`
 *
 * @category Roles
 */
export function useRoles() {
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
   * On delete role
   */
  const onDelete = useCallback(async () => {
    const response = await getResponse({
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

  const columns = useColumns()

  return {
    confirmationDialog,
    query: roleQuery,
    columns,
    panel,
    setPanel,
    onSelectionChanged,
    selectedRole,
    onDelete
  }
}
