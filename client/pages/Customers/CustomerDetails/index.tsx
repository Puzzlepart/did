import { useQuery } from '@apollo/client'
import { UserMessage } from 'components/UserMessage'
import { DefaultButton, Icon, MessageBar, MessageBarType } from 'office-ui-fabric'
import { ProjectList } from 'pages/Projects'
import React, { FunctionComponent } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CustomerDetails.module.scss'
import $projects from './projects.gql'
import { ICustomerDetailsProps } from './types'

export const CustomerDetails: FunctionComponent<ICustomerDetailsProps> = (props: ICustomerDetailsProps) => {
  const { t } = useTranslation()
  const { loading, error, data } = useQuery($projects, {
    variables: {
      sortBy: 'name',
      customerKey: props.customer?.key
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
          <div className={styles.buttonContainer} hidden={loading || !!error || !props.customer.webLink}>
            <DefaultButton
              text={t('customers.webLinkText')}
              href={props.customer.webLink}
              iconProps={{ iconName: 'Website' }}
            />
          </div>
          <div className={styles.buttonContainer} hidden={loading || !!error || !props.customer.externalSystemURL}>
            <DefaultButton
              text={t('customers.externalSystemUrlText')}
              href={props.customer.externalSystemURL}
              iconProps={{ iconName: 'System' }}
            />
          </div>
        </div>
      </div>
      {props.customer.inactive && (
        <UserMessage text={t('customers.inactiveText')} iconName='Warning' type={MessageBarType.warning} />
      )}
      <div className={styles.description}>{props.customer.description}</div>
      <div>
        {error && <MessageBar messageBarType={MessageBarType.error}>{t('common.genericErrorText')}</MessageBar>}
        {!error && (
          <ProjectList
            items={data?.projects || []}
            hideColumns={['customer']}
            enableShimmer={loading}
            searchBox={{ placeholder: t('common.searchPlaceholder') }}
            renderLink={true}
            height={300}
          />
        )}
      </div>
    </div>
  )
}
