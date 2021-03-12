/* eslint-disable tsdoc/syntax */
import DateUtils from 'DateUtils'
import { IPivotItemProps } from 'office-ui-fabric-react'
import { useTranslation } from 'react-i18next'

/**
 * @ignore
 */
export function useScopes() {
    const { t } = useTranslation()
    return [
        {
            itemKey: 'week',
            fieldName: 'weekNumber',
            headerText: t('common.weekLabel'),
            itemIcon: 'CalendarWorkWeek',
            getColumnHeader: (index: number) => `${t('common.weekLabel')} ${index}`
        },
        {
            itemKey: 'month',
            fieldName: 'monthNumber',
            headerText: t('common.monthLabel'),
            itemIcon: 'Calendar',
            getColumnHeader: (index: number) => DateUtils.getMonthName(index),
            headerButtonProps: { disabled: true }
        } as IPivotItemProps
    ] as IPivotItemProps[]
}