import {SubscriptionSettingField} from '../types';

export interface ISettingsSectionProps {
	id: string;
	name: string;
	fields: SubscriptionSettingField[];
	defaultExpanded?: boolean;
}
