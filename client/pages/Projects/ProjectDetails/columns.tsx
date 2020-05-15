import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { ExcelColumnType } from 'utils/exportExcel'


const columns = (t: TFunction): IColumn[] => ([
    {
        key: 'title',
        fieldName: 'title',
        name: t('titleLabel'),
        minWidth: 100,
    },
    {
        key: 'duration',
        fieldName: 'duration',
        name: t('durationLabel'),
        minWidth: 100,
    },
    {
        key: 'startTime',
        fieldName: 'startTime',
        name: t('startTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'endTime',
        fieldName: 'endTime',
        name: t('endTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'weekNumber',
        fieldName: 'weekNumber',
        name: t('weekLabel'),
        minWidth: 100,
    },
    {
        key: 'year',
        fieldName: 'year',
        name: t('yearLabel'),
        minWidth: 100,
    },
    {
        key: 'resourceName',
        fieldName: 'resourceName',
        name: t('employeeLabel'),
        minWidth: 100,
    },
])

export default columns
