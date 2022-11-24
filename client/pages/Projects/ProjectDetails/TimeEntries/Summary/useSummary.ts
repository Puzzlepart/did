import $date from 'DateUtils'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { getSum } from 'utils/getSum'
import { ISummaryProps } from './types'

/**
 * Component logic hook for `<Summary />`
 *
 * @category Projects
 */
export function useSummary(props: ISummaryProps) {
  const { t } = useTranslation()
  const year = new Date().getFullYear(),
    month = new Date().getMonth()
  const config: Record<string, (entry: any) => boolean> = {
    [t('common.hoursCurrentMonth')]: (entry) =>
      entry.month === month + 1 && entry.year === year,
    [t('common.hoursPrevMonth')]: (entry) =>
      entry.month === month && entry.year === year,
    [t('common.hoursCurrentYear', { year })]: (entry) => entry.year === year,
    [t('common.hoursYear', { year: year - 1 })]: (entry) =>
      entry.year === year - 1,
    [t('common.totalHours')]: () => true
  }
  return Object.keys(config).map((label) => {
    const filterFunction = config[label]
    const hours = getSum(
      _.filter(props.timeEntries, filterFunction),
      'duration'
    )
    return {
      label,
      value: $date.getDurationString(hours, t)
    }
  })
}
