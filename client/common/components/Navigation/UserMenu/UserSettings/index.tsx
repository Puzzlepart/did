import { useMutation } from '@apollo/react-hooks';
import { AppContext } from 'AppContext';
import resource from 'i18n';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import UPDATE_USER from 'pages/Admin/Users/UserFormModal/UPDATE_USER';
import React from 'react';
import { UserSettingInput } from './UserSettingInput';
import styles from './UserSettings.module.scss';
import { UserSettingsContext } from './UserSettingsContext';
import { USER_SETTINGS } from './USER_SETTINGS';

/**
 * @category UserSettings
 */
export const UserSettings = () => {
    const { user } = React.useContext(AppContext);
    const [isOpen, toggle] = React.useState<boolean>(false);
    const [updateUser] = useMutation(UPDATE_USER);

    const onUpdateUserSettings = (key: string, value: string | boolean) => {
        updateUser({ variables: { user: { id: user.id, [key]: value } } }).then(() => location.reload());
    };

    return (
        <UserSettingsContext.Provider value={{ onUpdateUserSettings }}>
            <div className={styles.root}>
                <a href='#' onClick={() => toggle(true)}>
                    <span>{resource('COMMON.SETTINGS')}</span>                    
                    <Panel
                        className={styles.panel}
                        headerText={resource('COMMON.SETTINGS')}
                        isOpen={isOpen}
                        onDismiss={() => toggle(false)}
                        isLightDismiss={true}>
                        {[...USER_SETTINGS(resource)].map((s, idx) => (
                            <UserSettingInput
                                key={idx}
                                user={user}
                                setting={s} />
                        ))}
                    </Panel>
                </a>
            </div>
        </UserSettingsContext.Provider>
    );
}