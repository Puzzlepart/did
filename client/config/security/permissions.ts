import { TFunction } from 'i18next'
import { IPermission } from 'interfaces/IPermission'

export default (t: TFunction): IPermission[] => [
    {
        id: '2653c3aa-e145-4a5d-a360-1e1f89e37597',
        key: 'ACCESS_ADMIN',
        name: t('accessAdmin', { ns: 'permissions' })
    },    
    {
        id: 'a031c42f-adcd-4314-bede-60ab7de2195c',
        key: 'ACCESS_REPORTS',
        name: t('accessReports', { ns: 'permissions' })
    },
    {
        id: '7bbc0cef-4b39-45ab-8647-ffffe0a57d5b',
        key: 'MANAGE_LABELS',
        name: t('manageLabels', { ns: 'permissions' })
    },
    {
        id: 'a00f1c73-18a7-493f-89f7-a9c6267dedae',
        key: 'DELETE_LABELS',
        name: t('deleteLabels', { ns: 'permissions' })
    },
    {
        id: 'ef4032fb-ec9f-4777-88e4-811c90ae83d7',
        key: 'MANAGE_PROJECTS',
        name: t('manageProjects', { ns: 'permissions' })
    },
    {
        id: 'c5439319-2c46-48a3-92cd-0fe6c1141d75',
        key: 'DELETE_PROJECTS',
        name: t('deleteProjects', { ns: 'permissions' })
    },
    {
        id: '09909241-52d4-47b6-ae48-3fe2be33e897',
        key: 'MANAGE_CUSTOMERS',
        name: t('manageCustomers', { ns: 'permissions' })
    },
    {
        id: '8b39db3d-75f9-484b-9647-06307c983a53',
        key: 'DELETE_CUSTOMERS',
        name: t('deleteCustomers', { ns: 'permissions' })
    }
]