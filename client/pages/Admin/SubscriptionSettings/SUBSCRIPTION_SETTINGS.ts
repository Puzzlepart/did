import { TFunction } from 'i18next'
import { ISliderProps } from 'office-ui-fabric-react/lib/Slider'
import { ITextFieldProps } from 'office-ui-fabric-react/lib/TextField'
import { IToggleProps } from 'office-ui-fabric-react/lib/Toggle'

/**
 * Interface for type bool
 * 
 * As IToggleProps have no description prop we need to extend the interface
 */
interface ISubscriptionSettingBool extends IToggleProps {
  description?: string
}

/**
 * Interface for type number
 * 
 * As ISliderProps have no description prop we need to extend the interface
 */
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

/**
 * Subscription settings
 * 
 * Consists of the following properties:
 * 
 * * key
 * * type
 * * props depending on type
 * 
 * @param {TFunction} t Translate function
 */
export const SUBSCRIPTION_SETTINGS = (t: TFunction): { [section: string]: SubscriptionSetting[] } => ({
  [t('admin.forecasting')]: [
    {
      key: 'forecast.enabled',
      type: 'bool',
      props: {
        label: t('admin.forecastEnabledLabel'),
        description: t('admin.forecastEnabledDescription'),
      },
    },
    {
      key: 'forecast.notifications',
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
