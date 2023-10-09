import { CheckboxVisibility, SelectionMode } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { List, Panel } from 'components'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { UsersContext } from '../context'
import { IBulkImportPanelProps } from './types'

export const BulkImportPanel: StyledComponent<IBulkImportPanelProps> = (
  props
) => {
  const { t } = useTranslation()
  const context = useContext(UsersContext)
  const [selectedUsers, setSelectedUsers] = useState([])

  return (
    <Panel
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
        items={context.state.availableAdUsers}
        selectionProps={[SelectionMode.multiple, setSelectedUsers]}
        checkboxVisibility={CheckboxVisibility.always}
        columns={[
          {
            key: 'displayName',
            fieldName: 'displayName',
            name: t('common.displayNameLabel'),
            minWidth: 100
          }
        ]}
      />
    </Panel>
  )
}

BulkImportPanel.displayName = 'BulkImportPanel'
