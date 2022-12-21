import {
  CheckboxVisibility,
  Panel,
  PanelType,
  PrimaryButton,
  SelectionMode
} from '@fluentui/react'
import { List } from 'components'
import React, { FC, useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { UsersContext } from '../context'
import styles from './AddMultiplePanel.module.scss'
import { IAddMultiplePanelProps } from './types'

export const AddMultiplePanel: FC<IAddMultiplePanelProps> = (props) => {
  const { t } = useTranslation()
  const context = useContext(UsersContext)
  const [selectedUsers, setSelectedUsers] = useState([])

  return (
    <Panel
      {..._.pick(props, 'onDismiss', 'isOpen')}
      headerText={t('admin.users.bulkImportUsersLabel')}
      type={PanelType.medium}
      isLightDismiss={true}
      className={styles.root}
    >
      <div className={styles.container}>
        <PrimaryButton
          text={t('admin.users.bulkImportUsersLabel')}
          disabled={selectedUsers.length === 0}
          onClick={() => props.onAdd(selectedUsers)}
        />
        <List
          items={context.state.availableAdUsers}
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
