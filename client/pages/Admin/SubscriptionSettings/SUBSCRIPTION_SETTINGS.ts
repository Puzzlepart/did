import { TFunction } from 'i18next'
import { ISliderProps } from 'office-ui-fabric-react/lib/Slider'
import { ITextFieldProps } from 'office-ui-fabric-react/lib/TextField'
import { IToggleProps } from 'office-ui-fabric-react/lib/Toggle'

interface ISubscriptionSettingBool extends IToggleProps {
  description?: string
}

interface ISubscriptionSettingNumber extends ISliderProps {
  description?: string
}

export type SubscriptionSetting =
  | {
      type: 'bool'
      key: string
      props: ISubscriptionSettingBool
    }
  | {
      type: 'text'
      key: string
      props: ITextFieldProps
    }
  | {
      type: 'number'
      key: string
      props: ISubscriptionSettingNumber
    }

export const SUBSCRIPTION_SETTINGS = (t: TFunction): { [section: string]: SubscriptionSetting[] } => ({
  [t('admin.forecasting')]: [
    {
      key: 'forecastEnabled',
      type: 'bool',
      props: {
        label: t('admin.forecastEnabledLabel'),
        description: t('admin.forecastEnabledDescription'),
      },
    },
    {
      key: 'forecastNotifications',
      type: 'number',
      props: {
        label: t('admin.forecastNotificationsLabel'),
        description: t('admin.forecastNotificationsDescription'),
        defaultValue: 1,
        min: 1,
        max: 8,
        step: 1,
      },
    },
  ],
})
