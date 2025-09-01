import { CheckboxVisibility, SelectionMode } from '@fluentui/react'
import { Button, Spinner } from '@fluentui/react-components'
import { List, Panel } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './BulkImportPanel.module.scss'
import { IBulkImportPanelProps } from './types'
import { useBulkImportPanel } from './useBulkImportPanel'
import { useLoadAdUsers } from './useLoadAdUsers'

export const BulkImportPanel: StyledComponent<IBulkImportPanelProps> = (
  props
) => {
  const { t } = useTranslation()
  const { selectedUsers, setSelectedUsers, availableUsers } =
    useBulkImportPanel()
  const { loadUsers, loading, hasUsers } = useLoadAdUsers()

  return (
    <Panel
      className={styles.bulkImportPanel}
      open={props.open}
      onDismiss={props.onDismiss}
      title={t('admin.users.bulkImportUsersLabel')}
    >
      {!hasUsers && (
        <div style={{ marginBottom: '16px' }}>
          <Button
            appearance='secondary'
            disabled={loading}
            onClick={loadUsers}
          >
            {loading ? (
              <>
                <Spinner size='tiny' style={{ marginRight: '8px' }} />
                {t('admin.users.loadingActiveDirectoryUsers')}
              </>
            ) : (
              t('admin.users.loadActiveDirectoryUsers')
            )}
          </Button>
          {!loading && (
            <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>
              {t('admin.users.loadActiveDirectoryUsersDescription')}
            </p>
          )}
        </div>
      )}
      
      {hasUsers && (
        <>
          <Button
            appearance='primary'
            disabled={selectedUsers.length === 0}
            onClick={() => props.onAdd(selectedUsers)}
          >
            {t('admin.users.bulkImportUsersLabel')}
          </Button>
          <List
            items={availableUsers}
            selectionProps={[SelectionMode.multiple, setSelectedUsers]}
            checkboxVisibility={CheckboxVisibility.always}
            columns={[
              {
                key: 'displayName',
                fieldName: 'displayName',
                name: t('common.displayNameLabel'),
                minWidth: 100,
                maxWidth: 150,
                isMultiline: true
              },
              {
                key: 'mail',
                fieldName: 'mail',
                name: t('common.mailLabel'),
                minWidth: 100
              }
            ]}
          />
        </>
      )}
    </Panel>
  )
}

BulkImportPanel.displayName = 'BulkImportPanel'
