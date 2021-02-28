import {createContext} from 'react';
import {SubscriptionSettings} from 'types';

export interface ISubscriptionContext {
	settings: SubscriptionSettings;
	onSettingsChanged?: (key: string, value: any) => void;
}

export const SubscriptionContext = createContext<ISubscriptionContext>(null);
