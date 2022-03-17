/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { useMessage } from 'components'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import { IApiTokenFormProps } from './ApiTokenForm/types'
import $deleteApiToken from './deleteApiToken.gql'
import $tokens from './tokens.gql'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<ApiTokens />`
 *
 * @category ApiTokens
 */
export function useApiTokens() {
    const { t } = useTranslation()
    const [message, setMessage] = useMessage()
    const [deleteApiToken] = useMutation($deleteApiToken)
    const query = useQuery($tokens)
    const [apiKey, setApiKey] = useState(null)
    const [form, setForm] = useState<IApiTokenFormProps>({ setMessage })

    /**
     * On delete API token
     *
     * @param token - The token to dete
     */
    async function onDeleteApiToken(token: ApiToken) {
        await deleteApiToken({ variables: { name: token.name } })
        setMessage({
            type: 'info',
            text: t('admin.tokenDeletedText', token)
        })
        query.refetch()
    }

    /**
     * On key added
     *
     * @param generatedKey - Generated API key
     */
    function onKeyAdded(generatedKey: string) {
        setForm({})
        if (generatedKey) {
            setMessage({ text: t('admin.tokenGeneratedText') }, 20_000)
            setApiKey(generatedKey)
        } else
            setMessage({
                type: 'error',
                text: t('admin.tokenErrorText')
            })
        query.refetch()
    }

    const columns = useColumns({ onDeleteApiToken })

    return {
        query,
        form,
        setForm,
        apiKey,
        message,
        columns,
        onKeyAdded
    }
}
