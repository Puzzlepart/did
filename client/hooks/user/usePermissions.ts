import { useAppContext } from 'AppContext'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getPermissions, IPermissionInfo, PermissionScope } from 'security'
import _ from 'underscore'

type UsePermissionsReturnType = [
  IPermissionInfo[],
  (scope: PermissionScope) => boolean
]

/**
 * Permissions hook that returns  tuple of the available
 * permissions and a function to check if the current user
 * has the specified permission.
 *
 * @param scopeIds - Limit the returns permissions to the specified Ids
 * @param api - Only return permissions available to be called externally
 *
 * @returns Permissions available based on specified `permissionIds`
 * and a function `hasPermission` that checks if the currently logged
 * on user has the specified permission.
 *
 * @category React Hook
 */
export function usePermissions(
  scopeIds?: string[],
  api = false
): UsePermissionsReturnType {
  const { t } = useTranslation()
  const context = useAppContext()
  const permissions = getPermissions(t)
  const permissionIds = Object.keys(permissions) as PermissionScope[]

  return useMemo(() => {
    let _permissions = { ...permissions }
    if (scopeIds) {
      _permissions = _.pick(_permissions, scopeIds)
    }

    const permissionInfo: IPermissionInfo[] = Object.values(_permissions).map(
      (perm, index) => ({
        ...perm,
        id: permissionIds[index],
        disabled: perm.disabled || (!perm.api && api)
      })
    )

    return [
      permissionInfo,
      (scope: PermissionScope) => {
        if (!scope) return true
        return context?.user ? context.user.hasPermission(scope) : false
      }
    ]
  }, [context?.user, scopeIds, api])
}
