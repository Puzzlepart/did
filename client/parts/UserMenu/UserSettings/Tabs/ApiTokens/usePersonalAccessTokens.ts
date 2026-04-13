import { useMutation, useQuery } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { DateObject } from 'DateUtils'
import { useConfirmationDialog } from 'pzl-react-reusable-components/lib/ConfirmDialog'
import { useCallback, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import $addPersonalAccessToken from './addPersonalAccessToken.gql'
import $deletePersonalAccessToken from './deletePersonalAccessToken.gql'
import $personalAccessTokens from './personalAccessTokens.gql'

export function usePersonalAccessTokens() {
  const { t } = useTranslation()
  const { displayToast } = useAppContext()
  const { data, refetch } = useQuery<{ tokens: ApiToken[] }>(
    $personalAccessTokens,
    { fetchPolicy: 'cache-and-network' }
  )
  const items: ApiToken[] = data?.tokens ?? []

  const [addToken] = useMutation($addPersonalAccessToken)
  const [deleteToken] = useMutation($deletePersonalAccessToken)
  const [newToken, setNewToken] = useState<ApiToken>(null)
  const [selectedToken, onSelectionChanged] = useState<ApiToken>(null)
  const [confirmationDialog, getResponse] = useConfirmationDialog()

  const onTokenAdded = useCallback(
    async (token: ApiToken) => {
      try {
        const { data } = await addToken({ variables: { token } })
        const created = { ...token, apiKey: data.apiKey }
        setNewToken(created)
        displayToast(t('userSettings.apiTokens.tokenCreated'), 'success')
        refetch()
        setTimeout(() => setNewToken(null), 10_000)
      } catch (error) {
        displayToast(error.message, 'error')
      }
    },
    [addToken, refetch]
  )

  const onDelete = useCallback(async () => {
    const { response } = await getResponse({
      title: t('userSettings.apiTokens.deleteConfirmTitle'),
      subText: t('userSettings.apiTokens.deleteConfirmMessage', {
        ...selectedToken,
        expires: new DateObject(selectedToken.expires).$.fromNow()
      }),
      responses: [
        [t('common.yes'), true, true],
        [t('common.no'), false, false]
      ]
    })
    if (!response) return
    await deleteToken({ variables: { name: selectedToken.name } })
    displayToast(t('userSettings.apiTokens.tokenDeleted'), 'success')
    onSelectionChanged(null)
    refetch()
  }, [selectedToken])

  const onKeyCopied = useCallback(() => {
    setNewToken(null)
  }, [])

  return {
    items,
    newToken,
    selectedToken,
    onSelectionChanged,
    onTokenAdded,
    onDelete,
    onKeyCopied,
    confirmationDialog
  }
}
