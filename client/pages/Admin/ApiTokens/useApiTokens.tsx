import { useMutation } from '@apollo/client'
import { useToast } from 'components'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import { IApiTokenFormProps } from './ApiTokenForm/types'
import $deleteApiToken from './deleteApiToken.gql'
import { useApiTokensQuery } from './useApiTokensQuery'
import { useColumns } from './useColumns'

/**
 * Component logic hook for `<ApiTokens />`
 *
 * @category ApiTokens
 */
export function useApiTokens() {
  const { t } = useTranslation()
  const [items, { refetch }] = useApiTokensQuery()
  const [toast, setToast] = useToast(8000)
  const [deleteApiToken] = useMutation($deleteApiToken)
  const [apiKey, setApiKey] = useState(null)
  const [form, setForm] = useState<IApiTokenFormProps>({})
  const [confirmationDialog, getResponse] = useConfirmationDialog()

  /**
   * Deletes an API token.
   *
   * @param token - The API token to be deleted.
   *
   * @returns - A Promise that resolves when the API token is deleted.
   */
  const onDelete = useCallback(async (token: ApiToken) => {
    const response = await getResponse({
      title: t('admin.apiTokens.confirmDeleteTitle'),
      subText: t('admin.apiTokens.confirmDeleteSubText', token),
      responses: [[t('common.yes'), true, true], [t('common.no')]]
    })
    if (response === true) {
      await deleteApiToken({ variables: { name: token.name } })
      setToast({
        intent: 'success',
        text: t('admin.tokenDeletedText', token)
      })
      refetch()
    }
  }, [])

  const columns = useColumns({ onDelete })

  /**
   * Callback function that is called when a new API key is generated and added.
   * Sets the API key in state and refetches the API tokens. Hides the API key
   * after 10 seconds.
   *
   * @param generatedKey - The newly generated API key.
   */
  const onKeyAdded = useCallback((generatedKey: string) => {
    setForm({})
    setApiKey(generatedKey)
    refetch()
    setTimeout(() => setApiKey(null), 10_000)
  }, [])

  /**
   * Callback function that is called when the API key is copied to the clipboard.
   * Sets a success toast message and clears the API key from state.
   */
  const onKeyCopied = useCallback(() => {
    setToast({
      text: t('admin.apiTokens.apiKeyCopied'),
      intent: 'success'
    })
    setApiKey(null)
  }, [])

  return {
    items,
    form,
    setForm,
    apiKey,
    columns,
    onKeyAdded,
    confirmationDialog,
    toast,
    onKeyCopied
  }
}
