import { IListGroups } from 'components/List/types'
import { ITimeEntriesVariables } from './TIME_ENTRIES'
import dateUtils from 'utils/date'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react'

export interface IReportsQuery  extends IContextualMenuItem {
    variables: ITimeEntriesVariables;
}

export interface IGroupByOption extends IContextualMenuItem {
    props: IListGroups;
}

/**
 * Get queries
 * 
 * @param {TFunction} t Translate function
 */
export const getQueries = (t: TFunction): IReportsQuery[] => ([
    {
        key: 'PREVIOUS_MONTH',
        text: t('common.previousMonth'),
        iconName: 'CalendarDay',
        variables: { monthNumber: dateUtils.getMonthIndex() - 1, year: dateUtils.getYear() }
    },
    {

        key: 'CURRENT_MONTH',
        text: t('common.currentMonth'),
        iconName: 'Calendar',
        variables: { monthNumber: dateUtils.getMonthIndex(), year: dateUtils.getYear() }
    },
    {
        key: 'CURRENT_YEAR',
        text: t('common.currentYear'),
        iconName: 'CalendarReply',
        variables: { year: dateUtils.getYear() }
    }
])


/**
 * Get group by options
 * 
 * @param {TFunction} t Translate function
 */
export const getGroupByOptions = (t: TFunction): IGroupByOption[] => ([
    {
        key: 'none',
        text: t('common.none'),
        props: {
            fieldName: '.',
            emptyGroupName: t('common.all'),
        }
    },
    {
        key: 'resourceName',
        text: t('common.employeeLabel'),
        props: {
            fieldName: 'resourceName',
            emptyGroupName: '',
        }
    },
    {
        key: 'customer',
        text: t('common.customer'),
        props: {
            fieldName: 'customer.name',
            emptyGroupName: '',
        }
    },
    {
        key: 'project',
        text: t('common.project'),
        props: {
            fieldName: 'project.name',
            emptyGroupName: '',
        }
    },
    {
        key: 'weekNumber',
        text: t('common.weekNumberLabel'),
        props: {
            fieldName: 'weekNumber',
            emptyGroupName: ' '
        }
    }
])