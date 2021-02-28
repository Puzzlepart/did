import {PERMISSION} from 'config/security/permissions';
import {Pivot, PivotItem} from 'office-ui-fabric-react';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {useHistory, useParams} from 'react-router-dom';
import {usePermissions} from '../../hooks';
import styles from './Admin.module.scss';
import {ApiTokens} from './ApiTokens';
import {Labels} from './Labels';
import {Roles} from './Roles';
import {SummaryView} from './SummaryView';
import {Users} from './Users';

/**
 * @category Function Component
 */
export const Admin = () => {
	const {t} = useTranslation();
	const {hasPermission} = usePermissions();
	const {view} = useParams<{view: string}>();
	const history = useHistory();

	const onPivotClick = ({props}: PivotItem) => {
		history.push(`/admin/${props.itemKey}`);
	};

	return (
		<div className={styles.root}>
			<Pivot selectedKey={view || 'users'} onLinkClick={onPivotClick}>
				{hasPermission(PERMISSION.MANAGE_USERS) && (
					<PivotItem
						className={styles.tab}
						itemKey="users"
						headerText={t('admin.users')}
						itemIcon="FabricUserFolder"
					>
						<Users />
					</PivotItem>
				)}
				<PivotItem
					className={styles.tab}
					itemKey="summary"
					headerText={t('admin.summary')}
					itemIcon="CalendarWeek"
				>
					<SummaryView />
				</PivotItem>
				<PivotItem
					className={styles.tab}
					itemKey="labels"
					headerText={t('admin.labels')}
					itemIcon="Label"
				>
					<Labels />
				</PivotItem>
				{hasPermission(PERMISSION.MANAGE_ROLESPERMISSIONS) && (
					<PivotItem
						className={styles.tab}
						itemKey="rolesPermissions"
						headerText={t('admin.rolesPermissions')}
						itemIcon="SecurityGroup"
					>
						<Roles />
					</PivotItem>
				)}
				<PivotItem
					className={styles.tab}
					itemKey="apiTokens"
					headerText={t('admin.apiTokens.headerText')}
					itemIcon="AzureAPIManagement"
				>
					<ApiTokens />
				</PivotItem>
			</Pivot>
		</div>
	);
};

export * from './ApiTokens';
export * from './Labels';
export * from './Roles';
export * from './SummaryView';
export * from './Users';
