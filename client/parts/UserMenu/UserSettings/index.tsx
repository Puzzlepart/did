import { BasePanel } from 'components'
import React from 'react'
import { MenuItem } from '../MenuItem'
import { UserSettingsContext } from './context'
import { UserSettingInput } from './UserSettingInput'
import styles from './UserSettings.module.scss'
import { useUserSettings } from './useUserSettings'
import { getFluentIcon } from 'utils'

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
          headerText={t('common.settings')}
          isOpen={isOpen}
          onDismiss={dismissPanel}
          onLightDismissClick={dismissPanel}
          isLightDismiss={true}
        >
          {settings.map((s, index) => (
            <UserSettingInput key={index} setting={s} />
          ))}
        </BasePanel>
      </div>
    </UserSettingsContext.Provider>
  )
}
