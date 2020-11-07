import { useId } from '@uifabric/react-hooks'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { ChoiceGroup } from 'office-ui-fabric-react/lib/ChoiceGroup'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { format } from 'office-ui-fabric-react/lib/Utilities'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { exportExcel } from 'utils/exportExcel'
import { client } from '../../../graphql'
import columns from '../columns'
import styles from '../UserMenu.module.scss'
import $timeentries  from './timeentries.gql'
import { getExportTypes, IExportType } from './types'

export const ExportHours: React.FunctionComponent = () => {
    const { t } = useTranslation()
    const exportTypes = getExportTypes(t)
    const [exportType, setExportType] = useState(first(exportTypes))
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
            query: $timeentries,
            variables: exportType.variables,
        })
        await exportExcel(
            data.timeentries,
            {
                columns: columns(t),
                fileName: format(
                    exportType.exportFileName,
                    new Date().toDateString().split(' ').join('-')
                ),
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
                    defaultSelectedKey={exportType.key}
                    onChange={(_eve, option: IExportType) => setExportType(option)}
                    options={getExportTypes(t)} />
                <DefaultButton
                    text={t('common.export')}
                    styles={{ root: { marginTop: 20, width: '100%' } }}
                    onClick={onExport} />
            </Panel>
        </>
    )
}