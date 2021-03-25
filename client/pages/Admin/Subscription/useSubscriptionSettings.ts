/* eslint-disable tsdoc/syntax */
import { useMutation } from '@apollo/client'
import { useAppContext } from 'AppContext'
import { useToast } from 'components/Toast'
import { getValue, setValue } from 'helpers'
import { MessageBarType } from '@fluentui/react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subscription } from 'types'
import { pick } from 'underscore'
import deepCopy from 'utils/deepCopy'
import omitDeep from 'utils/omitDeep'
import $updateSubscription from './updateSubscription.gql'
import { useSubscriptionConfig } from './useSubscriptionConfig'

/**
 * @ignore
 */
export function useSubscriptionSettings() {
  const { t } = useTranslation()
  const context = useAppContext()
  const [subscription, setSubscription] = useState<Subscription>(
    omitDeep(deepCopy(context.subscription), '__typename')
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
      value = value(getValue(_subscription, `settings.${key}`))
    }
    setValue(_subscription, `settings.${key}`, value)
    setSubscription(_subscription)
  }

  const onSaveSettings = async () => {
    const variables = pick(subscription, 'settings')
    await updateSubscription({ variables })
    setToast({
      text: t('admin.subscriptionSettingsUpdateSuccess'),
      type: MessageBarType.success
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
    sections
  }
}
