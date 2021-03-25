import {
  CheckboxVisibility,
  Panel,
  PanelType,
  PrimaryButton,
  SelectionMode
} from '@fluentui/react'
import { List } from 'components'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import { UsersContext } from '../context'
import styles from './AddMultiplePanel.module.scss'
import { IAddMultiplePanel } from './types'

export const AddMultiplePanel: React.FC<IAddMultiplePanel> = (props) => {
  const { activeDirectoryUsers } = useContext(UsersContext)
  const { t } = useTranslation()
  const [selectedUsers, setSelectedUsers] = useState([])

  return (
    <Panel
      {...pick(props, 'onDismiss', 'isOpen')}
      headerText={t('admin.bulkImportUsersLabel')}
      type={PanelType.medium}
      isLightDismiss={true}
      className={styles.root}>
      <div className={styles.container}>
        <PrimaryButton
          text={t('admin.bulkImportUsersLabel')}
          disabled={selectedUsers.length === 0}
          onClick={() => props.onAdd(selectedUsers)}
        />
        <List
          items={activeDirectoryUsers}
          selectionProps={{
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
