import React, {FunctionComponent} from 'react';
import FadeIn from 'react-fade-in';
import styles from './Summary.module.scss';
import {ISummaryProps} from './types';
import {useSummary} from './useSummary';

/**
 * @category Projects
 */
export const Summary: FunctionComponent<ISummaryProps> = ({
	timeentries
}: ISummaryProps) => {
	const items = useSummary(timeentries);
	return (
		<FadeIn className={styles.root}>
			{items.map(({label, value}, idx) => (
				<div key={idx} className={styles.item}>
					<div className={styles.value}>{value}</div>
					<div className={styles.label}>{label}</div>
				</div>
			))}
		</FadeIn>
	);
};
