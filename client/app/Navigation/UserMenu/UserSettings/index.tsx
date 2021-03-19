/* eslint-disable tsdoc/syntax */
import { Panel } from 'office-ui-fabric-react'
import React from 'react'
import { MenuItem } from '../MenuItem'
import { UserSettingsContext } from './context'
import { UserSettingInput } from './UserSettingInput'
import styles from './UserSettings.module.scss'
import { useUserSettings } from './useUserSettings'

/**
 * @category UserMenu
 */
export const UserSettings = () => {
  const {
    t,
    context,
    openPanel,
    dismissPanel,
    isOpen,
    user,
    settings
  } = useUserSettings()

  return (
    <UserSettingsContext.Provider value={context}>
      <div className={styles.root}>
        <MenuItem
          iconProps={{ iconName: 'Settings' }}
          text={t('common.settings')}
          onClick={openPanel}
        />
        <Panel
          className={styles.panel}
          headerText={t('common.settings')}
          isOpen={isOpen}
          onDismiss={dismissPanel}
          isLightDismiss={true}>
          {[...settings].map((s, index) => (
            <UserSettingInput key={index} user={user} setting={s} />
          ))}
        </Panel>
      </div>
    </UserSettingsContext.Provider>
  )
}
