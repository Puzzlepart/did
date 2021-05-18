import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ApiTokenInput } from 'types'
import $addApiToken from './addApiToken.gql'
import { useExpiryOptions } from './useExpiryOptions'

/**
 * Component logic hook for `<ApiTokenForm />`
 */
export function useApiTokenForm({ onAdded }) {
  const [addApiToken] = useMutation($addApiToken)
  const [token, setToken] = useState<ApiTokenInput>({
    name: '',
    expires: null,
    permissions: []
  })

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
    onAddApiToken,
    togglePermission
  }
}
