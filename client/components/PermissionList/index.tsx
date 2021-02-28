import React, {FunctionComponent} from 'react';
import {usePermissions} from '../../hooks';
import styles from './PermissionList.module.scss';
import {IPermissionListProps} from './types';

/**
 * @category Function Component
 */
export const PermissionList: FunctionComponent<IPermissionListProps> = ({
	permissionIds
}: IPermissionListProps) => {
	const {permissions} = usePermissions({permissionIds});
	return (
		<div className={styles.root}>
			<div className={styles.container}>
				{permissions.map(perm => (
					<div key={perm.id} className={styles.item} title={perm.description}>
						{perm.name}
					</div>
				))}
			</div>
		</div>
	);
};

export * from './types';
