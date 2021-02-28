import {Icon} from 'office-ui-fabric-react';
import React, {FunctionComponent} from 'react';
import styles from './MobileHeader.module.scss';
import {IMobileHeaderProps} from './types';

/**
 * @category Function Component
 */
export const MobileHeader: FunctionComponent<IMobileHeaderProps> = (
	props: IMobileHeaderProps
) => {
	return (
		<div className={styles.root}>
			<Icon iconName={props.iconName} className={styles.headerIcon} />
			<span className={styles.headerText}>{props.text}</span>
		</div>
	);
};

export * from './types';
