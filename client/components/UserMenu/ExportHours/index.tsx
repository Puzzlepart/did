import { useId } from '@uifabric/react-hooks'
import { client } from '../../../graphql'
import { ChoiceGroup } from 'office-ui-fabric-react'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import {query} from './graphql'
import styles from '../UserMenu.module.scss'
import { exportExcel } from 'utils/exportExcel'
import columns from '../columns'

export const ExportHours: React.FunctionComponent<{}> = () => {
    const { t } = useTranslation()
    const [panelOpen, setPanelOpen] = useState(false)
    const toggleId = useId('toggle-panel')

    /**
     * Toggle panel
     * 
     * @param {React.MouseEvent} event Event
     */
    const togglePanel = (event: React.MouseEvent<any>) => {
        switch (event.currentTarget.id) {
            case toggleId: setPanelOpen(true)
                break
            default: setPanelOpen(false)
        }
    }

    const onExport = async () => {
        const { data } = await client.query({
            query: query.timeentries,
            variables: {
                year: 2020,
                startMonthIndex: 9,
                endMonthIndex: 9,
            }
        })
        await exportExcel(
            data.timeentries,
            {
                columns: columns(t),
                fileName: 'Test.xlsx',
            }
        )
        setPanelOpen(false)
    }

    return (
        <>
            <a
                href='#'
                id={toggleId}
                onClick={togglePanel}
                className={styles.menuItem}>
                <Icon iconName='CloudImportExport' className={styles.icon} />
                <span>{t('common.exportMyHours')}</span>
            </a>
            <Panel
                headerText={t('common.exportMyHours')}
                isOpen={panelOpen}
                onDismiss={togglePanel}
                isLightDismiss={true}>
                <ChoiceGroup
                    defaultSelectedKey='lastMonth'
                    options={[
                        {
                            key: 'lastMonth',
                            text: 'Forrige måned (september)'
                        },
                        {
                            key: 'currentMonth',
                            text: 'Inneværende måned (oktober)'
                        },
                        {
                            key: 'forecast',
                            text: 'Hittil i år (2020)'
                        }
                    ]} />
                <DefaultButton
                    text={t('common.export')}
                    styles={{ root: { marginTop: 15 } }}
                    iconProps={{ iconName: 'CloudImportExport' }}
                    onClick={onExport} />
            </Panel>
        </>
    )
}