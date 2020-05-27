import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import React from 'react'
import { Link } from 'react-router-dom'
import dateUtils from 'utils/date'
import { ExcelColumnType } from 'utils/exportExcel'
import { getTheme } from 'office-ui-fabric-react/lib/Styling'

const theme = getTheme()
const columns = (t: TFunction): IColumn[] => ([
    {
        key: 'title',
        fieldName: 'title',
        name: t('titleLabel'),
        minWidth: 100,
    },
    {
        key: 'project',
        fieldName: 'project.name',
        name: t('project'),
        minWidth: 100,
        onRender: ({ project }) => <Link to={`/projects/${project.id}`} style={{color: theme.palette.themePrimary}}>{project.name}</Link>
    },
    {
        key: 'customer',
        fieldName: 'customer.name',
        name: t('customer'),
        minWidth: 100,
        onRender: ({ customer }) => <Link to={`/customers/${customer.key}`} style={{color: theme.palette.themePrimary}}>{customer.name}</Link>,
    },
    {
        key: 'duration',
        fieldName: 'duration',
        name: t('durationLabel'),
        minWidth: 100,
    },
    {
        key: 'startDateTime',
        fieldName: 'startDateTime',
        name: t('startTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
        onRender: ({ startDateTime }) => dateUtils.formatDate(startDateTime, 'MMM DD, YYYY kk:mm')
    },
    {
        key: 'endDateTime',
        fieldName: 'endDateTime',
        name: t('endTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
        onRender: ({ endDateTime }) => dateUtils.formatDate(endDateTime, 'MMM DD, YYYY kk:mm')
    },
    {
        key: 'weekNumber',
        fieldName: 'weekNumber',
        name: t('weekLabel'),
        minWidth: 100,
    },
    {
        key: 'monthNumber',
        fieldName: 'monthNumber',
        name: t('monthLabel'),
        minWidth: 100,
        onRender: ({ monthNumber }) => dateUtils.getMonthNames()[monthNumber - 1]
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
