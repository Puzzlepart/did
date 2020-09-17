import { useMutation } from '@apollo/react-hooks'
import { AppContext } from 'AppContext'
import { Panel } from 'office-ui-fabric-react/lib/Panel'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { UserSettingInput } from './UserSettingInput'
import styles from './UserSettings.module.scss'
import { UserSettingsContext } from './UserSettingsContext'
import { USER_SETTINGS } from './USER_SETTINGS'
import ADD_OR_UPDATE_USER from 'pages/Admin/Users/UserForm/ADD_OR_UPDATE_USER'

/**
 * @category UserSettings
 */
export const UserSettings = (props: React.HTMLProps<HTMLDivElement>) => {
    const { t } = useTranslation('common')
    const { user } = React.useContext(AppContext)
    const [isOpen, toggle] = React.useState<boolean>(false)
    const [addOrUpdateUser] = useMutation(ADD_OR_UPDATE_USER)

    const onUpdateUserSettings = async (key: string, value: string | boolean) => {
        await addOrUpdateUser({
            variables: {
                user: { id: user.id, [key]: value },
                update: true,
            }
        })        
        location.reload()
    }

    return (
        <UserSettingsContext.Provider value={{ onUpdateUserSettings }}>
            <div className={styles.root}>
                <a href='#' className={props.className} onClick={() => toggle(true)}>
                    <span>{t('settings')}</span>
                    <Panel
                        className={styles.panel}
                        headerText={t('settings')}
                        isOpen={isOpen}
                        onDismiss={() => toggle(false)}
                        isLightDismiss={true}>
                        {[...USER_SETTINGS(t)].map((s, idx) => (
                            <UserSettingInput
                                key={idx}
                                user={user}
                                setting={s} />
                        ))}
                    </Panel>
                </a>
            </div>
        </UserSettingsContext.Provider>
    )
}