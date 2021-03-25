/* eslint-disable tsdoc/syntax */
import { useQuery } from '@apollo/client'
import { UserMessage } from 'components/UserMessage'
import { ProjectList } from 'pages/Projects'
import React, { useContext } from 'react'
import { useTranslation } from 'react-i18next'
import { CustomersContext } from '../context'
import styles from './CustomerDetails.module.scss'
import { Header } from './Header'
import $projects from './projects.gql'

/**
 * @category Customers
 */
export const CustomerDetails: React.FC = () => {
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
          type={'warning'}
        />
      )}
      <div>
        {error && (
          <UserMessage type='error'>{t('common.genericErrorText')}</UserMessage>
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
