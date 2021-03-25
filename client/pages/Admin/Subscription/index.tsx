/* eslint-disable tsdoc/syntax */
import { TabComponent, TabContainer, Toast } from 'components'
import { PrimaryButton } from '@fluentui/react-react'
import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { SubscriptionContext } from './context'
import { SettingsSection } from './SettingsSection'
import styles from './SubscriptionSettings.module.scss'
import { useSubscriptionSettings } from './useSubscriptionSettings'

/**
 * @category Tab Component
 */
export const SubscriptionSettings: TabComponent = () => {
  const { t } = useTranslation()
  const [selectedKey, setSelectedKey] = useState('info')
  const { toast, context, onSaveSettings, sections } = useSubscriptionSettings()

  return (
    <SubscriptionContext.Provider value={context}>
      <div className={styles.root}>
        <Toast {...toast} />
        <TabContainer
          onLinkClick={({ props }) => setSelectedKey(props.itemKey)}
          selectedKey={selectedKey}
          level={3}>
          {sections.map((section) => {
            return <SettingsSection {...section} key={section.itemKey} />
          })}
        </TabContainer>
        <PrimaryButton
          className={styles.saveButton}
          onClick={onSaveSettings}
          disabled={!toast.hidden}
          text={t('common.save')}
        />
      </div>
    </SubscriptionContext.Provider>
  )
}
