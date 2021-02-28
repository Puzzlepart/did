import {getValue} from 'helpers';
import {TFunction} from 'i18next';
import {SubscriptionSettings} from 'types';
import {ISettingsSectionProps} from './SettingsSection/types';

/**
 * Subscription settings
 *
 * @param t - Translate function
 */
export const SUBSCRIPTION_SETTINGS = (
	t: TFunction
): ISettingsSectionProps[] => [
	{
		id: 'adsync',
		name: t('admin.adsync'),
		fields: [
			{
				id: 'adUserSyncEnabled',
				type: 'bool',
				props: new Map<string, any>([
					['label', t('admin.adUserSyncEnabledLabel')],
					['description', t('admin.adUserSyncEnabledDescription')]
				])
			},
			{
				id: 'adUserSyncProperties',
				type: 'checkbox',
				options: {
					givenName: t('common.givenNameLabel'),
					surname: t('common.surnameLabel'),
					jobTitle: t('common.jobTitleLabel'),
					displayName: t('common.displayNameLabel'),
					mobilePhone: t('common.mobilePhoneLabel'),
					mail: t('common.mailLabel'),
					preferredLanguage: t('common.preferredLanguageLabel'),
					department: t('common.departmentLabel'),
					officeLocation: t('common.officeLocationLabel')
				},
				props: new Map<string, any>([
					['label', t('admin.adUserSyncPropertiesLabel')],
					['description', t('admin.adUserSyncPropertiesDescription')]
				]),
				hiddenIf: (settings: SubscriptionSettings) =>
					!getValue(settings, 'adsync.adUserSyncEnabled', false)
			}
		]
	},
	{
		id: 'forecast',
		name: t('admin.forecasting'),
		fields: [
			{
				id: 'enabled',
				type: 'bool',
				props: new Map<string, any>([
					['label', t('admin.forecastEnabledLabel')],
					['description', t('admin.forecastEnabledDescription')]
				])
			},
			{
				id: 'notifications',
				type: 'number',
				props: new Map([
					['label', t('admin.forecastNotificationsLabel')],
					['description', t('admin.forecastNotificationsDescription')],
					['defaultValue', 1],
					['min', 1],
					['max', 8],
					['step', 1]
				]),
				disabledIf: (settings: SubscriptionSettings) =>
					!getValue(settings, 'forecast.enabled', false)
			}
		]
	}
];
