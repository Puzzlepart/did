import { CheckboxVisibility, PanelType, SelectionMode } from '@fluentui/react'
import { Button } from '@fluentui/react-components'
import { BasePanel, List } from 'components'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import _ from 'underscore'
import { UsersContext } from '../context'
import styles from './AddMultiplePanel.module.scss'
import { IAddMultiplePanelProps } from './types'

export const AddMultiplePanel: StyledComponent<IAddMultiplePanelProps> = (
  props
) => {
  const { t } = useTranslation()
  const context = useContext(UsersContext)
  const [selectedUsers, setSelectedUsers] = useState([])

  return (
    <BasePanel
      {..._.pick(props, 'onDismiss', 'isOpen')}
      headerText={t('admin.users.bulkImportUsersLabel')}
      type={PanelType.medium}
      isLightDismiss={true}
      className={AddMultiplePanel.className}
    >
      <div className={styles.container}>
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
      </div>
    </BasePanel>
  )
}

AddMultiplePanel.displayName = 'AddMultiplePanel'
AddMultiplePanel.className = styles.addMultiplePanel

export * from './types'
