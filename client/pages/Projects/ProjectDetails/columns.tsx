import { TFunction } from 'i18next';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import { ExcelColumnType } from 'utils/exportExcel';


const columns = (t: TFunction): IColumn[] => ([
    {
        key: 'title',
        fieldName: 'title',
        name: t('TITLE_LABEL'),
        minWidth: 100,
    },
    {
        key: 'durationHours',
        fieldName: 'durationHours',
        name: t('DURATION_LABEL'),
        minWidth: 100,
    },
    {
        key: 'startTime',
        fieldName: 'startTime',
        name: t('START_TIME_LABEL'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'endTime',
        fieldName: 'endTime',
        name: t('END_TIME_LABEL'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'weekNumber',
        fieldName: 'weekNumber',
        name: t('WEEK_LABEL'),
        minWidth: 100,
    },
    {
        key: 'yearNumber',
        fieldName: 'yearNumber',
        name: t('YEAR_LABEL'),
        minWidth: 100,
    },
    {
        key: 'resourceName',
        fieldName: 'resourceName',
        name: t('EMPLOYEE_LABEL'),
        minWidth: 100,
    },
]);

export default columns;
