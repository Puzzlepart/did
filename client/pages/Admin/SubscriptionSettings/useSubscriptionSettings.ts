import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import get from 'get-value'
import { useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import set from 'set-value'
import { Subscription } from 'types'
import _ from 'underscore'
import { deepCopy } from 'utils/deepCopy'
import { omitTypename } from 'utils/omitTypename'
import { SettingsSection } from './SettingsSection'
import $updateSubscription from './updateSubscription.gql'
import { useSubscriptionConfig } from './useSubscriptionConfig'

/**
 * Component logic hook for the subscription settings component.
 *
 * @category SubscriptionSettings
 */
export function useSubscriptionSettings() {
  const { t } = useTranslation()
  const context = useAppContext()
  const [subscription, setSubscription] = useState<Subscription>(
    omitTypename(context.subscription)
  )
  const [updateSubscription] = useMutation($updateSubscription)
  const sections = useSubscriptionConfig()

  /**
   * Updates the subscription settings with the provided key and value.
   * If the value is a function, it will be called with the current value of the key and the result will be used as the new value.
   *
   * @param key - The key of the setting to update.
   * @param value - The new value of the setting or a function that takes the current value and returns the new value.
   */
  const onChange = (
    key: string,
    value: boolean | string | ((value: any) => any)
  ) => {
    const _subscription = deepCopy(subscription)
    if (typeof value === 'function') {
      value = value(get(_subscription, `settings.${key}`))
    }
    set(_subscription, `settings.${key}`, value)
    setSubscription(_subscription)
  }

  /**
   * Saves the subscription settings by calling the `updateSubscription` mutation with the current settings.
   * Sets a success toast message upon successful update.
   */
  const onSaveSettings = async () => {
    const variables = _.pick(subscription, 'settings')
    await updateSubscription({ variables })
    context.displayToast(
      t('admin.subscriptionSettingsUpdateSuccess'),
      'success'
    )
  }

  /**
   * Determines whether there are changes between the current
   * subscription settings and the context subscription settings.
   *
   * @returns `true` if there are changes, `false` otherwise.
   */
  const hasChanges = useMemo(
    () =>
      !_.isEqual(
        subscription.settings,
        omitTypename(context.subscription.settings)
      ),
    [subscription.settings, context.subscription]
  )

  const tabs = sections.reduce(
    (tabs, section) => ({
      ...tabs,
      [section.id]: [
        SettingsSection,
        { text: section.text, iconName: section.icon },
        {
          ...section
        }
      ]
    }),
    {}
  )

  return {
    context: {
      settings: subscription.settings,
      onChange
    },
    subscription,
    onSaveSettings,
    tabs,
    hasChanges
  }
}
