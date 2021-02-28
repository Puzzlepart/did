import {List} from 'components';
import React, {FunctionComponent} from 'react';
import {useTranslation} from 'react-i18next';
import {durationColumn, timeColumn, titleColumn} from './columns';
import styles from './EventList.module.scss';
import {IEventListProps} from './types';

/**
 * @category Function Component
 */
export const EventList: FunctionComponent<IEventListProps> = (
	props: IEventListProps
): JSX.Element => {
	const {t} = useTranslation();
	const columns = [
		titleColumn(props, t('common.titleLabel')),
		timeColumn(props, t('common.timeLabel')),
		durationColumn(props, t('common.durationLabel')),
		...props.additionalColumns
	].map(col => ({
		...col,
		isResizable: props.resizableColumns
	}));

	return (
		<div className={styles.root} hidden={props.hidden}>
			<List
				enableShimmer={props.enableShimmer}
				columns={columns}
				items={props.events}
				groups={props.groups}
				groupProps={{showEmptyGroups: props.showEmptyDays}}
			/>
		</div>
	);
};

export * from './types';
