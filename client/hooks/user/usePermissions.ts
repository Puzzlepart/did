/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { getPermissions, PermissionScope } from 'security'
import { contains } from 'underscore'

/**
 * Permissions hook
 *
 * @param scopeIds - Scopes
 * @param api - API
 *
 * @returns Permissions available based on specified permissionIds
 * and a function hasPermission that checks if the currently logged
 * on user has the specified permission.
 *
 * @category React Hook
 */
export function usePermissions(scopeIds?: string[], api = false) {
  const { t } = useTranslation()
  const context = useContext(AppContext)

  let permissions = getPermissions(t)

  if (scopeIds) {
    permissions = permissions.filter((perm) => contains(scopeIds, perm.id))
  }

  if (api) {
    permissions = permissions.filter((perm) => perm.api)
  }

  return useMemo(
    () => ({
      permissions,
      hasPermission: (scope: PermissionScope) => {
        return context?.user ? context.user.hasPermission(scope) : false
      }
    }),
    [context?.user]
  )
}
