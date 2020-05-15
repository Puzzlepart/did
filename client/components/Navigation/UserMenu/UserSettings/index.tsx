import { useMutation } from '@apollo/react-hooks';
import { AppContext } from 'AppContext';
import i18n from 'i18n';
import { Panel } from 'office-ui-fabric-react/lib/Panel';
import UPDATE_USER from 'pages/Admin/Users/UserFormModal/UPDATE_USER';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { UserSettingInput } from './UserSettingInput';
import styles from './UserSettings.module.scss';
import { UserSettingsContext } from './UserSettingsContext';
import { USER_SETTINGS } from './USER_SETTINGS';

/**
 * @category UserSettings
 */
export const UserSettings = (props: React.HTMLProps<HTMLDivElement>) => {
    const { t } = useTranslation('COMMON');
    const { user } = React.useContext(AppContext);
    const [isOpen, toggle] = React.useState<boolean>(false);
    const [updateUser] = useMutation(UPDATE_USER);

    const onUpdateUserSettings = async (key: string, value: string | boolean) => {
        await updateUser({ variables: { user: { id: user.id, [key]: value } } });
        console.log(value);
        // eslint-disable-next-line default-case
        switch (key) {
            case 'userLanguage': i18n.changeLanguage(value as string);
                break;
        }

    };

    return (
        <UserSettingsContext.Provider value={{ onUpdateUserSettings }}>
            <div className={styles.root}>
                <a href='#' className={props.className} onClick={() => toggle(true)}>
                    <span>{t('SETTINGS')}</span>
                    <Panel
                        className={styles.panel}
                        headerText={t('SETTINGS')}
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
    );
}