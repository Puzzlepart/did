import { CustomerLink } from 'components/CustomerLink'
import { ProjectLink } from 'components/ProjectLink'
import { TFunction } from 'i18next'
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList'
import React from 'react'
import dateUtils from 'utils/date'
import { ExcelColumnType } from 'utils/exportExcel'


const columns = (t: TFunction): IColumn[] => ([
    {
        key: 'title',
        fieldName: 'title',
        name: t('common.titleLabel'),
        minWidth: 100,
    },
    {
        key: 'project',
        fieldName: 'project.name',
        name: t('common.project'),
        minWidth: 100,
        onRender: ({ project }) => <ProjectLink project={project} />
    },
    {
        key: 'customer',
        fieldName: 'customer.name',
        name: t('common.customer'),
        minWidth: 100,
        onRender: ({ customer }) => <CustomerLink customer={customer} />,
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
        onRender: ({ startDateTime }) => dateUtils.formatDate(startDateTime, 'MMM DD, YYYY kk:mm')
    },
    {
        key: 'endDateTime',
        fieldName: 'endDateTime',
        name: t('common.endTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
        onRender: ({ endDateTime }) => dateUtils.formatDate(endDateTime, 'MMM DD, YYYY kk:mm')
    },
    {
        key: 'weekNumber',
        fieldName: 'weekNumber',
        name: t('common.weekLabel'),
        minWidth: 100,
    },
    {
        key: 'monthNumber',
        fieldName: 'monthNumber',
        name: t('common.monthLabel'),
        minWidth: 100,
        onRender: ({ monthNumber }) => dateUtils.getMonthNames()[monthNumber - 1]
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
