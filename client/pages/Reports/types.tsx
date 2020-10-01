import { IListGroups } from 'components/List/types'
import { ITimeEntriesVariables } from './TIME_ENTRIES'
import dateUtils from 'utils/date'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react'

export interface IReportsQuery extends IContextualMenuItem {
    variables: ITimeEntriesVariables;
}

export interface IGroupByOption extends IContextualMenuItem {
    props: IListGroups;
}

export interface IReportsState {
    /**
     * Filter panel open
     */
    isFiltersOpen?: boolean;

    /**
     * Query
     */
    query?: IReportsQuery;

    /**
     * Group by
     */
    groupBy?: IListGroups;

    /**
     * Subset
     */
    subset?: any[];
}

/**
 * Get queries
 * 
 * @param {TFunction} t Translate function
 */
export const getQueries = (t: TFunction): IReportsQuery[] => ([
    {
        key: 'lastMonth',
        text: dateUtils.getMonthName(-1),
        iconName: 'CalendarDay',
        variables: { monthNumber: dateUtils.getMonthIndex() - 1, year: dateUtils.getYear() }
    },
    {

        key: 'currentMonth',
        text: dateUtils.getMonthName(0),
        iconName: 'Calendar',
        variables: { monthNumber: dateUtils.getMonthIndex(), year: dateUtils.getYear() }
    },
    {
        key: 'currentYear',
        text: t('common.currentYear'),
        iconName: 'CalendarReply',
        variables: { year: dateUtils.getYear() }
    },
    {
        key: 'forecast',
        text: t('reports.forecast'),
        iconName: 'TimeSheet',
        variables: { forecast: true }
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

export interface IReportsParams {
    query: string;
}