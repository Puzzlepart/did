import $date from 'DateUtils'
import { useTranslation } from 'react-i18next'
import _ from 'underscore'
import { getSum } from 'utils/getSum'
import { IProjectTimeEntriesSummaryProps } from './types'
import { formatCurrency } from 'utils'
import { useSubscriptionSettings } from 'AppContext'

/**
 * Component logic hook for `<ProjectTimeEntriesSummary />`
 *
 * @category Projects
 */
export function useProjectTimeEntriesSummary(props: IProjectTimeEntriesSummaryProps) {
  const { t } = useTranslation()
  const enableInvoiceEstimation = useSubscriptionSettings<boolean>('projects.enableInvoiceEstimation', false)
  
  const [year,month] = [new Date().getFullYear(), new Date().getMonth()]
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
  
  // Calculate both hours and income for each time period
  const results = Object.keys(config).map((label) => {
    const filterFunction = config[label]
    const filteredEntries = _.filter(props.timeEntries, filterFunction)
    
    // Calculate total hours
    const hours = getSum(filteredEntries, 'duration')
    
    // Calculate income by multiplying each entry's duration by its hourlyRate from role
    const income = enableInvoiceEstimation && filteredEntries.reduce((total, entry) => {
      const hourlyRate = entry.role?.hourlyRate || 0
      const entryIncome = (entry.duration || 0) * hourlyRate
      return total + entryIncome
    }, 0)

    let value = $date.getDurationString(hours, t)

    if(Boolean(income)) {
      value += ` (${formatCurrency(income)})`
    }
    
    return {
      label,
      value,
      hours
    }
  })

  return results
}
