import { useId } from '@uifabric/react-hooks'
import { AppContext } from 'AppContext'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import { TextField } from 'office-ui-fabric-react/lib/TextField'
import React, { useContext, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './UserSettings.module.scss'
import schema from './settings.schema.json'

export const SubscriptionSettings = (props: React.HTMLProps<HTMLDivElement>) => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    const [panelOpen, setPanelOpen] = useState(false)
    const toggleId = useId('toggle-panel')

    // eslint-disable-next-line no-console
    console.log(schema)

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

    return (
        <div className={styles.root}>
            <a
                href='#'
                id={toggleId}
                onClick={togglePanel}
                className={props.className}>
                <Icon iconName='Home' className={styles.icon} />
                <span>{user.subscription?.name}</span>
            </a>
            <Panel
                className={styles.panel}
                headerText={t('common.subscription')}
                isOpen={panelOpen}
                onDismiss={togglePanel}
                isLightDismiss={true}>
                <TextField label='Name' />
            </Panel>
        </div>
    )
}