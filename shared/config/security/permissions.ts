import { TFunction } from 'i18next'

export enum PermissionScope {
  ACCESS_TIMESHEET = 'f5a82c37',
  ACCESS_CUSTOMERS = 'e18a7c45',
  ACCESS_PROJECTS = '289a64ab',
  ACCESS_ADMIN = '2653c3aa',
  ACCESS_REPORTS = 'a031c42f',
  MANAGE_PROJECTS = 'ef4032fb',
  DELETE_PROJECTS = 'c5439319',
  MANAGE_CUSTOMERS = '09909241',
  DELETE_CUSTOMER = '8b39db3d',
  MANAGE_USERS = '15e40e99',
  MANAGE_ROLESPERMISSIONS = 'cd52a735',
  MANAGE_SUBSCRIPTION = '67ba6efc'
}

export interface IPermission {
  /**
   * Permission ID
   */
  id: PermissionScope

  /**
   * Name of the permission
   */
  name: string

  /**
   * Description of the permission
   */
  description?: string

  /**
   * Icon that describe the permission
   *
   * @see https://developer.microsoft.com/en-us/fluentui#/styles/web/icons
   */
  iconName?: string

  /**
   * Callable from external API
   */
  api?: boolean

  /**
   * Disabled (not available)
   */
  disabled?: boolean
}

/**
 * Get permissions
 *
 * Specifiy translate function for i18n
 *
 * @param t - Translate funcion
 */
export function getPermissions(t: TFunction): IPermission[] {
  return [
    {
      id: PermissionScope.ACCESS_TIMESHEET,
      name: t('permissions.accessTimesheet'),
      description: t('permissions.accessTimesheetDescription'),
      iconName: 'TimeSheet'
    },
    {
      id: PermissionScope.ACCESS_CUSTOMERS,
      name: t('permissions.accessCustomers'),
      description: t('permissions.accessCustomersDescription'),
      iconName: 'People'
    },
    {
      id: PermissionScope.ACCESS_PROJECTS,
      name: t('permissions.accessProjects'),
      description: t('permissions.accessProjectsDescription'),
      iconName: 'ProjectCollection'
    },
    {
      id: PermissionScope.ACCESS_ADMIN,
      name: t('permissions.accessAdmin'),
      description: t('permissions.accessAdminDescription'),
      iconName: 'Settings'
    },
    {
      id: PermissionScope.ACCESS_REPORTS,
      name: t('permissions.accessReports'),
      description: t('permissions.accessReportsDescription'),
      iconName: 'ReportDocument',
      api: true
    },
    {
      id: PermissionScope.MANAGE_PROJECTS,
      name: t('permissions.manageProjects'),
      description: t('permissions.manageProjectsDescription'),
      iconName: 'TaskManager',
      api: true
    },
    {
      id: PermissionScope.DELETE_PROJECTS,
      name: t('permissions.deleteProjects'),
      description: t('permissions.deleteProjectsDescription'),
      iconName: 'DeleteTable',
      disabled: true,
      api: true
    },
    {
      id: PermissionScope.MANAGE_CUSTOMERS,
      name: t('permissions.manageCustomers'),
      description: t('permissions.manageCustomersDescription'),
      iconName: 'PageData',
      api: true
    },

    {
      id: PermissionScope.DELETE_CUSTOMER,
      name: t('permissions.deleteCustomers'),
      description: t('permissions.deleteCustomersDescription'),
      iconName: 'PageData',
      disabled: true,
      api: true
    },
    {
      id: PermissionScope.MANAGE_USERS,
      name: t('permissions.manageUsers'),
      description: t('permissions.manageUsersDescription'),
      iconName: 'ManagerSelfService',
      api: true
    },
    {
      id: PermissionScope.MANAGE_ROLESPERMISSIONS,
      name: t('permissions.manageRolesPermissions'),
      description: t('permissions.manageRolesPermissionsDescription'),
      iconName: 'Permissions',
      api: true
    },
    {
      id: PermissionScope.MANAGE_SUBSCRIPTION,
      name: t('permissions.manageSubscription'),
      description: t('permissions.manageSubscriptionDescription'),
      iconName: 'SubstitutionsIn',
      api: false,
      disabled: true
    }
  ]
}
