import { useMutation } from '@apollo/client'
import * as security from 'config/security'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiTokenInput } from 'types'
import $addApiToken from './addApiToken.gql'
import { useExpiryOptions } from './useExpiryOptions'

/**
 * Component logic hook for `<ApiTokenForm />`
 */
export function useApiTokenForm({ onAdded }) {
  const { t } = useTranslation()
  const [addApiToken] = useMutation($addApiToken)
  const [token, setToken] = useState<ApiTokenInput>({
    name: '',
    expires: null,
    permissions: []
  })
  const permissions = useMemo(
    () => security.permissions(t).filter((p) => p.api),
    [t]
  )

  async function onAddApiToken() {
    const { data } = await addApiToken({ variables: { token } })
    onAdded(data.apiKey)
  }

  function togglePermission(permissionId: string, checked: boolean) {
    const permissions = [...(token.permissions || [])]
    const index = permissions.indexOf(permissionId)
    if (checked && index === -1) permissions.push(permissionId)
    else permissions.splice(index, 1)
    setToken({ ...token, permissions })
  }

  const expiryOptions = useExpiryOptions()

  return {
    token,
    setToken,
    expiryOptions,
    permissions,
    onAddApiToken,
    togglePermission
  }
}
