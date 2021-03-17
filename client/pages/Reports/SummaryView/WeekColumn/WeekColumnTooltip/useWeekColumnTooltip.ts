/* eslint-disable tsdoc/syntax */
import { DateObject } from 'DateUtils'
import { useTranslation } from 'react-i18next'
import { first } from 'underscore'
import { IWeekColumnTooltipProps } from './types'

/**
 * @ignore
 */
export function useWeekColumnTooltip(props: IWeekColumnTooltipProps) {
  const { t } = useTranslation()
  const { week, year } = first(props.periods)
  const customerTotals = Object.keys(props.hours.project)
    .map((key) => {
      const { hours, details } = props.hours.project[key]
      return { customer: details.customer.name, hours }
    })
    .sort(({ customer: a }, { customer: b }) => {
      if (a < b) return -1
      if (a > b) return 1
      return 0
    })
  return {
    week,
    year,
    month: new DateObject().fromObject({ week, year }).format('MMM'),
    customerTotals,
    t
  }
}
