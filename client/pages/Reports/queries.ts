import { TFunction } from 'i18next'
import dateUtils from 'utils/date'
import { IReportsQuery } from './types'

/**
 * Get queries
 * 
 * @param {TFunction} t Translate function
 */
export const getQueries = (t: TFunction): IReportsQuery[] => ([
    {
        key: 'PREVIOUS_MONTH',
        name: t('previousMonth'),
        iconName: 'CalendarDay',
        variables: { monthNumber: dateUtils.getMonthIndex() - 1, year: dateUtils.getYear() }
    },
    {

        key: 'CURRENT_MONTH',
        name: t('currentMonth'),
        iconName: 'Calendar',
        variables: { monthNumber: dateUtils.getMonthIndex(), year: dateUtils.getYear() }
    },
    {
        key: 'CURRENT_YEAR',
        name: t('currentYear'),
        iconName: 'CalendarReply',
        variables: { year: dateUtils.getYear() }
    }
])