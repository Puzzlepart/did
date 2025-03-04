import { TFunction } from 'i18next'
import { IPermissionInfo, PermissionScope } from './types'

/**
 * Get all permissions available in the system.
 *
 * Need to provide `t`(translate function) since this is not
 * a React hook or component.
 *
 * @param t - Translate funcion
 */
export const getPermissions = (
  t: TFunction
): Record<string, IPermissionInfo> => ({
  [PermissionScope.ACCESS_TIMESHEET]: {
    name: t('permissions.accessTimesheet'),
    description: t('permissions.accessTimesheetDescription'),
    iconName: 'TimeSheet',
    category: 'timesheet'
  },
  [PermissionScope.ACCESS_CUSTOMERS]: {
    name: t('permissions.accessCustomers'),
    description: t('permissions.accessCustomersDescription'),
    iconName: 'People',
    category: 'customers'
  },
  [PermissionScope.ACCESS_PROJECTS]: {
    name: t('permissions.accessProjects'),
    description: t('permissions.accessProjectsDescription'),
    iconName: 'ProjectCollection',
    category: 'projects'
  },
  [PermissionScope.ACCESS_ADMIN]: {
    name: t('permissions.accessAdmin'),
    description: t('permissions.accessAdminDescription'),
    iconName: 'Settings',
    category: 'admin'
  },
  [PermissionScope.ACCESS_REPORTS]: {
    id: PermissionScope.ACCESS_REPORTS,
    name: t('permissions.accessReports'),
    description: t('permissions.accessReportsDescription'),
    iconName: 'ReportDocument',
    api: true,
    category: 'reports'
  },
  [PermissionScope.MANAGE_PROJECTS]: {
    name: t('permissions.manageProjects'),
    description: t('permissions.manageProjectsDescription'),
    iconName: 'TaskManager',
    api: true,
    category: 'projects'
  },
  [PermissionScope.DELETE_PROJECTS]: {
    name: t('permissions.deleteProjects'),
    description: t('permissions.deleteProjectsDescription'),
    iconName: 'DeleteTable',
    disabled: true,
    api: true,
    category: 'projects'
  },
  [PermissionScope.MANAGE_CUSTOMERS]: {
    name: t('permissions.manageCustomers'),
    description: t('permissions.manageCustomersDescription'),
    iconName: 'PageData',
    api: true,
    category: 'customers'
  },

  [PermissionScope.DELETE_CUSTOMER]: {
    name: t('permissions.deleteCustomers'),
    description: t('permissions.deleteCustomersDescription'),
    iconName: 'PageData',
    disabled: true,
    api: true,
    category: 'customers'
  },
  [PermissionScope.MANAGE_USERS]: {
    name: t('permissions.manageUsers'),
    description: t('permissions.manageUsersDescription'),
    iconName: 'ManagerSelfService',
    api: true,
    category: 'admin'
  },
  [PermissionScope.LIST_USERS]: {
    name: t('permissions.listUsers'),
    description: t('permissions.listUsersDescription'),
    iconName: 'ContactList',
    api: true,
    category: 'admin'
  },
  [PermissionScope.IMPORT_USERS]: {
    name: t('permissions.importUsers'),
    description: t('permissions.importUsersDescription'),
    iconName: 'AzureLogo',
    category: 'admin'
  },
  [PermissionScope.MANAGE_ROLESPERMISSIONS]: {
    name: t('permissions.manageRolesPermissions'),
    description: t('permissions.manageRolesPermissionsDescription'),
    iconName: 'Permissions',
    api: true,
    category: 'admin'
  },
  [PermissionScope.MANAGE_SUBSCRIPTION]: {
    name: t('permissions.manageSubscription'),
    description: t('permissions.manageSubscriptionDescription'),
    iconName: 'SubstitutionsIn',
    api: false,
    disabled: true,
    category: 'admin'
  },
  [PermissionScope.MANAGE_REPORT_LINKS]: {
    name: t('permissions.manageReportLinks'),
    description: t('permissions.manageReportLinksDescription'),
    iconName: 'AnalyticsReport',
    api: false,
    disabled: true,
    category: 'reports'
  },
  [PermissionScope.LIST_API_TOKENS]: {
    name: t('permissions.listApiTokens'),
    description: t('permissions.listApiTokensDescription'),
    iconName: 'GroupList',
    category: 'api'
  },
  [PermissionScope.MANAGE_API_TOKENS]: {
    name: t('permissions.manageApiTokens'),
    description: t('permissions.manageApiTokensDescription'),
    iconName: 'AzureAPIManagement',
    category: 'api'
  },
  [PermissionScope.INVITE_EXTERNAL_USERS]: {
    name: t('permissions.inviteExternalUsers'),
    description: t('permissions.inviteExternalUsersDescription'),
    iconName: 'Globe',
    category: 'admin'
  }
})
