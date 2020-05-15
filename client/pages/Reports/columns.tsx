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
        name: t('TITLE_LABEL'),
        minWidth: 100,
    },
    {
        key: 'project',
        fieldName: 'project',
        name: t('PROJECT'),
        minWidth: 100,
        onRender: ({ project }) => <Link to={`/projects/${project.id}`}>{project.name}</Link>
    },
    {
        key: 'customer',
        fieldName: 'customer',
        name: t('CUSTOMER'),
        minWidth: 100,
        onRender: ({ customer }) => <Link to={`/customers/${customer.id}`}>{customer.name}</Link>,
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
        onRender: ({ startTime }) => dateUtils.formatDate(startTime, 'MMM DD, YYYY kk:mm')
    },
    {
        key: 'endTime',
        fieldName: 'endTime',
        name: t('END_TIME_LABEL'),
        minWidth: 100,
        data: { excelColFormat: 'date' as ExcelColumnType },
        onRender: ({ endTime }) => dateUtils.formatDate(endTime, 'MMM DD, YYYY kk:mm')
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
