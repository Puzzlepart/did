import { useMutation } from '@apollo/client'
import { useEffect } from 'react'
import $updateUserConfiguration from '../../graphql/updateUserConfiguration.gql'

/**
 * Use update user configuration
 * 
 * @param {T} config Configuration
 */
export function useUpdateUserConfiguration<T = any>(config: T) {
    const [updateUserConfiguration] = useMutation($updateUserConfiguration)
    useEffect(() => {
        const variables = { configuration: JSON.stringify(config) }
        updateUserConfiguration({ variables })
    }, [JSON.stringify(config)])
}