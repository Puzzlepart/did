import { UserMessage } from 'components/UserMessage'
import { ProjectList } from 'pages/Projects'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './CustomerDetails.module.scss'
import { Header } from './Header'
import { Information } from './Information'
import { useCustomerList } from './useCustomerList'



/**
 * @category Customers
 */
export const CustomerDetails: StyledComponent = () => {
  const { t } = useTranslation()
  const { error, projects, loading } = useCustomerList()

  return (
    <div className={CustomerDetails.className}>
      <Header />
      <Information />
      <div>
        {error ? (
          <UserMessage intent='error'>
            {t('common.genericErrorText')}
          </UserMessage>
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

CustomerDetails.className = styles.customerDetails
