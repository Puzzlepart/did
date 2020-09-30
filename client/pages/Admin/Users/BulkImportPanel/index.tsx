import { List } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { CheckboxVisibility, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import { UsersContext } from '../context'
import styles from './BulkImportPanel.module.scss'
import { IBulkImportPanelProps } from './types'

/**
 * @category Admin
 */
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
                    text={format(t('admin.bulkImportUsersLabel'), selectedUsers.length)}
                    disabled={selectedUsers.length === 0}
                    onClick={() => props.onImport(selectedUsers)} />
                <List
                    items={adUsers}
                    selection={{
                        mode: SelectionMode.multiple,
                        onChanged: selected => setSelectedUsers(selected)
                    }}
                    checkboxVisibility={CheckboxVisibility.always}
                    columns={[
                        {
                            key: 'displayName',
                            fieldName: 'displayName',
                            name: t('common.displayNameLabel'),
                            minWidth: 100,
                        }
                    ]} />
            </div>
        </Panel>
    )
}

export * from './types'
