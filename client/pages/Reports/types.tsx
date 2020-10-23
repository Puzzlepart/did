import { IListGroups } from 'components/List/types'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react'
import { ITimeEntriesQueryVariables } from 'types/graphql'
import { capitalize } from 'underscore.string'
import dateUtils from 'utils/date'

export interface IReportsQuery extends IContextualMenuItem {
    /**
     * Variables used for graphl query
     */
    variables: ITimeEntriesQueryVariables;

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
 * Collection of graphql queries
 * 
 * Consists of:
 * 
 * * key
 * * text
 * * iconName
 * * variables
 * * exportFilename
 * 
 * @param {TFunction} t Translate function
 */
export const getQueries = (t: TFunction): IReportsQuery[] => {
    const lastMonth = dateUtils.getMonthYear(dateUtils.subtractMonths())
    const currentMonth = dateUtils.getMonthYear()
    const currentYear = { year: dateUtils.getYear() }
    return [
        {
            key: 'LAST_MONTH',
            text: t('common.exportTypeLastMonth', lastMonth),
            iconName: 'CalendarDay',
            variables: lastMonth,
            exportFileName: `TimeEntries-${capitalize(lastMonth.monthName)}-{0}.xlsx`,
        },
        {

            key: 'CURRENT_MONTH',
            text: t('common.exportTypeCurrentMonth', currentMonth),
            iconName: 'Calendar',
            variables: currentMonth,
            exportFileName: `TimeEntries-${capitalize(currentMonth.monthName)}-{0}.xlsx`,
        },
        {
            key: 'CURRENT_YEAR',
            text: t('common.exportTypeCurrentYear', currentYear),
            iconName: 'CalendarReply',
            variables: currentYear,
            exportFileName: `TimeEntries-${currentYear.year}-{0}.xlsx`,
        },
        {
            key: 'FORECAST',
            text: t('reports.forecast'),
            iconName: 'TimeSheet',
            variables: {
                sortAsc: true,
                forecast: true,
                startDateTime: new Date().toISOString(),
            },
            exportFileName: 'Forecast-{0}.xlsx',
        }
    ]
}


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
        key: 'resource.displayName',
        text: t('common.employeeLabel'),
        props: {
            fieldName: 'resource.displayName',
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