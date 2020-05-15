import { TFunction } from 'i18next';
import { ISummaryViewType } from './types';

export const getTypes = (t: TFunction): ISummaryViewType[] => ([
    {
        key: 'resource',
        fieldName: 'resourceName',
        name: t('EMPLOYEE_LABEL'),
        iconProps: { iconName: 'FabricUserFolder' },
    },
    {
        key: 'project',
        fieldName: 'project.name',
        name: t('PROJECT'),
        iconProps: { iconName: 'Teamwork' },
    },
    {
        key: 'customer',
        fieldName: 'customer.name',
        name: t('CUSTOMER'),
        iconProps: { iconName: 'CustomList' },
    }
]);