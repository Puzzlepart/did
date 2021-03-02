/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import $updateUserConfiguration from './update-user-configuration.gql'

/**
 * Use update user configuration
 *
 * @param config - Configuration
 * @param update - Update
 *
 * @category Reports Hooks
 */
export function useUpdateUserConfiguration<T = any>(config: T, update = true) {
  const [updateUserConfiguration] = useMutation($updateUserConfiguration)
  const stringValue = JSON.stringify(config)
  useEffect(() => {
    if (update) {
      updateUserConfiguration({
        variables: { configuration: stringValue }
      })
    }
  }, [stringValue])
}
