/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { AppContext } from 'AppContext'
import getPermissions, { PERMISSION } from 'config/security/permissions'
import { useContext, useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { contains } from 'underscore'

/**
 * Permissions hook
 *
 * @param permissionIds - Permission IDs
 *
 * @returns Permissions available based on specified permissionIds
 * and a function hasPermission that checks if the currently logged
 * on user has the specified permission.
 *
 * @category React Hook
 */
export function usePermissions(permissionIds?: string[]) {
  const { t } = useTranslation()
  const context = useContext(AppContext)

  let permissions = getPermissions(t)

  if (permissionIds) {
    permissions = permissions.filter((perm) => contains(permissionIds, perm.id))
  }

  return useMemo(
    () => ({
      permissions,
      hasPermission: (permission: PERMISSION) => {
        return context?.user ? context.user.hasPermission(permission) : false
      }
    }),
    [context?.user]
  )
}
