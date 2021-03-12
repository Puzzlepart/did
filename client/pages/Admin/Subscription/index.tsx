/* eslint-disable tsdoc/syntax */
import { UserMessage } from 'components'
import { PrimaryButton, TextField } from 'office-ui-fabric-react'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SubscriptionContext } from './context'
import { SettingsSection } from './SettingsSection'
import styles from './SubscriptionSettings.module.scss'
import { useSubscriptionSettings } from './useSubscriptionSettings'

/**
 * @category Function Component
 */
export const SubscriptionSettings = () => {
  const { t } = useTranslation()
  const {
    subscription,
    message,
    context,
    onSaveSettings,
    sections
  } = useSubscriptionSettings()

  return (
    <SubscriptionContext.Provider value={context}>
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
        <div className={styles.inputField}>
          <TextField
            disabled
            label={t('common.ownerLabel')}
            value={subscription?.owner}
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
