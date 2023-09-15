import { List, Toast } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { ApiKeyDisplay } from './ApiKeyDisplay'
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
    items,
    form,
    setForm,
    apiKey,
    columns,
    onKeyAdded,
    confirmationDialog,
    toast,
    onKeyCopied
  } = useApiTokens()

  return (
    <div className={ApiTokens.className}>
      <Toast {...toast} />
      <ApiKeyDisplay apiKey={apiKey} onKeyCopied={onKeyCopied} />
      <List
        columns={columns}
        items={items}
        menuItems={[
          new ListMenuItem(t('admin.apiTokens.addNew'))
            .withIcon('Add')
            .setOnClick(() => setForm({ isOpen: true }))
        ]}
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

ApiTokens.displayName = 'ApiTokens'
ApiTokens.className = styles.apiTokens
