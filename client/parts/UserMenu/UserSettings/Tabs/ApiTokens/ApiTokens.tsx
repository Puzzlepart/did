import { Button, Input, Label, MessageBar } from '@fluentui/react-components'
import { Copy20Regular, Checkmark20Regular } from '@fluentui/react-icons'
import { CheckboxVisibility, SelectionMode } from 'components/List/types'
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
      minWidth: 110,
      maxWidth: 170
    }),
    createColumnDef('created', t('common.createdLabel'), {
      minWidth: 160,
      maxWidth: 200,
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
        <MessageBar intent={copied ? 'success' : 'warning'} style={{ marginBottom: 12 }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, minWidth: 0 }}>
            <Label weight='semibold'>
              {t('userSettings.apiTokens.apiKeyGenerated')}
            </Label>
            <Input
              readOnly
              value={newToken.apiKey}
              style={{ fontFamily: 'monospace', fontSize: 12 }}
            />
            <CopyToClipboard
              text={newToken.apiKey}
              onCopy={() => setCopied(true)}
            >
              <Button
                appearance={copied ? 'subtle' : 'primary'}
                icon={copied ? <Checkmark20Regular /> : <Copy20Regular />}
                size='large'
                style={{ width: '100%' }}
              >
                {copied ? t('common.copied') : t('common.copyToClipboard')}
              </Button>
            </CopyToClipboard>
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
        checkboxVisibility={CheckboxVisibility.hidden}
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
