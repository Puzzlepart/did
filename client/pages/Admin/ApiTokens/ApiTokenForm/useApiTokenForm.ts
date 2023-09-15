import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ApiTokenInput } from 'types'
import $addApiToken from './addApiToken.gql'
import { IApiTokenFormProps } from './types'
import { useExpiryOptions } from './useExpiryOptions'

/**
 * Component logic hook for `<ApiTokenForm />`
 */
export function useApiTokenForm(props: IApiTokenFormProps) {
  const [addApiToken] = useMutation($addApiToken)
  const [token, setToken] = useState<ApiTokenInput>({
    name: '',
    expires: null,
    permissions: []
  })

  async function onAddApiToken() {
    const { data } = await addApiToken({ variables: { token } })
    props.onAdded(data.apiKey)
  }
  const expiryOptions = useExpiryOptions()

  return {
    token,
    setToken,
    expiryOptions,
    onAddApiToken
  }
}
