import { List } from 'components'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { pick } from 'underscore'
import styles from './ImportPanel.module.scss'
import { IImportPanelProps } from './types'

/**
 * @category Admin
 */
export const ImportPanel = (props: IImportPanelProps) => {
    const { t } = useTranslation('common')

    return (
        <Panel
            {...pick(props, 'onDismiss', 'headerText')}
            className={styles.root}
            isOpen={true}>
            <List
                items={props.users}
                columns={[
                    {
                        key: 'displayName',
                        fieldName: 'displayName',
                        name: t('nameFieldLabel'),
                        minWidth: 100,
                    }
                ]} />
        </Panel>
    )
}

export * from './types'
