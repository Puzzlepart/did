import { TFunction } from 'i18next'
import { ISummaryViewType } from './types'

export const getTypes = (t: TFunction): ISummaryViewType[] => ([
    {
        key: 'resource',
        fieldName: 'resourceName',
        name: t('employeeLabel'),
        iconProps: { iconName: 'FabricUserFolder' },
    },
    {
        key: 'project',
        fieldName: 'project.name',
        name: t('project'),
        iconProps: { iconName: 'Teamwork' },
    },
    {
        key: 'customer',
        fieldName: 'customer.name',
        name: t('customer'),
        iconProps: { iconName: 'CustomList' },
    }
])