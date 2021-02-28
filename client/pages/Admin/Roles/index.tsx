import {useQuery} from '@apollo/client';
import {List} from 'components';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {Role} from 'types';
import {RoleColumns as columns} from './columns';
import {IRolePanelProps, RolePanel} from './RolePanel';
import $roles from './roles.gql';
import styles from './Roles.module.scss';

/**
 * @category Function Component
 */
export const Roles = () => {
	const {t} = useTranslation();
	const {data, loading, refetch} = useQuery($roles);
	const [panel, setPanel] = useState<IRolePanelProps>(null);

	/**
	 * On edit role
	 *
	 * @param role - Role to edit
	 */
	const onEdit = (role: Role) => {
		setPanel({
			headerText: t('admin.editRole'),
			model: role
		});
	};

	return (
		<div className={styles.root}>
			<List
				enableShimmer={loading}
				items={data?.roles || []}
				columns={columns(onEdit, t)}
				commandBar={{
					items: [
						{
							key: 'ADD_NEW_ROLE',
							name: t('admin.addNewRole'),
							onClick: () => {
								setPanel({headerText: t('admin.addNewRole')});
							}
						}
					],
					farItems: []
				}}
			/>
			{panel && (
				<RolePanel
					{...panel}
					onSave={async () => {
						await refetch();
						setPanel(null);
					}}
					onDismiss={() => {
						setPanel(null);
					}}
				/>
			)}
		</div>
	);
};
