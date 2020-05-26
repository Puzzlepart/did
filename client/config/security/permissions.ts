import { TFunction } from 'i18next'
import { IPermission } from 'interfaces/IPermission'

export const accessCustomers = 'e18a7c45'
export const accessProjects = '289a64ab'
export const accessAdmin = '2653c3aa'
export const accessReports = 'a031c42f'
export const manageProjects = 'ef4032fb'
export const deleteProjects = 'c5439319'
export const manageCustomers = '09909241'
export const deleteCustomers = '8b39db3d'

export default (t: TFunction): IPermission[] => [       
    {
        id: 'e18a7c45',
        key: 'accessCustomers',
        name: t('accessCustomers', { ns: 'permissions' })
    }, 
    {
        id: '289a64ab',
        key: 'accessProjects',
        name: t('accessProjects', { ns: 'permissions' })
    },
    {
        id: accessAdmin,
        key: 'accessAdmin',
        name: t('accessAdmin', { ns: 'permissions' })
    },
    {
        id: 'a031c42f',
        key: 'accessReports',
        name: t('accessReports', { ns: 'permissions' })
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