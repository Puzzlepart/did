/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import $updateUserConfiguration from '../../../graphql/updateUserConfiguration.gql'

/**
 * Use update user configuration
 *
 * @param {T} config Configuration
 */
export function useUpdateUserConfiguration<T = any>(config: T) {
  const [updateUserConfiguration] = useMutation($updateUserConfiguration)
  const strValue = JSON.stringify(config)
  useEffect(() => {
    const variables = { configuration: strValue }
    updateUserConfiguration({ variables })
  }, [strValue])
}
