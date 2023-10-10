import { SelectionMode } from '@fluentui/react'
import { List } from 'components'
import { ListMenuItem } from 'components/List/ListToolbar'
import { TabComponent } from 'components/Tabs'
import { usePermissions } from 'hooks'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { PermissionScope as $ } from '../../../../shared/config/security/types'
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
    columns,
    onTokenAdded,
    confirmationDialog,
    onKeyCopied,
    onDelete,
    onSelectionChanged,
    selectedToken,
    newToken
  } = useApiTokens()
  const [, hasPermission] = usePermissions()
  return (
    <div className={ApiTokens.className}>
      <ApiKeyDisplay
        label={t('admin.apiTokens.apiKeyGenerated')}
        apiKey={newToken?.apiKey}
        onKeyCopied={() => onKeyCopied(newToken)}
      />
      <List
        columns={columns}
        items={items}
        selectionProps={[SelectionMode.single, onSelectionChanged]}
        menuItems={[
          new ListMenuItem(t('admin.apiTokens.addNew'))
            .withIcon('Add')
            .setDisabled(!hasPermission($.MANAGE_API_TOKENS))
            .setOnClick(() => setForm({ open: true })),
          new ListMenuItem(t('admin.apiTokens.delete'))
            .setOnClick(onDelete)
            .withIcon('Delete')
            .setGroup('actions')
            .setDisabled(!selectedToken || !hasPermission($.MANAGE_API_TOKENS))
        ]}
      />
      {form.open && (
        <ApiTokenForm
          {...form}
          tokens={items}
          onTokenAdded={onTokenAdded}
          onDismiss={() => setForm({ open: false })}
        />
      )}
      {confirmationDialog}
    </div>
  )
}

ApiTokens.displayName = 'ApiTokens'
ApiTokens.className = styles.apiTokens
