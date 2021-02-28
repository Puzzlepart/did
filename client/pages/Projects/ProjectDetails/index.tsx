import {Pivot, PivotItem} from 'office-ui-fabric-react';
import React, {FunctionComponent, useContext} from 'react';
import {useTranslation} from 'react-i18next';
import {ProjectsContext} from '../context';
import {CHANGE_DETAILS_TAB} from '../reducer/actions';
import {Header} from './Header';
import {Information} from './Information';
import styles from './ProjectDetails.module.scss';
import {TimeEntries} from './TimeEntries';

/**
 * @category Projects
 */
export const ProjectDetails: FunctionComponent = () => {
	const {t} = useTranslation();
	const {state, dispatch} = useContext(ProjectsContext);

	return (
		<div className={styles.root}>
			<Header />
			<Pivot
				defaultSelectedKey={state.detailsTab}
				onLinkClick={({props}) => {
					dispatch(CHANGE_DETAILS_TAB({detailsTab: props.itemKey}));
				}}
			>
				<PivotItem
					headerText={t('projects.informationHeaderText')}
					itemKey="information"
					itemIcon="Info"
				>
					<Information />
				</PivotItem>
				<PivotItem
					headerText={t('projects.timeEntriesHeaderText')}
					itemKey="timeentries"
					itemIcon="ReminderTime"
				>
					<TimeEntries />
				</PivotItem>
			</Pivot>
		</div>
	);
};

export * from './Header';
export * from './Information';
export * from './TimeEntries';
