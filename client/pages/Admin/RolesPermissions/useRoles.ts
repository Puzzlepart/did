import { useMutation, useQuery } from '@apollo/client'
import { useToast } from 'components/Toast'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Role } from 'types'
import $deleteRole from './deleteRole.gql'
import { IRolePanelProps } from './RolePanel/types'
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
  const [toast, setToast] = useToast(6000)
  const roleQuery = useQuery($roles)
  const userRoleQuery = useQuery($users, {
    skip: true,
    fetchPolicy: 'network-only'
  })
  const [panel, setPanel] = useState<IRolePanelProps>(null)
  const [deleteRole] = useMutation($deleteRole)
  const [confirmationDialog, getResponse] = useConfirmationDialog()

  /**
   * On delete role
   */
  const onDelete = useCallback(async (role: Role) => {
    const response = await getResponse({
      title: t('admin.roles.confirmDeleteTitle'),
      subText: t('admin.roles.confirmDeleteSubText', role),
      responses: [[t('common.yes'), true, true], [t('common.no')]]
    })
    if (response !== true) return
    const { data } = await userRoleQuery.refetch({ query: { role: role.name } })
    if (data?.users?.length > 0) {
      setToast({
        text: t('admin.roleInUseMessage', {
          count: data?.users?.length
        }),
        intent: 'error'
      })
    } else {
      await deleteRole({
        variables: {
          name: role.name
        }
      })
      await roleQuery.refetch()
      setToast({
        text: t('admin.rolesPermissions.deleteSuccess', {
          name: role.name
        }),
        intent: 'success'
      })
    }
  }, [])

  const columns = useColumns(setPanel, onDelete)

  return {
    confirmationDialog,
    query: roleQuery,
    columns,
    panel,
    setPanel,
    toast
  }
}
