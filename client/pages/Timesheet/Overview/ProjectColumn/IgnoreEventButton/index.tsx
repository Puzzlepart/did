import {Icon, MessageBarButton} from 'office-ui-fabric-react';
import {IGNORE_EVENT} from 'pages/Timesheet/reducer/actions';
import React, {useContext} from 'react';
import {BrowserView, MobileView} from 'react-device-detect';
import {useTranslation} from 'react-i18next';
import {TimesheetContext} from '../../../types';
import styles from './IgnoreEventButton.module.scss';
import {IIgnoreEventButtonProps} from './types';

export const IgnoreEventButton = ({
	event
}: IIgnoreEventButtonProps): JSX.Element => {
	const {t} = useTranslation();
	const {dispatch} = useContext(TimesheetContext);
	return (
		<span
			className={styles.root}
			onClick={() => {
				dispatch(IGNORE_EVENT({id: event.id}));
			}}
		>
			<BrowserView renderWithFragment={true}>
				<MessageBarButton
					text={t('timesheet.ignoreEventButtonLabel')}
					iconProps={{iconName: 'Blocked2'}}
				/>
			</BrowserView>
			<MobileView renderWithFragment={true}>
				<Icon className={styles.icon} iconName="Blocked2" />
				<span className={styles.text}>
					{t('timesheet.ignoreEventButtonLabel')}
				</span>
			</MobileView>
		</span>
	);
};
