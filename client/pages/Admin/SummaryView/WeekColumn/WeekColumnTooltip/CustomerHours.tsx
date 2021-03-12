/* eslint-disable tsdoc/syntax */
import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Component that hows the total hours
 * for a customer in a week.
 *
 * @category SummaryView
 */
export const CustomerHours = (props: any) => {
  const { t } = useTranslation()
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: t('common.weekColumnTooltipHoursCustomer', props)
      }}></div>
  )
}
