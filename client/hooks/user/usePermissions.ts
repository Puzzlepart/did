/* eslint-disable react-hooks/exhaustive-deps */
import { useAppContext } from 'AppContext'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getPermissions, IPermission, PermissionScope } from 'security'
import _ from 'underscore'

type UsePermissionsReturnType = [
  IPermission[],
  (scope: PermissionScope) => boolean
]

/**
 * Permissions hook that returns  tuple of the available
 * permissions and a function to check if the current user
 * has the specified permission.
 *
 * @param scopeIds - Limit the returns permissions to the specified ids
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

  let permissions = getPermissions(t)

  if (scopeIds) {
    permissions = permissions.filter((perm) => _.contains(scopeIds, perm.id))
  }

  if (api) {
    permissions = permissions.filter((perm) => perm.api)
  }

  return useMemo(
    () => [
      permissions,
      (scope: PermissionScope) => {
        if (!scope) return true
        return context?.user ? context.user.hasPermission(scope) : false
      }
    ],
    [context?.user]
  )
}
