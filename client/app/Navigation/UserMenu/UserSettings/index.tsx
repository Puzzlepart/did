/* eslint-disable tsdoc/syntax */
import { Icon, Panel } from 'office-ui-fabric-react'
import React from 'react'
import { UserSettingsContext } from './context'
import { UserSettingInput } from './UserSettingInput'
import styles from './UserSettings.module.scss'
import { useUserSettings } from './useUserSettings'

/**
 * @category UserMenu
 */
export const UserSettings = (props: React.HTMLProps<HTMLDivElement>) => {
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
        <a href='#' onClick={openPanel} className={props.className}>
          <Icon iconName='Settings' className={styles.icon} />
          <span>{t('common.settings')}</span>
        </a>
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
