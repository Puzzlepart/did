/* eslint-disable tsdoc/syntax */
import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Component taht shows the total hours
 * for the week.
 *
 * @category SummaryView
 */
export const TotalHours = ({ hours }) => {
  const { t } = useTranslation()
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: t('common.weekColumnTooltipHoursTotal', {
          hours: hours.toFixed(0)
        })
      }}></div>
  )
}
