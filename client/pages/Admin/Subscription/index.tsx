import { useMutation } from '@apollo/client'
import { AppContext } from 'AppContext'
import { useMessage, UserMessage } from 'components'
import { getValue, setValue } from 'helpers'
import { MessageBarType, PrimaryButton, TextField } from 'office-ui-fabric'
import React, { useContext, useMemo, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Subscription } from 'types'
import { pick } from 'underscore'
import deepCopy from 'utils/deepCopy'
import omitDeep from 'utils/omitDeep'
import { SUBSCRIPTION_SETTINGS } from './config'
import { SubscriptionContext } from './context'
import { SettingsSection } from './SettingsSection'
import styles from './SubscriptionSettings.module.scss'
import $updateSubscription from './updateSubscription.gql'

export const SubscriptionSettings = () => {
  const context = useContext(AppContext)
  const { t } = useTranslation()
  const [subscription, setSubscription] = useState<Subscription>(
    omitDeep(deepCopy(context.subscription), '__typename')
  )
  const [updateSubscription] = useMutation($updateSubscription)
  const [message, setMessage] = useMessage()
  const sections = useMemo(() => SUBSCRIPTION_SETTINGS(t), [t])

  /**
   * On settings changed
   *
   * @param {string} key Setting key
   * @param {any} value The actual value or a callback function returning the value
   */
  const onSettingsChanged = (
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
    await updateSubscription({
      variables: pick(subscription, 'id', 'settings')
    })
    setMessage({
      text: t('admin.subscriptionSettingsUpdateSuccess'),
      type: MessageBarType.success
    })
  }

  return (
    <SubscriptionContext.Provider
      value={{ settings: subscription.settings, onSettingsChanged }}>
      <div className={styles.root}>
        {message && (
          <UserMessage
            {...message}
            containerStyle={{
              marginTop: 12,
              marginBottom: 12,
              width: 500
            }}
          />
        )}
        <div className={styles.inputField}>
          <TextField
            disabled
            label={t('common.nameLabel')}
            value={subscription?.name}
          />
        </div>
        {subscription?.settings &&
          sections.map((section) => {
            return (
              <SettingsSection
                {...section}
                key={section.id}
                defaultExpanded={true}
              />
            )
          })}
        <PrimaryButton
          className={styles.saveButton}
          onClick={onSaveSettings}
          disabled={!!message}
          text={t('common.save')}
        />
      </div>
    </SubscriptionContext.Provider>
  )
}
