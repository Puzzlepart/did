import {TFunction} from 'i18next';

export enum PERMISSION {
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
	id: PERMISSION;

	/**
	 * Name of the permission
	 */
	name: string;

	/**
	 * Description of the permission
	 */
	description?: string;

	/**
	 * Callable from external API
	 */
	api?: boolean;

	/**
	 * Disabled (not available)
	 */
	disabled?: boolean;
}

/**
 * Get permissions
 *
 * Specifiy translate function for i18n
 *
 * @param t - Translate funcion
 */
export default (t: TFunction): IPermission[] => [
	{
		id: PERMISSION.ACCESS_TIMESHEET,
		name: t('permissions.accessTimesheet'),
		description: t('permissions.accessTimesheetDescription')
	},
	{
		id: PERMISSION.ACCESS_CUSTOMERS,
		name: t('permissions.accessCustomers'),
		description: t('permissions.accessCustomersDescription')
	},
	{
		id: PERMISSION.ACCESS_PROJECTS,
		name: t('permissions.accessProjects'),
		description: t('permissions.accessProjectsDescription')
	},
	{
		id: PERMISSION.ACCESS_ADMIN,
		name: t('permissions.accessAdmin'),
		description: t('permissions.accessAdminDescription')
	},
	{
		id: PERMISSION.ACCESS_REPORTS,
		name: t('permissions.accessReports'),
		description: t('permissions.accessReportsDescription')
	},
	{
		id: PERMISSION.MANAGE_PROJECTS,
		name: t('permissions.manageProjects'),
		description: t('permissions.manageProjectsDescription'),
		api: true
	},
	{
		id: PERMISSION.DELETE_PROJECTS,
		name: t('permissions.deleteProjects'),
		description: t('permissions.deleteProjectsDescription'),
		disabled: true,
		api: true
	},
	{
		id: PERMISSION.MANAGE_CUSTOMERS,
		name: t('permissions.manageCustomers'),
		description: t('permissions.manageCustomersDescription'),
		api: true
	},

	{
		id: PERMISSION.DELETE_CUSTOMER,
		name: t('permissions.deleteCustomers'),
		description: t('permissions.deleteCustomersDescription'),
		disabled: true,
		api: true
	},
	{
		id: PERMISSION.MANAGE_USERS,
		name: t('permissions.manageUsers'),
		description: t('permissions.manageUsersDescription'),
		api: true
	},
	{
		id: PERMISSION.MANAGE_ROLESPERMISSIONS,
		name: t('permissions.manageRolesPermissions'),
		description: t('permissions.manageRolesPermissionsDescription'),
		api: true
	},
	{
		id: PERMISSION.MANAGE_SUBSCRIPTION,
		name: t('permissions.manageSubscription'),
		description: t('permissions.manageSubscriptionDescription'),
		api: false,
		disabled: true
	}
];
