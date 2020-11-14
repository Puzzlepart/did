import { useMutation, useQuery } from '@apollo/client'
import { useMessage, UserMessage } from 'components'
import List from 'components/List'
import { TextField } from 'office-ui-fabric-react/lib/components/TextField'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import React, { useState } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import { isNull } from 'underscore'
import { sleep } from 'utils'
import { ApiTokenForm } from './ApiTokenForm'
import { IApiTokenFormProps } from './ApiTokenForm/types'
import styles from './ApiTokens.module.scss'
import { ApiTokensColumns as columns } from './columns'
import $deleteApiToken from './deleteApiToken.gql'
import $tokens from './tokens.gql'

export const ApiTokens = () => {
  const { t } = useTranslation()
  const [message, setMessage] = useMessage()
  const [deleteApiToken] = useMutation($deleteApiToken)
  const { data, refetch } = useQuery($tokens)
  const [apiKey, setApiKey] = useState(null)
  const [form, setForm] = useState<IApiTokenFormProps>({ setMessage })

  /**
   * On delete API token
   *
   * @param {ApiToken} token The token to dete
   */
  async function onDeleteApiToken(token: ApiToken) {
    await deleteApiToken({ variables: { name: token.name } })
    setMessage({ type: MessageBarType.info, text: t('admin.tokenDeletedText', token) })
    refetch()
  }

  /**
   * On key added
   *
   * @param {string} generatedKey Generated API key
   * @param {number} duration Seconds the API key should be visible to the user
   */
  async function onKeyAdded(generatedKey: string, duration: number = 10) {
    setForm({})
    setApiKey(generatedKey)
    if (generatedKey) {
      setMessage(
        { type: MessageBarType.success, children: t('admin.tokenGeneratedText', { duration }) },
        duration * 1000
      )
    } else {
      setMessage({ type: MessageBarType.error, text: t('admin.tokenErrorText') })
    }
    await sleep(duration)
    setApiKey(null)
    refetch()
  }

  return (
    <div className={styles.root}>
      {message && <UserMessage {...message} />}
      {!isNull(apiKey) && (
        <FadeIn className={styles.keyField}>
          <TextField value={apiKey} disabled={true} />
        </FadeIn>
      )}
      <List
        columns={columns(onDeleteApiToken, t)}
        items={data?.tokens}
        commandBar={{
          items: [
            {
              key: 'ADD_NEW_TOKEN',
              name: t('admin.apiTokens.addNew'),
              iconProps: { iconName: 'Add' },
              onClick: () => setForm({ isOpen: true })
            }
          ]
        }}
      />
      {form.isOpen && <ApiTokenForm {...form} onAdded={onKeyAdded} onDismiss={() => setForm({ isOpen: false })} />}
    </div>
  )
}
