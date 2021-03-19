import { useMutation, useQuery } from '@apollo/client'
import { usePermissions } from 'hooks'
import { useEffect, useState } from 'react'
import { RoleInput } from 'types'
import { isEmpty, isEqual, omit } from 'underscore'
import $addOrUpdateRole from './addOrUpdateRole.gql'
import $deleteRole from './deleteRole.gql'
import $users from './users.gql'

export function useRolePanel({ props }) {
  const { data } = useQuery($users, {
    variables: {
      query: {
        role: props.model?.name
      }
    },
    fetchPolicy: 'cache-and-network'
  })
  const [addOrUpdateRole] = useMutation($addOrUpdateRole)
  const [deleteRole] = useMutation($deleteRole)
  const [model, setModel] = useState<RoleInput>({})
  const { permissions } = usePermissions()
  const saveDisabled =
    isEmpty(model.name) ||
    isEmpty(model.icon) ||
    isEqual(model.permissions, props.model?.permissions)

  useEffect(() => {
    if (props.model) setModel(props.model)
  }, [props.model])

  /**
   * On toggle permission
   *
   * @param permissionId - Permission ID
   * @param checked - checked Is checked
   */
  function togglePermission(permissionId: string, checked: boolean) {
    const rolePermissions = [...(model.permissions || [])]
    const index = rolePermissions.indexOf(permissionId)
    if (checked && index === -1) rolePermissions.push(permissionId)
    else rolePermissions.splice(index, 1)
    setModel({ ...model, permissions: rolePermissions })
  }

  /**
   * On save role
   */
  async function onSave() {
    await addOrUpdateRole({
      variables: {
        role: omit(model, '__typename'),
        update: !!props.model
      }
    })
    props.onSave()
  }

  /**
   * On delete role
   */
  async function onDelete() {
    await deleteRole({
      variables: {
        name: model.name
      }
    })
    props.onSave()
  }

  return {
    data,
    permissions,
    model,
    setModel,
    togglePermission,
    onDelete,
    onSave,
    saveDisabled
  }
}
