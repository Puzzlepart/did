import { capitalize } from 'underscore.string';
import { moment } from 'utils/date';
import { ISummaryViewScope } from './types';


export const getScopes = (resource: (key: string) => string): ISummaryViewScope[] => ([
    {
        key: 'month',
        fieldName: 'monthNumber',
        iconProps: { iconName: 'Calendar' },
        name: resource('COMMON.MONTH_LABEL'),
        getColumnHeader: (idx: number) => capitalize(moment().month(idx - 1).format('MMMM')),
    } as ISummaryViewScope,
    {
        key: 'week',
        fieldName: 'weekNumber',
        iconProps: { iconName: 'CalendarWeek' },
        name: resource('COMMON.WEEK_LABEL'),
        getColumnHeader: (idx: number) => `${resource('COMMON.WEEK_LABEL')} ${idx}`,
    } as ISummaryViewScope,
]);