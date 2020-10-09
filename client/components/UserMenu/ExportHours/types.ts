import { TFunction } from 'i18next'
import { IChoiceGroupOption } from 'office-ui-fabric-react'
import { ITimeEntriesQueryVariables } from 'types/graphql'
import dateUtils from 'utils/date'

export interface IExportType extends IChoiceGroupOption {
    variables: ITimeEntriesQueryVariables;
    exportFileName: string;
}

/**
 * Get export types
 * 
 * @param {TFunction} t Translate function
 */
export const getExportTypes = (t: TFunction): IExportType[] => ([
    {
        key: 'lastMonth',
        text: t('common.exportTypeLastMonth', { month: dateUtils.getMonthName(-1) }),
        variables: { monthNumber: dateUtils.getMonthIndex() - 1, year: dateUtils.getYear() },
        exportFileName: `TimeEntries-${dateUtils.getMonthName(-1)}-{0}.xlsx`,
    },
    {

        key: 'currentMonth',
        text: t('common.exportTypeCurrentMonth', { month: dateUtils.getMonthName(0) }),
        variables: { monthNumber: dateUtils.getMonthIndex(), year: dateUtils.getYear() },
        exportFileName: `TimeEntries-${dateUtils.getMonthName(0)}-{0}.xlsx`,
    },
    {
        key: 'currentYear',
        text: t('common.exportTypeCurrentYear', { year: dateUtils.getYear() }),
        variables: { year: dateUtils.getYear() },
        exportFileName: `TimeEntries-${dateUtils.getYear()}-{0}.xlsx`,
    },
])
