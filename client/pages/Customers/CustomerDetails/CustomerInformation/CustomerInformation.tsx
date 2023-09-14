import { UserMessage } from 'components/UserMessage'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { StyledComponent } from 'types'
import { useCustomersContext } from '../../context'
import styles from './CustomerInformation.module.scss'
import { InformationProperty } from './InformationProperty'

/**
 * Shows details about the selected customer.
 *
 * @category Customers
 */
export const CustomerInformation: StyledComponent = () => {
  const { t } = useTranslation()
  const { state } = useCustomersContext()

  return (
    <div className={CustomerInformation.className}>
      <UserMessage
        hidden={!state.selected?.inactive}
        text={t('customers.inactiveText')}
        intent='warning'
      />
      <InformationProperty
        title={t('projects.tagLabel')}
        value={state.selected?.key}
      />
    </div>
  )
}

CustomerInformation.displayName = 'CustomerInformation'
CustomerInformation.className = styles.customerInformation
