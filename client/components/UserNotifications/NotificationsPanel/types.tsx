import {NotificationModel} from '../types';
import {IPanelProps} from 'office-ui-fabric-react';

export interface INotificationsPanelProps extends IPanelProps {
	notifications: NotificationModel[];
}
