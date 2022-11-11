import { useMutation } from '@apollo/client'
import { usePermissions } from 'hooks'
import { useEffect, useState } from 'react'
import { RoleInput } from 'types'
import _ from 'underscore'
import $addOrUpdateRole from './addOrUpdateRole.gql'

/**
 * Component logic hook for `<RolePanel />`
 *
 * @category Roles
 */
export function useRolePanel({ props }) {
  const [addOrUpdateRole] = useMutation($addOrUpdateRole)
  const [model, setModel] = useState<RoleInput>({})
  const [permissions] = usePermissions()
  const saveDisabled =
    _.isEmpty(model.name) ||
    _.isEmpty(model.icon) ||
    _.isEqual(model.permissions, props.model?.permissions)

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
        role: _.omit(model, '__typename'),
        update: !!props.model
      }
    })
    props.onSave()
  }

  return {
    permissions,
    model,
    setModel,
    togglePermission,
    onSave,
    saveDisabled
  }
}
