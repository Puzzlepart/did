import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { DateObject } from 'DateUtils'
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
  const [deleteApiToken] = useMutation($deleteApiToken)
  const [form, setForm] = useState<IApiTokenFormProps>({})
  const [selectedToken, onSelectionChanged] = useState<ApiToken>(null)
  const [newToken, setNewToken] = useState<ApiToken>(null)
  const [confirmationDialog, getResponse] = useConfirmationDialog()
  const { displayToast } = useAppContext()

  /**
   * Deletes the `selectedToken` and shows a success toast message.
   *
   * @returns - A Promise that resolves when the API token is deleted.
   */
  const onDelete = useCallback(async () => {
    const { response } = await getResponse({
      title: t('admin.apiTokens.confirmDeleteTitle'),
      subText: t('admin.apiTokens.confirmDeleteSubText', {
        ...selectedToken,
        expires: new DateObject(selectedToken.expires).$.fromNow()
      }),
      responses: [
        [t('common.yes'), true, true],
        [t('common.no'), false, false]
      ]
    })
    if (!response) return
    await deleteApiToken({ variables: { name: selectedToken.name } })
    displayToast(t('admin.tokenDeletedText', selectedToken), 'success')
    refetch()
  }, [selectedToken])

  /**
   * Callback function that is called when a new API key is generated and added.
   * Sets the API token in state and refetches the API tokens. Hides the API key
   * after 10 seconds.
   *
   * @param token - The newly created API token.
   */
  const onTokenAdded = useCallback((token: ApiToken) => {
    setForm({})
    setNewToken(token)
    refetch()
    setTimeout(() => setNewToken(null), 10_000)
  }, [])

  /**
   * Callback function that is called when the API key is copied to the clipboard.
   * Sets a success toast message and clears the API key from state.
   */
  const onKeyCopied = useCallback((token: ApiToken) => {
    displayToast(t('admin.apiTokens.apiKeyCopied', token), 'success')
    setNewToken(null)
  }, [])

  const columns = useColumns(onKeyCopied)

  return {
    items,
    form,
    setForm,
    columns,
    onTokenAdded,
    confirmationDialog,
    onKeyCopied,
    onDelete,
    selectedToken,
    newToken,
    onSelectionChanged
  }
}
