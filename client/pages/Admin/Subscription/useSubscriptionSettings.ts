/* eslint-disable tsdoc/syntax */
import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useToast } from 'components/Toast'
import get from 'get-value'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import set from 'set-value'
import { Subscription } from 'types'
import _ from 'underscore'
import deepCopy from 'utils/deepCopy'
import { omitTypename } from 'utils/omitTypename'
import $updateSubscription from './updateSubscription.gql'
import { useSubscriptionConfig } from './useSubscriptionConfig'

/**
 * @ignore
 */
export function useSubscriptionSettings() {
  const { t } = useTranslation()
  const context = useAppContext()
  const [subscription, setSubscription] = useState<Subscription>(
    omitTypename(context.subscription)
  )
  const [updateSubscription] = useMutation($updateSubscription)
  const [toast, setToast] = useToast(6000)
  const sections = useSubscriptionConfig()

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

  const onSaveSettings = async () => {
    const variables = _.pick(subscription, 'settings')
    await updateSubscription({ variables })
    setToast({
      text: t('admin.subscriptionSettingsUpdateSuccess'),
      type: 'success'
    })
  }

  return {
    context: {
      settings: subscription.settings,
      onChange
    },
    subscription,
    toast,
    onSaveSettings,
    sections,
    hasChanges: !_.isEqual(
      subscription.settings,
      omitTypename(context.subscription.settings)
    )
  }
}
