import { DefaultButton, Icon } from 'office-ui-fabric'
import { CustomersContext } from 'pages/Customers/context'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Header.module.scss'

export const Header: FunctionComponent = () => {
    const { t } = useTranslation()
    const { state, loading } = useContext(CustomersContext)
    return (
        <div className={styles.root}>
            <div className={styles.iconContainer}>
                <Icon iconName={state.selected.icon || 'Page'} />
            </div>
            <div className={styles.title}>
                <div className={styles.text}>{state.selected.name}</div>
            </div>
            <div className={styles.actions}>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !state.selected.webLink}>
                    <DefaultButton
                        text={t('customers.webLinkText')}
                        href={state.selected.webLink}
                        iconProps={{ iconName: 'Website' }}
                    />
                </div>
                <div
                    className={styles.buttonContainer}
                    hidden={loading || !state.selected.externalSystemURL}>
                    <DefaultButton
                        text={t('customers.externalSystemUrlText')}
                        href={state.selected.externalSystemURL}
                        iconProps={{ iconName: 'System' }}
                    />
                </div>
            </div>
        </div>
    )
}
