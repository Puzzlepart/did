import { Icon } from '@fluentui/react'
import { List, TabComponent, Toast, UserMessage } from 'components'
import React from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FadeIn from 'react-fade-in'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { ApiTokenForm } from './ApiTokenForm'
import styles from './ApiTokens.module.scss'
import { useApiTokens } from './useApiTokens'

/**
 * Component for handling API tokens.
 *
 * * See created API tokens
 * * Create new API tokens
 * * Delete existing API tokens
 *
 * @ignore
 */
export const ApiTokens: TabComponent = () => {
  const { t } = useTranslation()
  const {
    query,
    form,
    setForm,
    apiKey,
    columns,
    onKeyAdded,
    confirmationDialog,
    toast
  } = useApiTokens()

  return (
    <div className={styles.root}>
      <Toast {...toast} />
      {!_.isNull(apiKey) && (
        <FadeIn className={styles.apiKey}>
          <UserMessage type='success' iconName='Cloud'>
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
        items={query?.data?.tokens}
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
      {confirmationDialog}
    </div>
  )
}
