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
  LIST_USERS = '1a1db774',
  IMPORT_USERS = 'b2b0f2a0',
  MANAGE_ROLESPERMISSIONS = 'cd52a735',
  MANAGE_SUBSCRIPTION = '67ba6efc',
  MANAGE_REPORT_LINKS = '8de5215e',
  LIST_API_TOKENS = 'cc77404a',
  MANAGE_API_TOKENS = '5f1a2b0e',
  INVITE_EXTERNAL_USERS = '785e1c6e'
}

export interface IPermissionInfo {
  /**
   * Permission ID
   */
  id?: PermissionScope

  /**
   * Name of the permission
   */
  name: string

  /**
   * Description of the permission
   */
  description?: string

  /**
   * Category for the permission
   */
  category?:
    | 'timesheet'
    | 'customers'
    | 'projects'
    | 'admin'
    | 'reports'
    | 'api'

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
   * Disabled (not available for use)
   */
  disabled?: boolean
}
