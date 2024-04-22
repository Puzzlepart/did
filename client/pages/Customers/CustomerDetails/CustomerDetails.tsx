import { Tabs } from 'components/Tabs'
import { UserMessage } from 'components/UserMessage'
import { ProjectForm, ProjectsContext } from 'pages/Projects'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { useCustomersContext } from '../context'
import styles from './CustomerDetails.module.scss'
import { CustomerHeader } from './CustomerHeader'
import { useCustomerDetails } from './useCustomerDetails'
import { CustomerForm } from '../CustomerForm'
import { CustomerInformation } from './CustomerInformation'

/**
 * Displays the details of a customer, including a list of projects.
 *
 * @category Customers
 */
export const CustomerDetails: StyledComponent = () => {
  const { t } = useTranslation()
  const context = useCustomersContext()
  const { projects, error, tabs, refetch } = useCustomerDetails()
  return (
    <div className={CustomerDetails.className}>
      <ProjectsContext.Provider value={{ state: { projects } }}>
        <CustomerHeader />
        {error && (
          <UserMessage intent='error'>
            {t('common.genericErrorText')}
          </UserMessage>
        )}
        <CustomerInformation />
        <Tabs items={tabs} level={3} />
        <CustomerForm {...context.state.customerForm} />
        <ProjectForm {...context.state.projectForm} refetch={refetch} />
      </ProjectsContext.Provider>
    </div>
  )
}

CustomerDetails.displayName = 'CustomerDetails'
CustomerDetails.className = styles.customerDetails
