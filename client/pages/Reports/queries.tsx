import { TFunction } from 'i18next'
import { omit } from 'underscore'
import { capitalize } from 'underscore.string'
import { DateObject } from 'utils/date'
import { IReportsQuery } from './types'

/**
 * Get queries
 *
 * @param {TFunction} t Translate function
 */
export function getQueries<T = IReportsQuery>(t: TFunction): T[] {
  const now = new DateObject()
  const lastMonth = now.add('-1month').toObject()
  const currentMonth = now.toObject()
  const currentYear = now.toObject('year')
  return [
    ({
      key: 'lastMonth',
      text: t('common.exportTypeLastMonth', lastMonth),
      iconName: 'CalendarDay',
      variables: { query: omit(lastMonth, 'monthName', 'weekNumber') },
      exportFileName: `TimeEntries-${capitalize(lastMonth.monthName)}-{0}.xlsx`
    } as unknown) as T,
    ({
      key: 'currentMonth',
      text: t('common.exportTypeCurrentMonth', currentMonth),
      iconName: 'Calendar',
      variables: { query: omit(currentMonth, 'monthName', 'weekNumber') },
      exportFileName: `TimeEntries-${capitalize(currentMonth.monthName)}-{0}.xlsx`
    } as unknown) as T,
    ({
      key: 'currentYear',
      text: t('common.exportTypeCurrentYear', currentYear),
      iconName: 'CalendarReply',
      variables: { query: currentYear },
      exportFileName: `TimeEntries-${currentYear.year}-{0}.xlsx`
    } as unknown) as T,
    ({
      key: 'forecast',
      text: t('reports.forecast'),
      iconName: 'TimeSheet',
      variables: {
        sortAsc: true,
        forecast: true,
        query: {
          startDateTime: new Date().toISOString()
        }
      },
      exportFileName: 'Forecast-{0}.xlsx'
    } as unknown) as T
  ]
}
