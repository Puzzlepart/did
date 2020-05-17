import { TFunction } from 'i18next'
import { capitalize } from 'underscore.string'
import { moment } from 'utils/date'
import { ISummaryViewScope } from './types'

export const getScopes = (t: TFunction): ISummaryViewScope[] => ([
    {
        key: 'month',
        fieldName: 'monthNumber',
        iconProps: { iconName: 'Calendar' },
        name: t('monthLabel'),
        getColumnHeader: (idx: number) => capitalize(moment().month(idx - 1).format('MMMM')),
    } as ISummaryViewScope,
    {
        key: 'week',
        fieldName: 'weekNumber',
        iconProps: { iconName: 'CalendarWeek' },
        name: t('weekLabel'),
        getColumnHeader: (idx: number) => `${t('weekLabel')} ${idx}`,
    } as ISummaryViewScope,
])