/* eslint-disable tsdoc/syntax */
import { useMutation, useQuery } from '@apollo/client'
import { Icon } from '@fluentui/react'
import { List, TabComponent, useMessage, UserMessage } from 'components'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import { ApiToken } from 'types'
import _ from 'underscore'
import { ApiTokenForm } from './ApiTokenForm'
import { IApiTokenFormProps } from './ApiTokenForm/types'
import styles from './ApiTokens.module.scss'
import $deleteApiToken from './deleteApiToken.gql'
import $tokens from './tokens.gql'
import { useColumns } from './useColumns'

/**
 * Component for handling API tokens.
 *
 * * See created API tokens
 * * Create new API tokens
 * * Delete existing API tokens
 *
 * @category Tab Component
 */
export const ApiTokens: TabComponent = () => {
  const { t } = useTranslation()
  const [message, setMessage] = useMessage()
  const [deleteApiToken] = useMutation($deleteApiToken)
  const { data, refetch } = useQuery($tokens)
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
    refetch()
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
    refetch()
  }

  const columns = useColumns({ onDeleteApiToken })

  return (
    <div className={styles.root}>
      {message && <UserMessage {...message} />}
      {!_.isNull(apiKey) && (
        <FadeIn className={styles.apiKey}>
          <UserMessage type={'success'} iconName='Cloud'>
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
        columns={columns}
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
        <ApiTokenForm
          {...form}
          onAdded={onKeyAdded}
          onDismiss={() => setForm({ isOpen: false })}
        />
      )}
    </div>
  )
}
