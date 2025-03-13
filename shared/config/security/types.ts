/**
 * Enum representing various permission scopes within the application.
 */
export enum PermissionScope {
  /**
   * Permission to access timesheet functionalities.
   */
  ACCESS_TIMESHEET = 'f5a82c37',

  /**
   * Permission to access customer-related functionalities.
   */
  ACCESS_CUSTOMERS = 'e18a7c45',

  /**
   * Permission to access project-related functionalities.
   */
  ACCESS_PROJECTS = '289a64ab',

  /**
   * Permission to access administrative functionalities.
   */
  ACCESS_ADMIN = '2653c3aa',

  /**
   * Permission to access reporting functionalities.
   */
  ACCESS_REPORTS = 'a031c42f',

  /**
   * Permission to manage projects.
   */
  MANAGE_PROJECTS = 'ef4032fb',

  /**
   * Permission to delete projects.
   */
  DELETE_PROJECTS = 'c5439319',

  /**
   * Permission to manage customers.
   */
  MANAGE_CUSTOMERS = '09909241',

  /**
   * Permission to delete customers.
   */
  DELETE_CUSTOMERS = '8b39db3d',

  /**
   * Permission to manage users.
   */
  MANAGE_USERS = '15e40e99',

  /**
   * Permission to list users.
   */
  LIST_USERS = '1a1db774',

  /**
   * Permission to import users.
   */
  IMPORT_USERS = 'b2b0f2a0',

  /**
   * Permission to manage roles and permissions.
   */
  MANAGE_ROLESPERMISSIONS = 'cd52a735',

  /**
   * Permission to manage subscription details.
   */
  MANAGE_SUBSCRIPTION = '67ba6efc',

  /**
   * Permission to manage report links.
   */
  MANAGE_REPORT_LINKS = '8de5215e',

  /**
   * Permission to list API tokens.
   */
  LIST_API_TOKENS = 'cc77404a',

  /**
   * Permission to manage API tokens.
   */
  MANAGE_API_TOKENS = '5f1a2b0e',

  /**
   * Permission to invite external users.
   */
  INVITE_EXTERNAL_USERS = '785e1c6e'
}

export interface IPermissionInfo {
  /**
   * Permission scope ID.
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
