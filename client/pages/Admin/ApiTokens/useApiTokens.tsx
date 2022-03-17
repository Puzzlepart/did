/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { useToast } from 'components'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useState } from 'react'
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
  const [toast, setToast] = useToast(8000, { isMultiline: true })
  const [deleteApiToken] = useMutation($deleteApiToken)
  const query = useQuery($tokens)
  const [apiKey, setApiKey] = useState(null)
  const [form, setForm] = useState<IApiTokenFormProps>({})
  const [confirmationDialog, getResponse] = useConfirmationDialog()

  const onDelete = useCallback(async (token: ApiToken) => {
    const response = await getResponse({
      title: t('admin.apiTokens.confirmDeleteTitle'),
      subText: t('admin.apiTokens.confirmDeleteSubText', token),
      responses: [[t('common.yes'), true, true], [t('common.no')]]
    })
    if (response === true) {
      await deleteApiToken({ variables: { name: token.name } })
      setToast({
        type: 'info',
        text: t('admin.tokenDeletedText', token)
      })
      query.refetch()
    }
  }, [])

  const onKeyAdded = useCallback((generatedKey: string) => {
    setForm({})
    if (generatedKey) {
      setToast({ text: t('admin.tokenGeneratedText') }, 20_000)
      setApiKey(generatedKey)
    } else {
      setToast({
        type: 'error',
        text: t('admin.tokenErrorText')
      })
    }
    query.refetch()
  }, [])

  const columns = useColumns({ onDelete })

  return {
    query,
    form,
    setForm,
    apiKey,
    toast,
    columns,
    onKeyAdded,
    confirmationDialog
  }
}
