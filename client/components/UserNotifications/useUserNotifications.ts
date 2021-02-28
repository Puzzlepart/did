/* eslint-disable @typescript-eslint/no-empty-function */
import {AppContext} from 'AppContext';
import {useContext, useDebugValue, useState} from 'react';
import {useBrowserStorage} from '../../hooks';
import {IUserNotificationsState, NotificationModel} from './types';

/**
 * Hook for UserNotifications
 */
export const useUserNotifications = () => {
	const [state, dispatch] = useState<IUserNotificationsState>({});
	const {notificationsQuery} = useContext(AppContext);

	const showPanel = () => {
		dispatch({...state, showPanel: true});
	};

	const dismissPanel = () => {
		dispatch({...state, showPanel: false});
	};

	const [dismissedIds, dismissNotification, clearDismissed] = useBrowserStorage<
	string[]
	>({
		key: 'did_dismissed_notifications',
		initialValue: []
	});

	useDebugValue({dismissedIds});

	const notifications = notificationsQuery.notifications
		.map(n => new NotificationModel(n))
		.filter(n => !dismissedIds.includes(n.id));

	const dismissedCount =
		notificationsQuery.notifications.length - notifications.length;

	return {
		notifications,
		dismissedCount,
		panelOpen: state.showPanel,
		showPanel,
		dismissPanel,
		dismissNotification,
		clearDismissed
	};
};
