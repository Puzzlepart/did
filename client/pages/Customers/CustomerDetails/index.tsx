import { useQuery } from '@apollo/react-hooks'
import { UserMessage } from 'components/UserMessage'
import { value as value } from 'helpers'
import { IProject } from 'interfaces/IProject'
import { DefaultButton } from 'office-ui-fabric-react/lib/Button'
import { Icon } from 'office-ui-fabric-react/lib/Icon'
import { MessageBar, MessageBarType } from 'office-ui-fabric-react/lib/MessageBar'
import { ProjectList } from 'pages/Projects'
import GET_PROJECTS from 'pages/Projects/GET_PROJECTS'
import * as React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CustomerDetails.module.scss'
import { ICustomerDetailsProps } from './types'

/**
 * @category Customers
 */
export const CustomerDetails = (props: ICustomerDetailsProps) => {
    const { t } = useTranslation(['customers', 'common', 'projects'])
    const { loading, error, data } = useQuery(
        GET_PROJECTS,
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
                            text={t('webLinkText')}
                            href={props.customer.webLink}
                            iconProps={{ iconName: 'WorkforceManagement' }} />
                    </div>
                    <div
                        className={styles.buttonContainer}
                        hidden={loading || !!error || !props.customer.externalSystemURL} >
                        <DefaultButton
                            text={t('externalSystemUrlText')}
                            href={props.customer.externalSystemURL}
                            iconProps={{ iconName: 'WorkforceManagement' }} />
                    </div>
                </div>
            </div>
            {props.customer.inactive && (
                <UserMessage
                    text={t('inactiveText')}
                    iconName='Warning'
                    type={MessageBarType.warning} />
            )}
            <div className={styles.description}>{props.customer.description}</div>
            <div>
                {error && <MessageBar messageBarType={MessageBarType.error}>{t('genericErrorText')}</MessageBar>}
                {!error && (
                    <ProjectList
                        items={value<IProject[]>(data, 'projects', [])}
                        enableShimmer={loading}
                        searchBox={{ placeholder: t('searchPlaceholder', { ns: 'projects' }) }}
                        renderLink={true}
                        height={300} />
                )}
            </div>
        </div>
    )
}
