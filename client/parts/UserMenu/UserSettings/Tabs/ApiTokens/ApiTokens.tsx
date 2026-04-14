import { Input, Label, MessageBar, Text } from '@fluentui/react-components'
import { SelectionMode } from 'components/List/types'
import { List, ListMenuItem } from 'components'
import React, { useState } from 'react'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { useTranslation } from 'react-i18next'
import { createColumnDef } from 'utils'
import { PersonalAccessTokenForm } from './PersonalAccessTokenForm'
import { usePersonalAccessTokens } from './usePersonalAccessTokens'

export const ApiTokensTab: React.FC = () => {
  const { t } = useTranslation()
  const {
    items,
    newToken,
    onTokenAdded,
    onDelete,
    onSelectionChanged,
    selectedToken,
    confirmationDialog
  } = usePersonalAccessTokens()
  const [formOpen, setFormOpen] = useState(false)
  const [copied, setCopied] = useState(false)

  const columns = [
    createColumnDef('name', t('userSettings.apiTokens.tokenNameLabel'), {
      minWidth: 60,
      maxWidth: 120
    }),
    createColumnDef('created', t('common.createdLabel'), {
      minWidth: 60,
      maxWidth: 100,
      renderAs: 'timeFromNow'
    }),
    createColumnDef('expires', t('common.expiresLabel'), {
      minWidth: 60,
      maxWidth: 100,
      renderAs: 'timeFromNow'
    })
  ]

  return (
    <div style={{ overflow: 'hidden' }}>
      {newToken?.apiKey && (
        <MessageBar intent='success' style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, minWidth: 0 }}>
            <Label weight='semibold'>
              {t('userSettings.apiTokens.apiKeyGenerated')}
            </Label>
            <CopyToClipboard
              text={newToken.apiKey}
              onCopy={() => setCopied(true)}
            >
              <Input
                readOnly
                value={newToken.apiKey}
                style={{ cursor: 'pointer', fontFamily: 'monospace', fontSize: 12 }}
              />
            </CopyToClipboard>
            <Text size={200}>
              {copied
                ? t('admin.apiTokens.apiKeyCopied', newToken)
                : t('userSettings.apiTokens.apiKeyGenerated')}
            </Text>
          </div>
        </MessageBar>
      )}
      {items.length === 0 && !newToken && !formOpen && (
        <p>{t('userSettings.apiTokens.emptyState')}</p>
      )}
      <List
        columns={columns}
        items={items}
        autoFitColumns={false}
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
            setCopied(false)
            onTokenAdded(token)
          }}
          onDismiss={() => setFormOpen(false)}
        />
      )}
      {confirmationDialog}
    </div>
  )
}

ApiTokensTab.displayName = 'ApiTokensTab'
