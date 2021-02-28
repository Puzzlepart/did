import {Icon} from 'office-ui-fabric-react';
import React, {FunctionComponent, useContext} from 'react';
import {ProjectsContext} from '../../context';
import {ProjectActions} from './actions';
import styles from './Header.module.scss';

/**
 * @category Projects
 */
export const Header: FunctionComponent = () => {
	const {state} = useContext(ProjectsContext);
	return (
		<div className={styles.root}>
			<div className={styles.icon}>
				<Icon iconName={state.selected.icon} />
			</div>
			<div className={styles.title}>
				<div className={styles.text}>{state.selected.name}</div>
				<div className={styles.subText}>{state.selected.customer.name}</div>
			</div>
			<ProjectActions />
		</div>
	);
};
