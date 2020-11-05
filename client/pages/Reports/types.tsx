import { IListGroups } from 'components/List/types'
import { TFunction } from 'i18next'
import { IContextualMenuItem } from 'office-ui-fabric-react'
import { TimeEntriesQuery } from 'types'
import { omit } from 'underscore'
import { capitalize } from 'underscore.string'
import DateUtils from 'utils/date'

export interface IReportsQuery extends IContextualMenuItem {
    /**
     * Variables used for graphl query
     */
    variables: {
        query: TimeEntriesQuery,
        forecast?: boolean,
        sortAsc?: boolean
    }

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
    readonly isFiltersOpen?: boolean;

    /**
     * Query
     */
    readonly query?: IReportsQuery;

    /**
     * Group by properties
     */
    readonly groupBy?: IListGroups;

    /**
     * Filtered subset
     */
    readonly subset?: any[];
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
export function getQueries<T = IReportsQuery>(t: TFunction): T[] {
    const now = DateUtils.createDateObject()
    const lastMonth = now.add('-1m').toObject()
    const currentMonth = now.toObject()
    const currentYear = now.toObject('year')
    return [
        {
            key: 'LAST_MONTH',
            text: t('common.exportTypeLastMonth', lastMonth),
            iconName: 'CalendarDay',
            variables: { query: omit(lastMonth, 'monthName') },
            exportFileName: `TimeEntries-${capitalize(lastMonth.monthName)}-{0}.xlsx`,
        } as unknown as T,
        {

            key: 'CURRENT_MONTH',
            text: t('common.exportTypeCurrentMonth', currentMonth),
            iconName: 'Calendar',
            variables: { query: omit(currentMonth, 'monthName') },
            exportFileName: `TimeEntries-${capitalize(currentMonth.monthName)}-{0}.xlsx`,
        } as unknown as T,
        {
            key: 'CURRENT_YEAR',
            text: t('common.exportTypeCurrentYear', currentYear),
            iconName: 'CalendarReply',
            variables: { query: currentYear },
            exportFileName: `TimeEntries-${currentYear.year}-{0}.xlsx`,
        } as unknown as T,
        {
            key: 'FORECAST',
            text: t('reports.forecast'),
            iconName: 'TimeSheet',
            variables: {
                sortAsc: true,
                forecast: true,
                query: {
                    startDateTime: new Date().toISOString(),
                }
            },
            exportFileName: 'Forecast-{0}.xlsx',
        } as unknown as T,
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