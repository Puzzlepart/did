import { TFunction } from 'i18next'
import { IPermission } from 'types/IPermission'

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
    name: t('permissions.accessTimesheet'),
  },
  {
    id: accessCustomers,
    key: 'accessCustomers',
    name: t('permissions.accessCustomers'),
  },
  {
    id: accessProjects,
    key: 'accessProjects',
    name: t('permissions.accessProjects'),
  },
  {
    id: accessAdmin,
    key: 'accessAdmin',
    name: t('permissions.accessAdmin'),
  },
  {
    id: accessReports,
    key: 'accessReports',
    name: t('permissions.accessReports'),
  },
  {
    id: manageProjects,
    key: 'manageProjects',
    name: t('permissions.manageProjects'),
  },
  {
    id: deleteProjects,
    key: 'deleteProjects',
    name: t('permissions.deleteProjects'),
  },
  {
    id: manageCustomers,
    key: 'manageCustomers',
    name: t('permissions.manageCustomers'),
  },
  {
    id: deleteCustomers,
    key: 'deleteCustomers',
    name: t('permissions.deleteCustomers'),
  },
  {
    id: manageUsers,
    key: 'manageUsers',
    name: t('permissions.manageUsers'),
  },
  {
    id: manageRolesPermissions,
    key: 'manageRolesPermissions',
    name: t('permissions.manageRolesPermissions'),
  },
]
