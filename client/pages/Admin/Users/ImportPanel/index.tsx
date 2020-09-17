import { List } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { CheckboxVisibility, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import { UsersContext } from '../UsersContext'
import styles from './ImportPanel.module.scss'
import { IImportPanelProps } from './types'

/**
 * @category Admin
 */
export const ImportPanel = (props: IImportPanelProps) => {
    const { adUsers } = useContext(UsersContext)
    const { t } = useTranslation('common')
    const [selectedUsers, setSelectedUsers] = useState([])

    return (
        <Panel
            {...pick(props, 'onDismiss', 'headerText')}
            type={PanelType.medium}
            className={styles.root}
            isOpen={true}>
            <div className={styles.container}>
                <PrimaryButton
                    text={format(t('importUsersLabel', { ns: 'admin' }), selectedUsers.length)}
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
                            name: t('nameFieldLabel'),
                            minWidth: 100,
                        }
                    ]} />
            </div>
        </Panel>
    )
}

export * from './types'
