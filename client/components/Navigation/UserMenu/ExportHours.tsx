import { ChoiceGroup } from 'office-ui-fabric-react'
import { DefaultButton, PrimaryButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './UserMenu.module.scss'

export const ExportHours: React.FunctionComponent<{}> = () => {
    const { t } = useTranslation()
    return (
        <a href='#' className={styles.menuItem}>
            <Icon iconName='CloudImportExport' className={styles.icon} />
            <span>{t('common.exportMyHours')}</span>
            <Panel
                headerText={t('common.exportMyHours')}
                isOpen={true}>
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
                <PrimaryButton
                    text='Eksporter'
                    iconProps={{ iconName: 'CloudImportExport' }} />
            </Panel>
        </a>
    )
}