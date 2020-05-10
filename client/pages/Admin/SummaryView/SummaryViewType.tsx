import { ISummaryViewType } from './types';

export const getTypes = (resource: (key: string) => string): ISummaryViewType[] => ([
    {
        key: 'resource',
        fieldName: 'resourceName',
        name: resource('COMMON.EMPLOYEE_LABEL'),
        iconProps: { iconName: 'FabricUserFolder' },
    },
    {
        key: 'project',
        fieldName: 'project.name',
        name: resource('COMMON.PROJECT'),
        iconProps: { iconName: 'Teamwork' },
    },
    {
        key: 'customer',
        fieldName: 'customer.name',
        name: resource('COMMON.CUSTOMER'),
        iconProps: { iconName: 'CustomList' },
    }
]);