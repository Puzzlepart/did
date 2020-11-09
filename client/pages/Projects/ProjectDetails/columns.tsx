import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric'
import { ExcelColumnType } from 'utils/exportExcel'

const columns = (t: TFunction): IColumn[] => [
  {
    key: 'title',
    fieldName: 'title',
    name: t('common.titleLabel'),
    minWidth: 100
  },
  {
    key: 'duration',
    fieldName: 'duration',
    name: t('common.durationLabel'),
    minWidth: 100
  },
  {
    key: 'startDateTime',
    fieldName: 'startDateTime',
    name: t('common.startTimeLabel'),
    minWidth: 100,
    data: { excelColFormat: 'date' as ExcelColumnType }
  },
  {
    key: 'endDateTime',
    fieldName: 'endDateTime',
    name: t('common.endTimeLabel'),
    minWidth: 100,
    data: { excelColFormat: 'date' as ExcelColumnType }
  },
  {
    key: 'weekNumber',
    fieldName: 'weekNumber',
    name: t('common.weekLabel'),
    minWidth: 100
  },
  {
    key: 'year',
    fieldName: 'year',
    name: t('common.yearLabel'),
    minWidth: 100
  },
  {
    key: 'resource.surname',
    fieldName: 'resource.surname',
    name: t('common.surnameLabel'),
    minWidth: 100
  },
  {
    key: 'resource.givenName',
    fieldName: 'resource.givenName',
    name: t('common.givenNameLabel'),
    minWidth: 100
  },
  {
    key: 'resource.mail',
    fieldName: 'resource.mail',
    name: t('common.mailLabel'),
    minWidth: 100
  }
]

export default columns
