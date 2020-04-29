import { BaseFilter, WeekFilter, MonthFilter, YearFilter, ResourceFilter } from 'common/components/FilterPanel/Filters';

/**
 * @ignore
 */
export const REPORTS_FILTERS: BaseFilter[] = [
    new WeekFilter('weekNumber', 'Week'),
    new MonthFilter('month', 'Month'),
    new YearFilter('yearNumber', 'Year'),
    new ResourceFilter('resourceName', 'Employee'),
]