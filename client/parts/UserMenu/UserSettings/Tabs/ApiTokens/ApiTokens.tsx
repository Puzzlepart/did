import { SelectionMode } from 'components/List/types'
import { List, ListMenuItem } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { createColumnDef } from 'utils'
import { ApiKeyDisplay } from 'pages/Admin/ApiTokens/ApiKeyDisplay'
import { PersonalAccessTokenForm } from './PersonalAccessTokenForm'
import { usePersonalAccessTokens } from './usePersonalAccessTokens'

export const ApiTokensTab: React.FC = () => {
  const { t } = useTranslation()
  const {
    items,
    newToken,
    onTokenAdded,
    onDelete,
    onKeyCopied,
    onSelectionChanged,
    selectedToken,
    confirmationDialog
  } = usePersonalAccessTokens()
  const [formOpen, setFormOpen] = useState(false)

  const columns = [
    createColumnDef('name', t('userSettings.apiTokens.tokenNameLabel'), {
      minWidth: 100,
      maxWidth: 150
    }),
    createColumnDef('description', t('common.descriptionFieldLabel'), {
      minWidth: 150,
      maxWidth: 250,
      isMultiline: true
    }),
    createColumnDef('created', t('common.createdLabel'), {
      minWidth: 100,
      maxWidth: 150,
      renderAs: 'timeFromNow'
    }),
    createColumnDef('expires', t('common.expiresLabel'), {
      minWidth: 100,
      maxWidth: 150,
      renderAs: 'timeFromNow'
    })
  ]

  return (
    <div>
      <ApiKeyDisplay
        label={t('userSettings.apiTokens.apiKeyGenerated')}
        apiKey={newToken?.apiKey}
        onKeyCopied={() => onKeyCopied()}
      />
      {items.length === 0 && !newToken && !formOpen && (
        <p>{t('userSettings.apiTokens.emptyState')}</p>
      )}
      <List
        columns={columns}
        items={items}
        selectionProps={[SelectionMode.single, onSelectionChanged]}
        menuItems={[
          new ListMenuItem(t('userSettings.apiTokens.addNew'))
            .withIcon('Add')
            .setOnClick(() => setFormOpen(true)),
          new ListMenuItem(t('userSettings.apiTokens.delete'))
            .setOnClick(onDelete)
            .withIcon('Delete')
            .setGroup('actions')
            .setDisabled(!selectedToken)
        ]}
      />
      {formOpen && (
        <PersonalAccessTokenForm
          open={formOpen}
          onTokenAdded={(token) => {
            setFormOpen(false)
            onTokenAdded(token)
          }}
          onDismiss={() => setFormOpen(false)}
          tokens={items}
        />
      )}
      {confirmationDialog}
    </div>
  )
}

ApiTokensTab.displayName = 'ApiTokensTab'
