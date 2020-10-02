import { IListGroups } from 'components/List/types'
import { ITimeEntriesVariables } from './graphql'
import dateUtils from 'utils/date'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react'

export interface IReportsQuery extends IContextualMenuItem {
    /**
     * Variables used for graphl query
     */
    variables: ITimeEntriesVariables;

    /**
     * Export file name
     */
    exportFileName: string;
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
     * Group by properties
     */
    groupBy?: IListGroups;

    /**
     * Filtered subset
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
        variables: { monthNumber: dateUtils.getMonthIndex() - 1, year: dateUtils.getYear() },
        exportFileName: `TimeEntries-${dateUtils.getMonthName(-1)}-{0}.xlsx`,
    },
    {

        key: 'currentMonth',
        text: dateUtils.getMonthName(0),
        iconName: 'Calendar',
        variables: { monthNumber: dateUtils.getMonthIndex(), year: dateUtils.getYear() },
        exportFileName: `TimeEntries-${dateUtils.getMonthName(0)}-{0}.xlsx`,
    },
    {
        key: 'currentYear',
        text: t('common.currentYear'),
        iconName: 'CalendarReply',
        variables: { year: dateUtils.getYear() },
        exportFileName: `TimeEntries-${dateUtils.getYear()}-{0}.xlsx`,
    },
    {
        key: 'forecast',
        text: t('reports.forecast'),
        iconName: 'TimeSheet',
        variables: { forecast: true, startDateTime: new Date().toISOString() },
        exportFileName: 'Forecast-{0}.xlsx',
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