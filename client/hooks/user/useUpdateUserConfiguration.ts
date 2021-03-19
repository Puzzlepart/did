/* eslint-disable tsdoc/syntax */
/* eslint-disable react-hooks/exhaustive-deps */
import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import $updateUserConfiguration from './update-user-configuration.gql'

/**
 * Update user configuration hook
 *
 * Retrieves config JSON and update (boolean) and uses useMutation.
 * It will only execute the mutation if update is equal to true, and
 * the value has changed.
 *
 * @remarks For now this is how we update user configuration,
 * but it might be better ways. For now this should do.
 *
 * @param config - Configuration
 * @param update - Update
 *
 * @category React Hook
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
