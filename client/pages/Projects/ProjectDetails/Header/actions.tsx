import {useMutation} from '@apollo/client';
import {PERMISSION} from 'config/security/permissions';
import copy from 'fast-copy';
import {DefaultButton} from 'office-ui-fabric-react';
import React, {FunctionComponent, useContext, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {usePermissions} from '../../../../hooks';
import {ProjectsContext} from '../../context';
import {ProjectForm} from '../../ProjectForm';
import {SET_SELECTED_PROJECT} from '../../reducer/actions';
import $createOutlookCategory from './createOutlookCategory.gql';
import styles from './Header.module.scss';

/**
 * @category Projects
 */
export const ProjectActions: FunctionComponent = () => {
	const {refetch, state, dispatch} = useContext(ProjectsContext);
	const {hasPermission} = usePermissions();
	const {t} = useTranslation();
	const [showEditPanel, setShowEditPanel] = useState(false);
	const [createOutlookCategory] = useMutation($createOutlookCategory);

	/**
	 * On create category in Outlook
	 */
	async function onCreateCategory() {
		const {
			data: {result}
		} = await createOutlookCategory({
			variables: {category: state.selected.tag}
		});
		if (result.success) {
			const project = copy(state.selected);
			project.outlookCategory = result.data;
			dispatch(SET_SELECTED_PROJECT({project}));
		}
	}

	return (
		<div className={styles.actions}>
			<div className={styles.actionItem} hidden={!state.selected.webLink}>
				<DefaultButton
					text={t('projects.workspaceLabel')}
					onClick={() => {
						window.location.replace(state.selected.webLink);
					}}
					iconProps={{iconName: 'Website'}}
				/>
			</div>
			<div
				className={styles.actionItem}
				hidden={Boolean(state.selected.outlookCategory)}
			>
				<DefaultButton
					text={t('projects.createOutlookCategoryLabel')}
					iconProps={{iconName: 'OutlookLogoInverse'}}
					onClick={async () => onCreateCategory()}
				/>
			</div>
			<div
				className={styles.actionItem}
				hidden={!hasPermission(PERMISSION.MANAGE_PROJECTS)}
			>
				<DefaultButton
					text={t('common.editLabel')}
					iconProps={{iconName: 'Edit'}}
					onClick={() => {
						setShowEditPanel(true);
					}}
				/>
				<ProjectForm
					key={state.selected.tag}
					edit={state.selected}
					panel={{
						isOpen: showEditPanel,
						headerText: state.selected.name,
						isLightDismiss: true,
						onLightDismissClick: () => {
							setShowEditPanel(false);
						},
						onDismiss: () => {
							setShowEditPanel(false);
						},
						onSave: () => {
							setShowEditPanel(false);
							refetch();
						}
					}}
				/>
			</div>
		</div>
	);
};
