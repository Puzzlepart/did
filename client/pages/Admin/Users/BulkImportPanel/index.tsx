import { List } from 'components'
import {
  CheckboxVisibility,
  SelectionMode,
  PrimaryButton,
  Panel,
  PanelType
} from 'office-ui-fabric'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import { UsersContext } from '../context'
import styles from './BulkImportPanel.module.scss'
import { IBulkImportPanelProps } from './types'

export const BulkImportPanel = (props: IBulkImportPanelProps) => {
  const { adUsers } = useContext(UsersContext)
  const { t } = useTranslation()
  const [selectedUsers, setSelectedUsers] = useState([])

  return (
    <Panel
      {...pick(props, 'onDismiss', 'isOpen')}
      headerText={t('admin.bulkImportUsersLabel')}
      type={PanelType.medium}
      className={styles.root}>
      <div className={styles.container}>
        <PrimaryButton
          text={t('admin.bulkImportUsersLabel')}
          disabled={selectedUsers.length === 0}
          onClick={() => props.onImport(selectedUsers)}
        />
        <List
          items={adUsers}
          selection={{
            mode: SelectionMode.multiple,
            onChanged: (selected) => setSelectedUsers(selected)
          }}
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
      </div>
    </Panel>
  )
}

export * from './types'
