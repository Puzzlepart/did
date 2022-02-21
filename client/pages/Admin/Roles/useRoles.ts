/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'
import { Role } from 'types'
import $deleteRole from './deleteRole.gql'
import { IRolePanelProps } from './RolePanel/types'
import $roles from './roles.gql'
import $users from './users.gql'
import { useColumns } from './useColumns'
import { useToast } from 'components/Toast'
import { useTranslation } from 'react-i18next'

/**
 * Component logic hook for `<Roles />`
 *
 * @category Roles
 */
export function useRoles() {
  const { t } = useTranslation()
  const [toast, setToast] = useToast(6000)
  const roleQuery = useQuery($roles)
  const userRoleQuery = useQuery($users, { skip: true })
  const [panel, setPanel] = useState<IRolePanelProps>(null)
  const [deleteRole] = useMutation($deleteRole)

  /**
   * On delete role
   */
  async function onDelete(role: Role) {
    const { data } = await userRoleQuery.refetch({ query: { role: role.name } })
    if (data?.users?.length > 0) {
      setToast({
        text: t('admin.roleInUseMessage', {
          count: data?.users?.length
        }),
        type: 'error'
      })
    } else {
      await deleteRole({
        variables: {
          name: role.name
        }
      })
      await roleQuery.refetch()
      setToast({
        text: t('admin.roleDeletedMessage', {
          name: role.name
        }),
        type: 'success'
      })
    }
  }

  const columns = useColumns({ setPanel, onDelete })

  return {
    ...roleQuery,
    roles: roleQuery.data?.roles || [],
    columns,
    panel,
    setPanel,
    toast
  } as const
}
