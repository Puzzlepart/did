import { Button } from '@fluentui/react-components'
import { Toast } from 'components'
import { TabComponent } from 'components/Tabs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { SubscriptionContext } from './context'
import styles from './SubscriptionSettings.module.scss'
import { useSubscriptionSettings } from './useSubscriptionSettings'

export const SubscriptionSettings: TabComponent = () => {
  const { t } = useTranslation()
  const { toast, context, onSaveSettings, hasChanges } =
    useSubscriptionSettings()

  return (
    <SubscriptionContext.Provider value={context}>
      <div className={SubscriptionSettings.className}>
        <Toast {...toast} />
        {/* <TabContainer
          onTabChanged={(itemKey) => setSelectedKey(itemKey)}
          defaultSelectedKey={selectedKey}
          level={3}
        >
          {sections.map((section) => {
            return <SettingsSection {...section} key={section.itemKey} />
          })}
        </TabContainer> */}
        <Button
          appearance='primary'
          className={styles.saveButton}
          onClick={onSaveSettings}
          disabled={!!toast || !hasChanges}
        >
          {t('common.save')}
        </Button>
      </div>
    </SubscriptionContext.Provider>
  )
}

SubscriptionSettings.displayName = 'SubscriptionSettings'
SubscriptionSettings.className = styles.subscriptionSettings
