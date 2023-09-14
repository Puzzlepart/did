import { Tabs } from 'components/Tabs'
import { UserMessage } from 'components/UserMessage'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import styles from './CustomerDetails.module.scss'
import { CustomerHeader } from './CustomerHeader'
import { useCustomerDetails } from './useCustomerDetails'

/**
 * Displays the details of a customer, including a list of projects.
 *
 * @category Customers
 */
export const CustomerDetails: StyledComponent = () => {
  const { t } = useTranslation()
  const { error, tabs } = useCustomerDetails()

  return (
    <div className={CustomerDetails.className}>
      <CustomerHeader />
      {error && (
        <UserMessage intent='error'>{t('common.genericErrorText')}</UserMessage>
      )}
      <Tabs items={tabs} />
    </div>
  )
}

CustomerDetails.displayName = 'CustomerDetails'
CustomerDetails.className = styles.customerDetails
