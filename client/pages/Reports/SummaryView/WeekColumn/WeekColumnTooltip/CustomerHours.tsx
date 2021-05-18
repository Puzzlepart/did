/* eslint-disable tsdoc/syntax */
import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Component that hows the total hours
 * for a customer in a week.
 *
 * @category SummaryView
 */
export const CustomerHours = ({ hours, customer }) => {
  const { t } = useTranslation()
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: t('common.weekColumnTooltipHoursCustomer', {
          hours: hours.toFixed(0),
          customer
        })
      }}></div>
  )
}
