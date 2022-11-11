import { PrimaryButton } from '@fluentui/react'
import { TabComponent, TabContainer, Toast } from 'components'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubscriptionContext } from './context'
import { SettingsSection } from './SettingsSection'
import styles from './SubscriptionSettings.module.scss'
import { useSubscriptionSettings } from './useSubscriptionSettings'

/**
 * @ignore
 */
export const SubscriptionSettings: TabComponent = () => {
  const { t } = useTranslation()
  const [selectedKey, setSelectedKey] = useState('info')
  const { toast, context, onSaveSettings, sections, hasChanges } =
    useSubscriptionSettings()

  return (
    <SubscriptionContext.Provider value={context}>
      <div className={styles.root}>
        <Toast {...toast} />
        <TabContainer
          onTabChanged={(itemKey) => setSelectedKey(itemKey)}
          defaultSelectedKey={selectedKey}
          level={3}
        >
          {sections.map((section) => {
            return <SettingsSection {...section} key={section.itemKey} />
          })}
        </TabContainer>
        <PrimaryButton
          className={styles.saveButton}
          onClick={onSaveSettings}
          disabled={!!toast || !hasChanges}
          text={t('common.save')}
        />
      </div>
    </SubscriptionContext.Provider>
  )
}
