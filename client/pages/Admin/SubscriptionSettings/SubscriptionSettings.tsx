import { Button } from '@fluentui/react-components'
import { TabComponent, Tabs } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import styles from './SubscriptionSettings.module.scss'
import { SubscriptionContext } from './context'
import { useSubscriptionSettings } from './useSubscriptionSettings'

export const SubscriptionSettings: TabComponent = () => {
  const { t } = useTranslation()
  const { context, onSaveSettings, hasChanges, tabs } =
    useSubscriptionSettings()

  return (
    <SubscriptionContext.Provider value={context}>
      <div className={SubscriptionSettings.className}>
        <Tabs level={3} items={tabs} vertical>
          <Button
            appearance='primary'
            className={styles.saveButton}
            onClick={onSaveSettings}
            disabled={!hasChanges}
          >
            {t('common.save')}
          </Button>
        </Tabs>
      </div>
    </SubscriptionContext.Provider>
  )
}

SubscriptionSettings.displayName = 'SubscriptionSettings'
SubscriptionSettings.className = styles.subscriptionSettings
