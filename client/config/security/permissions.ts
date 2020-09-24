import { TFunction } from 'i18next'
import { IPermission } from 'interfaces/IPermission'

export const accessTimesheet = 'f5a82c37'
export const accessCustomers = 'e18a7c45'
export const accessProjects = '289a64ab'
export const accessAdmin = '2653c3aa'
export const accessReports = 'a031c42f'
export const manageProjects = 'ef4032fb'
export const deleteProjects = 'c5439319'
export const manageCustomers = '09909241'
export const deleteCustomers = '8b39db3d'
export const manageUsers = '15e40e99'
export const manageRolesPermissions = 'cd52a735'

export default (t: TFunction): IPermission[] => [
  {
    id: accessTimesheet,
    key: 'accessTimesheet',
    name: t('accessTimesheet', { ns: 'permissions' }),
  },
  {
    id: accessCustomers,
    key: 'accessCustomers',
    name: t('accessCustomers', { ns: 'permissions' }),
  },
  {
    id: accessProjects,
    key: 'accessProjects',
    name: t('accessProjects', { ns: 'permissions' }),
  },
  {
    id: accessAdmin,
    key: 'accessAdmin',
    name: t('accessAdmin', { ns: 'permissions' }),
  },
  {
    id: accessReports,
    key: 'accessReports',
    name: t('accessReports', { ns: 'permissions' }),
  },
  {
    id: manageProjects,
    key: 'manageProjects',
    name: t('manageProjects', { ns: 'permissions' }),
  },
  {
    id: deleteProjects,
    key: 'deleteProjects',
    name: t('deleteProjects', { ns: 'permissions' }),
  },
  {
    id: manageCustomers,
    key: 'manageCustomers',
    name: t('manageCustomers', { ns: 'permissions' }),
  },
  {
    id: deleteCustomers,
    key: 'deleteCustomers',
    name: t('deleteCustomers', { ns: 'permissions' }),
  },
  {
    id: manageUsers,
    key: 'manageUsers',
    name: t('manageUsers', { ns: 'permissions' }),
  },
  {
    id: manageRolesPermissions,
    key: 'manageRolesPermissions',
    name: t('manageRolesPermissions', { ns: 'permissions' }),
  },
]
