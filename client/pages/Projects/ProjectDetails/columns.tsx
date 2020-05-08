import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ExcelColumnType } from 'utils/exportExcel';


const columns = (resource: any): IColumn[] => ([
    {
        key: 'title',
        fieldName: 'title',
        name: resource('COMMON.TITLE_LABEL'),
        minWidth: 100,
    },
    {
        key: 'durationHours',
        fieldName: 'durationHours',
        name: resource('COMMON.DURATION_LABEL'),
        minWidth: 100,
    },
    {
        key: 'startTime',
        fieldName: 'startTime',
        name: resource('COMMON.START_TIME_LABEL'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'endTime',
        fieldName: 'endTime',
        name: resource('COMMON.END_TIME_LABEL'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'weekNumber',
        fieldName: 'weekNumber',
        name: resource('COMMON.WEEK_LABEL'),
        minWidth: 100,
    },
    {
        key: 'yearNumber',
        fieldName: 'yearNumber',
        name: resource('COMMON.YEAR_LABEL'),
        minWidth: 100,
    },
    {
        key: 'resourceName',
        fieldName: 'resourceName',
        name: resource('COMMON.EMPLOYEE_LABEL'),
        minWidth: 100,
    },
]);

export default columns;
