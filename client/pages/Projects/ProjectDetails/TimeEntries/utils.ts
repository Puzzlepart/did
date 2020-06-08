import { filter } from 'underscore'
import { getSum } from 'utils/getSum'
import { TFunction } from 'i18next'

/**
 * Get summary
 * 
 * @param {any[]} timeentries Time entries
 * @param {TFunction} t Translate function
 */
export function getSummary(timeentries: any[], t: TFunction) {
    return [
        {
            label: t('hoursCurrentMonth', { ns: 'common' }),
            value: getSum(
                filter(
                    timeentries,
                    entry => entry.monthNumber === new Date().getMonth() + 1
                ),
                'duration'
            ),
        },
        {
            label: t('hoursPrevMonth', { ns: 'common' }),
            value: getSum(
                filter(
                    timeentries,
                    entry => entry.monthNumber === new Date().getMonth()
                ),
                'duration'
            ),
        },
        {
            label: t('hoursCurrentYear', { ns: 'common' }),
            value: getSum(
                filter(
                    timeentries,
                    entry => entry.year === new Date().getFullYear()
                ),
                'duration'
            )
        }
    ]
}