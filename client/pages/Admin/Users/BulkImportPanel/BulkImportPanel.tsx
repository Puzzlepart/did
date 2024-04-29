import { CheckboxVisibility, SelectionMode } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { List, Panel } from 'components'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './BulkImportPanel.module.scss'
import { IBulkImportPanelProps } from './types'
import { useBulkImportPanel } from './useBulkImportPanel'

export const BulkImportPanel: StyledComponent<IBulkImportPanelProps> = (
  props
) => {
  const { t } = useTranslation()
  const { selectedUsers, setSelectedUsers, availableUsers } =
    useBulkImportPanel()
  return (
    <Panel
      className={styles.bulkImportPanel}
      open={props.open}
      onDismiss={props.onDismiss}
      title={t('admin.users.bulkImportUsersLabel')}
    >
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
    </Panel>
  )
}

BulkImportPanel.displayName = 'BulkImportPanel'
