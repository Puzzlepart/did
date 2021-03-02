import {useMutation} from '@apollo/client'
import {useId} from '@uifabric/react-hooks'
import {AppContext} from 'AppContext'
import {Icon, Panel} from 'office-ui-fabric-react'
import $addOrUpdateUser from 'pages/Admin/Users/UserForm/addOrUpdateUser.gql'
import React, {useContext, useState} from 'react'
import {useTranslation} from 'react-i18next'
import {UserSettingsContext} from './context'
import {UserSettingInput} from './UserSettingInput'
import styles from './UserSettings.module.scss'
import {USER_SETTINGS} from './USER_SETTINGS'

export const UserSettings = (props: React.HTMLProps<HTMLDivElement>) => {
  const {t} = useTranslation()
  const {user} = useContext(AppContext)
  const [panelOpen, setPanelOpen] = useState(false)
  const [addOrUpdateUser] = useMutation($addOrUpdateUser)
  const toggleId = useId('toggle-panel')

  /**
   * Toggle panel
   *
   * @param event - Event
   */
  const togglePanel = (event: React.MouseEvent<any>) => {
    switch (event.currentTarget.id) {
      case toggleId:
        setPanelOpen(true)
        break
      default:
        setPanelOpen(false)
    }
  }

  /**
   * On update user settings
   *
   * @param key - Key
   * @param value - Value
   */
  const onUpdateUserSettings = async (key: string, value: string | boolean) => {
    await addOrUpdateUser({
      variables: {
        user: {id: user.id, [key]: value},
        update: true
      }
    })
    location.reload()
  }

  return (
    <UserSettingsContext.Provider value={{onUpdateUserSettings}}>
      <div className={styles.root}>
        <a
          href='#'
          id={toggleId}
          onClick={togglePanel}
          className={props.className}>
          <Icon iconName='Settings' className={styles.icon} />
          <span>{t('common.settings')}</span>
        </a>
        <Panel
          className={styles.panel}
          headerText={t('common.settings')}
          isOpen={panelOpen}
          onDismiss={togglePanel}
          isLightDismiss={true}>
          {[...USER_SETTINGS(t)].map((s, index) => (
            <UserSettingInput key={index} user={user} setting={s} />
          ))}
        </Panel>
      </div>
    </UserSettingsContext.Provider>
  )
}
