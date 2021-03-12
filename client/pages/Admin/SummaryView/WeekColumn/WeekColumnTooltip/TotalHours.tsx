/* eslint-disable tsdoc/syntax */
import React from 'react'
import { useTranslation } from 'react-i18next'

/**
 * Component taht shows the total hours
 * for the week.
 *
 * @category SummaryView
 */
export const TotalHours = (props: any) => {
  const { t } = useTranslation()
  return (
    <div
      dangerouslySetInnerHTML={{
        __html: t('common.weekColumnTooltipHoursTotal', props)
      }}></div>
  )
}
