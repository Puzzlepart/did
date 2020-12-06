import { DefaultButton, Icon } from 'office-ui-fabric'
import { CustomersContext } from 'pages/Customers/context'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './Header.module.scss'

export const Header: FunctionComponent = () => {
    const { t } = useTranslation()
    const context = useContext(CustomersContext)
    return (
        <div className={styles.root}>
            <div className={styles.iconContainer}>
                <Icon iconName={context.selected.icon || 'Page'} />
            </div>
            <div className={styles.title}>
                <div className={styles.text}>{context.selected.name}</div>
            </div>
            <div className={styles.actions}>
                <div
                    className={styles.buttonContainer}
                    hidden={context.loading  || !context.selected.webLink}>
                    <DefaultButton
                        text={t('customers.webLinkText')}
                        href={context.selected.webLink}
                        iconProps={{ iconName: 'Website' }}
                    />
                </div>
                <div
                    className={styles.buttonContainer}
                    hidden={context.loading  || !context.selected.externalSystemURL}>
                    <DefaultButton
                        text={t('customers.externalSystemUrlText')}
                        href={context.selected.externalSystemURL}
                        iconProps={{ iconName: 'System' }}
                    />
                </div>
            </div>
        </div>
    )
}
