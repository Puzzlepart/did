import { AppContext } from 'AppContext'
import { PERMISSION } from 'config/security/permissions'
import { DefaultButton } from 'office-ui-fabric'
import { CustomersContext } from 'pages/Customers/context'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Header.module.scss'

export const Actions: FunctionComponent = () => {
    const { t } = useTranslation()
    const { user } = useContext(AppContext)
    const { state, loading } = useContext(CustomersContext)
    return (

        <div className={styles.actions}>
            <div
                className={styles.actionItem}
                hidden={loading || !state.selected.webLink}>
                <DefaultButton
                    text={t('customers.webLinkText')}
                    href={state.selected.webLink}
                    iconProps={{ iconName: 'Website' }}
                />
            </div>
            <div
                className={styles.actionItem}
                hidden={loading || !state.selected.externalSystemURL}>
                <DefaultButton
                    text={t('customers.externalSystemUrlText')}
                    href={state.selected.externalSystemURL}
                    iconProps={{ iconName: 'System' }}
                />
            </div>
            <div className={styles.actionItem} hidden={!user.hasPermission(PERMISSION.MANAGE_CUSTOMERS)}>
                <DefaultButton
                    text={t('common.editLabel')}
                    iconProps={{ iconName: 'Edit' }}
                />
            </div>
        </div>
    )
}
