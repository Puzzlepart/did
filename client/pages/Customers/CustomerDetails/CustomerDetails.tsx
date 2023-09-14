import { Tabs } from 'components/Tabs'
import { UserMessage } from 'components/UserMessage'
import { ProjectList } from 'pages/Projects/ProjectsPage'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './CustomerDetails.module.scss'
import { CustomerHeader } from './CustomerHeader'
import { CustomerInformation } from './CustomerInformation'
import { useCustomerDetails } from './useCustomerDetails'

/**
 * Displays the details of a customer, including a list of projects.
 *
 * @category Customers
 */
export const CustomerDetails: StyledComponent = () => {
  const { t } = useTranslation()
  const { selected, error, projects, loading } = useCustomerDetails()

  return (
    <div className={CustomerDetails.className}>
      <CustomerHeader />
      {error && (
        <UserMessage intent='error'>{t('common.genericErrorText')}</UserMessage>
      )}
      <Tabs
        items={{
          information: [
            CustomerInformation,
            t('customers.informationHeaderText')
          ],
          projects: [
            ProjectList,
            t('customers.projectsHeaderText'),
            {
              items: projects,
              hideColumns: ['customer'],
              enableShimmer: loading,
              searchBox: {
                placeholder: t('customers.searchProjectsPlaceholder', selected),
                disabled: loading
              }
            }
          ]
        }}
      />
    </div>
  )
}

CustomerDetails.displayName = 'CustomerDetails'
CustomerDetails.className = styles.customerDetails
