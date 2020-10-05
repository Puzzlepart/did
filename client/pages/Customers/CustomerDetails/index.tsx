import { useQuery } from '@apollo/react-hooks'
import { UserMessage } from 'components/UserMessage'
import { value as value } from 'helpers'
import { IProject } from 'types/IProject'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { ProjectList } from 'pages/Projects'
import graphql from 'pages/Projects/graphql'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CustomerDetails.module.scss'
import { ICustomerDetailsProps } from './types'


export const CustomerDetails = (props: ICustomerDetailsProps) => {
    const { t } = useTranslation()
    const { loading, error, data } = useQuery(
        graphql.query.projects,
        {
            variables: {
                sortBy: 'name',
                customerKey: value<string>(props, 'customer.key', '')
            }
        })

    return (
        <div className={styles.root}>
            <div className={styles.header}>
                <div className={styles.iconContainer}>
                    <Icon iconName={props.customer.icon || 'Page'} />
                </div>
                <div className={styles.title}>
                    <div className={styles.text}>{props.customer.name}</div>
                </div>
                <div className={styles.actions}>
                    <div
                        className={styles.buttonContainer}
                        hidden={loading || !!error || !props.customer.webLink}>
                        <DefaultButton
                            text={t('customers.webLinkText')}
                            href={props.customer.webLink}
                            iconProps={{ iconName: 'WorkforceManagement' }} />
                    </div>
                    <div
                        className={styles.buttonContainer}
                        hidden={loading || !!error || !props.customer.externalSystemURL} >
                        <DefaultButton
                            text={t('customers.externalSystemUrlText')}
                            href={props.customer.externalSystemURL}
                            iconProps={{ iconName: 'WorkforceManagement' }} />
                    </div>
                </div>
            </div>
            {props.customer.inactive && (
                <UserMessage
                    text={t('customers.inactiveText')}
                    iconName='Warning'
                    type={MessageBarType.warning} />
            )}
            <div className={styles.description}>{props.customer.description}</div>
            <div>
                {error && <MessageBar messageBarType={MessageBarType.error}>{t('common.genericErrorText')}</MessageBar>}
                {!error && (
                    <ProjectList
                        items={value<IProject[]>(data, 'projects', [])}
                        enableShimmer={loading}
                        searchBox={{ placeholder: t('common.searchPlaceholder') }}
                        renderLink={true}
                        height={300} />
                )}
            </div>
        </div>
    )
}
