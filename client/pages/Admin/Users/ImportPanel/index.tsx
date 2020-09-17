import { List } from 'components'
import { PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { CheckboxVisibility, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList'
import { Panel, PanelType } from 'office-ui-fabric-react/lib/Panel'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import styles from './ImportPanel.module.scss'
import { IImportPanelProps } from './types'

/**
 * @category Admin
 */
export const ImportPanel = (props: IImportPanelProps) => {
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
                    text={`Importer ${selectedUsers.length} brukere`}
                    disabled={selectedUsers.length === 0} 
                    onClick={() => props.onImport(selectedUsers)}/>
                <List
                    items={props.users}
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
