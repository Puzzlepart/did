import { UserMessage } from 'components/UserMessage'
import { ProjectList } from 'pages/Projects'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import styles from './CustomerDetails.module.scss'
import { Header } from './Header'
import { Information } from './Information'
import { useCustomerList } from './useCustomerList'

/**
 * @category Customers
 */
export const CustomerDetails: FC = () => {
  const { t } = useTranslation()
  const { error, projects, loading } = useCustomerList()

  return (
    <div className={styles.root}>
      <Header />
      <Information />
      <div>
        {error ? (
          <UserMessage type='error'>{t('common.genericErrorText')}</UserMessage>
        ) : (
          <ProjectList
            items={projects}
            hideColumns={['customer']}
            enableShimmer={loading}
            searchBox={{
              placeholder: t('customers.searchProjectsPlaceholder'),
              disabled: loading
            }}
            renderLink={true}
          />
        )}
      </div>
    </div>
  )
}
