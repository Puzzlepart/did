import { BasePanel } from 'components'
import React from 'react'
import { getFluentIcon } from 'utils'
import { MenuItem } from '../MenuItem'
import { UserSettingsContext } from './context'
import { UserSettingInput } from './UserSettingInput'
import styles from './UserSettings.module.scss'
import { useUserSettings } from './useUserSettings'

/**
 * @category UserMenu
 */
export const UserSettings = () => {
  const { t, context, openPanel, dismissPanel, isOpen, settings } =
    useUserSettings()

  return (
    <UserSettingsContext.Provider value={context}>
      <div className={styles.root}>
        <MenuItem
          text={t('common.settings')}
          icon={getFluentIcon('EditSettings')}
          onClick={openPanel}
        />
        <BasePanel
          className={styles.panel}
          headerText={t('common.userSettingsPanelHeaderText')}
          isOpen={isOpen}
          onDismiss={dismissPanel}
          footerActions={[
            {
              text: t('common.save'),
              appearance: 'primary',
              disabled: true
            }
          ]}
        >
          {settings.map((s, index) => (
            <UserSettingInput key={index} setting={s} />
          ))}
        </BasePanel>
      </div>
    </UserSettingsContext.Provider>
  )
}
