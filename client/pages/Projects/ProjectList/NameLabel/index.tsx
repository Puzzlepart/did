import {ProjectLink} from 'components/ProjectLink';
import React from 'react';
import styles from './NameLabel.module.scss';
import {INameLabelProps} from './types';

export const NameLabel = ({project, renderLink}: INameLabelProps) => {
	return (
		<div className={styles.root}>
			{renderLink ? (
				<ProjectLink project={project} />
			) : (
				<div>
					<span>{project.name}</span>
				</div>
			)}
		</div>
	);
};
