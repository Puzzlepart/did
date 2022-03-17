/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { useMessage } from 'components'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import { IApiTokenFormProps } from './ApiTokenForm/types'
import $deleteApiToken from './deleteApiToken.gql'
import $tokens from './tokens.gql'
import { useColumns } from './useColumns'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'

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
    const [ConfirmationDialog, getResponse] = useConfirmationDialog()

    const onDelete = useCallback(async (token: ApiToken) => {
        const response = await getResponse({
            title: t('admin.apiTokens.confirmDeleteTitle'),
            subText: t('admin.apiTokens.confirmDeleteSubText', token),
            responses: [[t('common.yes'), true, true], [t('common.no')]]
        })
        if (response === true) {
            await deleteApiToken({ variables: { name: token.name } })
            setMessage({
                type: 'info',
                text: t('admin.tokenDeletedText', token)
            })
            query.refetch()
        }
    }, [])

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

    const columns = useColumns({ onDelete })

    return {
        query,
        form,
        setForm,
        apiKey,
        message,
        columns,
        onKeyAdded,
        ConfirmationDialog
    }
}
