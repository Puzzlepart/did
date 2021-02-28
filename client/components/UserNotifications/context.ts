import {createContext} from 'react';
import {useUserNotifications} from './useUserNotifications';

export type UserNotificationsContextType = ReturnType<
	typeof useUserNotifications
>;

export const UserNotificationsContext = createContext<UserNotificationsContextType>(
	null
);
