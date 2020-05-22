import { TFunction } from 'i18next'
import { IPermission } from 'interfaces/IPermission'

export default (t: TFunction): IPermission[] => [
    {
        id: '2653c3aa',
        key: 'accessAdmin',
        name: t('accessAdmin', { ns: 'permissions' })
    },    
    {
        id: 'a031c42f',
        key: 'accessReports',
        name: t('accessReports', { ns: 'permissions' })
    },
    {
        id: '7bbc0cef',
        key: 'manageLabels',
        name: t('manageLabels', { ns: 'permissions' })
    },
    {
        id: 'a00f1c73-18a7-493f-89f7-a9c6267dedae',
        key: 'deleteLabels',
        name: t('deleteLabels', { ns: 'permissions' })
    },
    {
        id: 'ef4032fb',
        key: 'manageProjects',
        name: t('manageProjects', { ns: 'permissions' })
    },
    {
        id: 'c5439319',
        key: 'deleteProjects',
        name: t('deleteProjects', { ns: 'permissions' })
    },
    {
        id: '09909241',
        key: 'manageCustomers',
        name: t('manageCustomers', { ns: 'permissions' })
    },
    {
        id: '8b39db3d',
        key: 'deleteCustomers',
        name: t('deleteCustomers', { ns: 'permissions' })
    }
]