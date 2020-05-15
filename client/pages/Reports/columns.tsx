import { TFunction } from 'i18next';
import { IColumn } from 'office-ui-fabric-react/lib/DetailsList';
import React from 'react';
import { Link } from 'react-router-dom';
import dateUtils from 'utils/date';
import { ExcelColumnType } from 'utils/exportExcel';


const columns = (t: TFunction): IColumn[] => ([
    {
        key: 'title',
        fieldName: 'title',
        name: t('titleLabel'),
        minWidth: 100,
    },
    {
        key: 'project',
        fieldName: 'project',
        name: t('project'),
        minWidth: 100,
        onRender: ({ project }) => <Link to={`/projects/${project.id}`}>{project.name}</Link>
    },
    {
        key: 'customer',
        fieldName: 'customer',
        name: t('customer'),
        minWidth: 100,
        onRender: ({ customer }) => <Link to={`/customers/${customer.id}`}>{customer.name}</Link>,
    },
    {
        key: 'durationHours',
        fieldName: 'durationHours',
        name: t('durationLabel'),
        minWidth: 100,
    },
    {
        key: 'startTime',
        fieldName: 'startTime',
        name: t('startTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
        onRender: ({ startTime }) => dateUtils.formatDate(startTime, 'MMM DD, YYYY kk:mm')
    },
    {
        key: 'endTime',
        fieldName: 'endTime',
        name: t('endTimeLabel'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
        onRender: ({ endTime }) => dateUtils.formatDate(endTime, 'MMM DD, YYYY kk:mm')
    },
    {
        key: 'weekNumber',
        fieldName: 'weekNumber',
        name: t('weekLabel'),
        minWidth: 100,
    },
    {
        key: 'yearNumber',
        fieldName: 'yearNumber',
        name: t('yearLabel'),
        minWidth: 100,
    },
    {
        key: 'resourceName',
        fieldName: 'resourceName',
        name: t('employeeLabel'),
        minWidth: 100,
    },
]);

export default columns;
