import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import { ExcelColumnType } from 'utils/exportExcel'


const columns = (t: TFunction): IColumn[] => ([
    {
        key: 'title',
        fieldName: 'title',
        name: t('common.titleLabel'),
        minWidth: 100,
    },
    {
        key: 'duration',
        fieldName: 'duration',
        name: t('common.durationLabel'),
        minWidth: 100,
    },
    {
        key: 'startDateTime',
        fieldName: 'startDateTime',
        name: t('common.startTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'endDateTime',
        fieldName: 'endDateTime',
        name: t('common.endTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
    },
    {
        key: 'weekNumber',
        fieldName: 'weekNumber',
        name: t('common.weekLabel'),
        minWidth: 100,
    },
    {
        key: 'year',
        fieldName: 'year',
        name: t('common.yearLabel'),
        minWidth: 100,
    },
    {
        key: 'resourceName',
        fieldName: 'resourceName',
        name: t('common.employeeLabel'),
        minWidth: 100,
    },
])

export default columns
