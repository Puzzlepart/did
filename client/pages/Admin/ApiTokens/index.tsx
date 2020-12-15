import { useMutation, useQuery } from '@apollo/client'
import { useMessage, UserMessage } from 'components'
import List from 'components/List'
import { MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import React, { useState } from 'react'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import { isNull } from 'underscore'
import { ApiTokenForm } from './ApiTokenForm'
import { IApiTokenFormProps } from './ApiTokenForm/types'
import styles from './ApiTokens.module.scss'
import { ApiTokensColumns as columns } from './columns'
import $deleteApiToken from './deleteApiToken.gql'
import $tokens from './tokens.gql'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { Icon } from 'office-ui-fabric'

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
   */
  function onKeyAdded(generatedKey: string) {
    setForm({})
    if (generatedKey) {
      setMessage({ text: t('admin.tokenGeneratedText') }, 20000)
      setApiKey(generatedKey)
    }
    else setMessage({ type: MessageBarType.error, text: t('admin.tokenErrorText') })
    refetch()
  }

  return (
    <div className={styles.root}>
      {message && <UserMessage {...message} />}
      {!isNull(apiKey) && (
        <FadeIn className={styles.apiKey}>
          <UserMessage
            type={MessageBarType.success}
            iconName='Cloud'>
            <span className={styles.text}>{apiKey}</span>
            <span className={styles.copy}>
              <CopyToClipboard text={apiKey}>
                <Icon iconName='Copy' />
              </CopyToClipboard>
            </span>
          </UserMessage>
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
      {form.isOpen && (
        <ApiTokenForm {...form} onAdded={onKeyAdded} onDismiss={() => setForm({ isOpen: false })} />
      )}
    </div>
  )
}
