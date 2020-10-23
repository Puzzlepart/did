import { TFunction } from 'i18next'
import { IChoiceGroupOption } from 'office-ui-fabric-react'
import { ITimeEntriesQueryVariables } from 'types/graphql'
import dateUtils from 'utils/date'

export interface IExportType extends IChoiceGroupOption {
  variables: ITimeEntriesQueryVariables
  exportFileName: string
}

/**
 * Get export types
 *
 * @param {TFunction} t Translate function
 */
export const getExportTypes = (t: TFunction): IExportType[] => [
  {
    key: 'LAST_MONTH',
    text: t('common.exportTypeLastMonth', { month: dateUtils.getMonthName(-1) }),
    variables: dateUtils.getMonthYear(dateUtils.subtractMonths()),
    exportFileName: `TimeEntries-${dateUtils.getMonthName(-1, undefined, true)}-{0}.xlsx`,
  },
  {
    key: 'CURRENT_MONTH',
    text: t('common.exportTypeCurrentMonth', { month: dateUtils.getMonthName(0) }),
    variables: dateUtils.getMonthYear(),
    exportFileName: `TimeEntries-${dateUtils.getMonthName(0, undefined, true)}-{0}.xlsx`,
  },
  {
    key: 'CURRENT_YEAR',
    text: t('common.exportTypeCurrentYear', { year: dateUtils.getYear() }),
    variables: { year: dateUtils.getYear() },
    exportFileName: `TimeEntries-${dateUtils.getYear()}-{0}.xlsx`,
  },
]
