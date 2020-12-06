import { useQuery } from '@apollo/client'
import { UserMessage } from 'components/UserMessage'
import { MessageBar, MessageBarType } from 'office-ui-fabric'
import { ProjectList } from 'pages/Projects'
import React, { FunctionComponent, useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import styles from './CustomerDetails.module.scss'
import { Header } from './Header'
import $projects from './projects.gql'

export const CustomerDetails: FunctionComponent = () => {
  const { t } = useTranslation()
  const { state } = useContext(CustomersContext)
  const { loading, error, data } = useQuery($projects, {
    variables: {
      customerKey: state.selected?.key
    }
  })

  return (
    <div className={styles.root}>
      <Header />
      {state.selected.inactive && (
        <UserMessage
          text={t('customers.inactiveText')}
          iconName='Warning'
          type={MessageBarType.warning}
        />
      )}
      <div className={styles.description}>{state.selected.description}</div>
      <div>
        {error && (
          <MessageBar messageBarType={MessageBarType.error}>
            {t('common.genericErrorText')}
          </MessageBar>
        )}
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
